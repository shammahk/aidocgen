#! /usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Command } = require("commander");
const program = new Command();
const init_1 = __importDefault(require("./init"));
const parse_1 = __importDefault(require("./parse"));
program.command("init").description("Initialize the aidocgen").action(init_1.default);
program
    .command("parse")
    .argument("<file|directory path>")
    .description("Parse the contents of the file or directory")
    .action(parse_1.default);
program.parse(process.argv);
//# sourceMappingURL=index.js.map