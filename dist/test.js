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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const cli_progress_1 = __importDefault(require("cli-progress"));
const generateTests_1 = __importDefault(require("./generateTests"));
const countFilesInDirectory_1 = __importDefault(require("./utils/countFilesInDirectory"));
const loadConfig_1 = __importDefault(require("./loadConfig"));
const init_1 = __importDefault(require("./init"));
const rootDir = ".";
let totalFiles = 0;
let currentCount = 0;
let apiKey = "";
// Initialize the progress bar
const progressBar = new cli_progress_1.default.SingleBar({
    format: "Processing | {bar} | {percentage}% | {value}/{total} | {filename}",
}, cli_progress_1.default.Presets.shades_classic);
function processFile(fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        let markdownContent = `\n\n # Test for File: ${path.basename(fileName)}\n\n`;
        // Update the progress bar to show the current file
        progressBar.update(currentCount, {
            filename: `Processing ${path.basename(fileName)}`,
        });
        const fileContents = fs.readFileSync(fileName, "utf8");
        markdownContent += yield (0, generateTests_1.default)(fileContents, apiKey);
        progressBar.increment((currentCount / totalFiles) * 100);
        return markdownContent;
    });
}
function processDirectory(directory = rootDir) {
    return __awaiter(this, void 0, void 0, function* () {
        let markdownContent = `# Test for Directory: ${directory}\n\n`;
        const files = fs.readdirSync(directory);
        for (const file of files) {
            const fullPath = path.join(directory, file);
            if (fs.statSync(fullPath).isDirectory()) {
                markdownContent += yield processDirectory(fullPath);
                // } else if (fullPath.endsWith(".ts")) {
            }
            else {
                totalFiles > currentCount && (currentCount += 1);
                markdownContent += yield processFile(fullPath);
            }
        }
        return markdownContent;
    });
}
function parse(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        // Read the API key from the config file
        let config;
        try {
            config = (0, loadConfig_1.default)();
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Config error", error.message);
                (0, init_1.default)();
            }
            return "";
        }
        apiKey = config.openaiApiKey;
        let Test = "";
        if (fs.statSync(filePath).isDirectory()) {
            totalFiles = (0, countFilesInDirectory_1.default)(filePath);
            progressBar.start(totalFiles, currentCount);
            Test = yield processDirectory(filePath);
        }
        else {
            progressBar.start(1, 1);
            Test = yield processFile(filePath);
        }
        progressBar.stop();
        console.log(`Finished creating test ${filePath}`);
        const outputFilePath = fs.statSync(filePath).isDirectory()
            ? path.join(filePath, `${path.basename(filePath)}-Test.js`)
            : path.join(path.dirname(filePath), `${path.basename(filePath, path.extname(filePath))}-Test.js`);
        fs.writeFileSync(outputFilePath, Test);
    });
}
exports.default = parse;
//# sourceMappingURL=test.js.map