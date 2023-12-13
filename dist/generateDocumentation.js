"use strict";
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
const node_fetch_1 = __importDefault(require("node-fetch"));
function generateDocumentation(content, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = "https://api.openai.com/v1/chat/completions";
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        };
        const body = JSON.stringify({
            model: "gpt-3.5-turbo", // or another model you prefer
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {
                    role: "user",
                    content: `Generate a detailed and concise markdown documentation for the following code file:\n${content}`,
                },
            ],
        });
        try {
            const response = yield (0, node_fetch_1.default)(url, {
                method: "POST",
                headers: headers,
                body: body,
            });
            const data = (yield response.json());
            return data.choices[0].message.content; // Extract the generated content
        }
        catch (error) {
            console.error("Error generating documentation:", error);
            return "";
        }
    });
}
exports.default = generateDocumentation;
//# sourceMappingURL=generateDocumentation.js.map