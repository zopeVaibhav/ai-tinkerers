import {
    BuiltInAgent,
    CopilotRuntime,
    InMemoryAgentRunner,
    createCopilotRuntimeHandler,
} from "@copilotkit/runtime/v2";

/**
 * Our own agent passes LLM_MODEL straight to the OpenAI SDK, which wants a bare
 * name. CopilotKit wants provider/model. Namespace it here rather than change an
 * env var both sides read.
 */
const model = (() => {
    const name = process.env.LLM_MODEL ?? "gpt-4.1-mini";
    return name.includes("/") ? name : `openai/${name}`;
})();

const runtime = new CopilotRuntime({
    agents: {
        default: new BuiltInAgent({
            model,
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
