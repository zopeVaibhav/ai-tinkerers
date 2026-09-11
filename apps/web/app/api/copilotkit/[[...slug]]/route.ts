import {
    BuiltInAgent,
    CopilotRuntime,
    InMemoryAgentRunner,
    createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

const runtime = new CopilotRuntime({
    agents: {
        default: new BuiltInAgent({
            model: process.env.LLM_MODEL ?? "openai/gpt-4.1-mini",
            apiKey: process.env.LLM_API_KEY,
            maxSteps: 5,
        }),
    },
    runner: new InMemoryAgentRunner(),
});

const handler = createCopilotRuntimeHandler({ runtime, basePath: "/api/copilotkit" });

export const GET = handler;
export const POST = handler;
export const OPTIONS = handler;
