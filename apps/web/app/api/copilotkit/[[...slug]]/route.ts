import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import {
    BuiltInAgent,
    CopilotRuntime,
    InMemoryAgentRunner,
    createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

/**
 * The chat model, built from the same three env vars the server's agent reads.
 *
 * Passing CopilotKit a model *name* makes it choose the provider and the
 * endpoint for us, which is fine only while that endpoint is OpenAI's. Handing
 * it a built model instead means LLM_BASE_URL is honoured, so the whole product
 * points at one provider — OpenRouter, a local server, OpenAI — by changing
 * .env and nothing else.
 *
 * It also retires a fork: the name no longer has to be namespaced here and bare
 * on the server, because the id now goes to the endpoint exactly as written.
 */
const provider = createOpenAICompatible({
    name: "llm",
    baseURL: process.env.LLM_BASE_URL ?? "https://api.openai.com/v1",
    apiKey: process.env.LLM_API_KEY,
});

const model = process.env.LLM_MODEL ?? "openai/gpt-4.1-mini";

/**
 * CopilotKit asks for 65536 output tokens by default, and a provider that bills
 * against a balance rejects the whole request on the ceiling alone — OpenRouter
 * answers "requires more credits, or fewer max_tokens" before generating a
 * word. This agent shows a card and adds a sentence or two, so the real ceiling
 * is nowhere near either number.
 */
const MAX_OUTPUT_TOKENS = 4096;

console.log(`copilotkit runtime model: ${model} via ${process.env.LLM_BASE_URL}`);

const runtime = new CopilotRuntime({
    agents: {
        default: new BuiltInAgent({
            model: provider(model),
            maxSteps: 5,
            maxOutputTokens: MAX_OUTPUT_TOKENS,
        }),
    },
    runner: new InMemoryAgentRunner(),
});

const handler = createCopilotRuntimeHandler({ runtime, basePath: "/api/copilotkit" });

export const GET = handler;
export const POST = handler;
export const OPTIONS = handler;
