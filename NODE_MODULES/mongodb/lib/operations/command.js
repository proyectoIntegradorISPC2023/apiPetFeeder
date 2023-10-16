"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandCallbackOperation = exports.CommandOperation = void 0;
const error_1 = require("../error");
const explain_1 = require("../explain");
const read_concern_1 = require("../read_concern");
const server_selection_1 = require("../sdam/server_selection");
const utils_1 = require("../utils");
const write_concern_1 = require("../write_concern");
const operation_1 = require("./operation");
/** @internal */
class CommandOperation extends operation_1.AbstractCallbackOperation {
    constructor(parent, options) {
        super(options);
        this.options = options ?? {};
        // NOTE: this was explicitly added for the add/remove user operations, it's likely
        //       something we'd want to reconsider. Perhaps those commands can use `Admin`
        //       as a parent?
        const dbNameOverride = options?.dbName || options?.authdb;
        if (dbNameOverride) {
            this.ns = new utils_1.MongoDBNamespace(dbNameOverride, '$cmd');
        }
        else {
            this.ns = parent
                ? parent.s.namespace.withCollection('$cmd')
                : new utils_1.MongoDBNamespace('admin', '$cmd');
        }
        this.readConcern = read_concern_1.ReadConcern.fromOptions(options);
        this.writeConcern = write_concern_1.WriteConcern.fromOptions(options);
        if (this.hasAspect(operation_1.Aspect.EXPLAINABLE)) {
            this.explain = explain_1.Explain.fromOptions(options);
        }
        else if (options?.explain != null) {
            throw new error_1.MongoInvalidArgumentError(`Option "explain" is not supported on this command`);
        }
    }
    get canRetryWrite() {
        if (this.hasAspect(operation_1.Aspect.EXPLAINABLE)) {
            return this.explain == null;
        }
        return true;
    }
    async executeCommand(server, session, cmd) {
        // TODO: consider making this a non-enumerable property
        this.server = server;
        const options = {
            ...this.options,
            ...this.bsonOptions,
            readPreference: this.readPreference,
            session
        };
        const serverWireVersion = (0, utils_1.maxWireVersion)(server);
        const inTransaction = this.session && this.session.inTransaction();
        if (this.readConcern && (0, utils_1.commandSupportsReadConcern)(cmd) && !inTransaction) {
            Object.assign(cmd, { readConcern: this.readConcern });
        }
        if (this.trySecondaryWrite && serverWireVersion < server_selection_1.MIN_SECONDARY_WRITE_WIRE_VERSION) {
            options.omitReadPreference = true;
        }
        if (this.writeConcern && this.hasAspect(operation_1.Aspect.WRITE_OPERATION) && !inTransaction) {
            write_concern_1.WriteConcern.apply(cmd, this.writeConcern);
        }
        if (options.collation &&
            typeof options.collation === 'object' &&
            !this.hasAspect(operation_1.Aspect.SKIP_COLLATION)) {
            Object.assign(cmd, { collation: options.collation });
        }
        if (typeof options.maxTimeMS === 'number') {
            cmd.maxTimeMS = options.maxTimeMS;
        }
        if (this.hasAspect(operation_1.Aspect.EXPLAINABLE) && this.explain) {
            cmd = (0, utils_1.decorateWithExplain)(cmd, this.explain);
        }
        return server.commandAsync(this.ns, cmd, options);
    }
}
exports.CommandOperation = CommandOperation;
/** @internal */
class CommandCallbackOperation extends CommandOperation {
    constructor(parent, options) {
        super(parent, options);
    }
    executeCommandCallback(server, session, cmd, callback) {
        super.executeCommand(server, session, cmd).then(res => callback(undefined, res), err => callback(err, undefined));
    }
}
exports.CommandCallbackOperation = CommandCallbackOperation;
//# sourceMappingURL=command.js.map