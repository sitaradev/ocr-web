"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cli = void 0;
const commander_1 = require("commander");
const _1 = require("./");
const api_1 = require("./api");
const client_1 = require("./client");
const inputs_1 = require("./inputs");
const console = __importStar(require("console"));
const program = new commander_1.Command();
const COMMAND_CUSTOM = "custom";
//
// PRODUCT CONFIGURATION
//
// The Map's key is the command name as it will appear on the console.
//
const CLI_COMMAND_CONFIG = new Map([
    [
        COMMAND_CUSTOM,
        {
            displayName: "Custom Document",
            docClass: _1.CustomV1,
            fullText: false,
            async: false,
            sync: true,
        },
    ],
    [
        "invoice",
        {
            displayName: "Invoice",
            docClass: _1.InvoiceV4,
            fullText: true,
            async: false,
            sync: true,
        },
    ],
    [
        "invoice-splitter",
        {
            displayName: "Invoice Splitter",
            docClass: _1.InvoiceSplitterV1,
            fullText: false,
            async: true,
            sync: false,
        },
    ],
    [
        "receipt",
        {
            displayName: "Expense Receipt",
            docClass: _1.ReceiptV5,
            fullText: true,
            async: false,
            sync: true,
        },
    ],
    [
        "passport",
        {
            displayName: "Passport",
            docClass: _1.PassportV1,
            fullText: false,
            async: false,
            sync: true,
        },
    ],
    [
        "financial",
        {
            displayName: "Financial Document",
            docClass: _1.FinancialDocumentV1,
            fullText: true,
            async: false,
            sync: true,
        },
    ],
    [
        "fr-id-card",
        {
            displayName: "FR ID Card",
            docClass: _1.fr.IdCardV1,
            fullText: false,
            async: false,
            sync: true,
        },
    ],
    [
        "fr-bank-account-details",
        {
            displayName: "FR Bank Account Details",
            docClass: _1.fr.BankAccountDetailsV1,
            fullText: false,
            async: false,
            sync: true,
        },
    ],
    [
        "fr-carte-vitale",
        {
            displayName: "FR Carte Vitale",
            docClass: _1.fr.CarteVitaleV1,
            fullText: false,
            async: false,
            sync: true,
        },
    ],
    [
        "eu-license-plate",
        {
            displayName: "EU License Plate",
            docClass: _1.eu.LicensePlateV1,
            fullText: false,
            async: false,
            sync: true,
        },
    ],
    [
        "us-bank-check",
        {
            displayName: "US Bank Check",
            docClass: _1.us.BankCheckV1,
            fullText: false,
            async: false,
            sync: true,
        },
    ],
    [
        "mvision",
        {
            displayName: "Mindee Vision",
            docClass: _1.MindeeVisionV1,
            fullText: false,
            async: false,
            sync: true,
        },
    ],
]);
//
// EXECUTE THE COMMANDS
//
function initClient(command, options) {
    const mindeeClient = new client_1.Client({
        apiKey: options.apiKey,
        debug: options.debug,
    });
    if (command === COMMAND_CUSTOM) {
        mindeeClient.addEndpoint({
            accountName: options.user,
            endpointName: options.documentType,
        });
    }
    return mindeeClient;
}
function getConfig(command) {
    const conf = CLI_COMMAND_CONFIG.get(command);
    if (conf === undefined) {
        throw new Error(`Invalid document type ${command}`);
    }
    return conf;
}
function getPredictParams(command, options, conf) {
    let pageOptions = undefined;
    if (options.cutPages) {
        pageOptions = {
            operation: inputs_1.PageOptionsOperation.KeepOnly,
            pageIndexes: [0, 1, 2, 3, 4],
            onMinPages: 5,
        };
    }
    const predictParams = {
        endpointName: command === COMMAND_CUSTOM ? options.documentType : conf.docClass.name,
        accountName: command === COMMAND_CUSTOM ? options.user : api_1.STANDARD_API_OWNER,
        fullText: options.fullText,
        pageOptions: pageOptions,
    };
    return predictParams;
}
async function callParse(command, inputPath, options) {
    const conf = getConfig(command);
    const mindeeClient = initClient(command, options);
    const predictParams = getPredictParams(command, options, conf);
    const doc = mindeeClient.docFromPath(inputPath);
    const response = await doc.parse(conf.docClass, predictParams);
    printResponse(response, options);
}
async function callEnqueue(command, inputPath, options) {
    const conf = getConfig(command);
    const mindeeClient = initClient(command, options);
    const predictParams = getPredictParams(command, options, conf);
    const doc = mindeeClient.docFromPath(inputPath);
    const response = await doc.enqueue(conf.docClass, predictParams);
    console.log(response.job);
}
async function callParseQueued(command, queueId, options) {
    const conf = getConfig(command);
    const mindeeClient = initClient(command, options);
    const predictParams = getPredictParams(command, options, conf);
    const doc = mindeeClient.docForAsync();
    const response = await doc.parseQueued(conf.docClass, queueId, predictParams);
    if (response.document !== undefined) {
        printResponse(response.document, options);
    }
    else {
        console.log(response.job);
    }
}
function printResponse(response, options) {
    if (options.fullText) {
        response.pages.forEach((page) => {
            console.log(page.fullText?.toString());
        });
    }
    if (options.pages) {
        response.pages.forEach((page) => {
            console.log(`\n${page}`);
        });
    }
    if (response.document) {
        console.log(`\n${response.document}`);
    }
}
//
// BUILD THE COMMANDS
//
function addMainOptions(prog) {
    prog.option("-k, --api-key <api_key>", "API key for document endpoint");
}
function addPostOptions(prog, info) {
    prog.option("-c, --cut-pages", "keep only the first 5 pages of the document");
    if (info.fullText) {
        prog.option("-t, --full-text", "include full document text in response");
    }
    prog.argument("<input_path>", "full path to the file");
}
function addCustomPostOptions(prog) {
    prog.requiredOption("-e, --endpoint <endpoint_name>", "API endpoint name (required)");
    prog.requiredOption("-a, --account <account_name>", "API account name for the endpoint (required)");
    prog.option("-v, --version <version>", "version for the endpoint, use the latest version if not specified");
}
function addDisplayOptions(prog) {
    prog.option("-p, --pages", "show content of individual pages");
}
function routeSwitchboard(command, inputPath, allOptions) {
    switch (command.parent?.name()) {
        case "parse": {
            return callParse(command.name(), inputPath, allOptions);
        }
        case "enqueue": {
            return callEnqueue(command.name(), inputPath, allOptions);
        }
        case "parse-queued": {
            return callParseQueued(command.name(), inputPath, allOptions);
        }
        default: {
            throw new Error("Unhandled parent command.");
        }
    }
}
function addAction(prog) {
    if (prog.name() === COMMAND_CUSTOM) {
        prog.action(function (inputPath, options, command) {
            const allOptions = {
                ...prog.parent?.parent?.opts(),
                ...prog.parent?.opts(),
                ...prog.opts(),
                ...options,
            };
            return routeSwitchboard(command, inputPath, allOptions);
        });
    }
    else {
        prog.action(function (inputPath, options, command) {
            const allOptions = {
                ...prog.parent?.parent?.opts(),
                ...prog.parent?.opts(),
                ...prog.opts(),
                ...options,
            };
            return routeSwitchboard(command, inputPath, allOptions);
        });
    }
}
function cli() {
    program.name("mindee");
    program.option("-d, --debug", "high verbosity mode");
    const predict = program.command("parse").description("Parse synchronously.");
    addMainOptions(predict);
    const enqueue = program
        .command("enqueue")
        .description("Add to async parse queue.");
    addMainOptions(enqueue);
    const parseQueued = program
        .command("parse-queued")
        .description("Parse from async queue.");
    addMainOptions(parseQueued);
    CLI_COMMAND_CONFIG.forEach((info, name) => {
        if (info.sync) {
            const prog = predict
                .command(name)
                .description(`Parse an ${info.displayName}.`);
            if (name === COMMAND_CUSTOM) {
                addCustomPostOptions(prog);
            }
            addDisplayOptions(prog);
            addPostOptions(prog, info);
            addAction(prog);
        }
        if (info.async) {
            const progEnqueue = enqueue
                .command(name)
                .description(`Add an ${info.displayName} to the queue.`);
            if (name === COMMAND_CUSTOM) {
                addCustomPostOptions(progEnqueue);
            }
            addPostOptions(progEnqueue, info);
            addAction(progEnqueue);
            const progParse = parseQueued
                .command(name)
                .description(`Parse an ${info.displayName} from the queue.`)
                .argument("<doc_id>", "ID of the document");
            addDisplayOptions(progParse);
            addAction(progParse);
        }
    });
    program.parse(process.argv);
}
exports.cli = cli;
