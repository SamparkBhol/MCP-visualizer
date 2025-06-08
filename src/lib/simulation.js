export const simulateStepExecution = async (stepId, prompt, toolSchemas) => {
  switch (stepId) {
    case 'parse':
      return `Analyzing user request: "${prompt}". Identified primary intent and potential sub-tasks.`;
    case 'discover':
      return `Scanning tool manifest... Found ${Object.keys(toolSchemas).length} tools: ${Object.values(toolSchemas).map(t => t.name).join(', ')}.`;
    case 'select':
      const tools = selectToolsForPrompt(prompt, toolSchemas);
      if (tools.length === 0) return "No suitable tools found for this request.";
      return `Selected ${tools.length} tools: ${tools.map(t => toolSchemas[t].name).join(', ')}. Rationale: Best fit for task requirements.`;
    case 'plan':
      return `Generating execution plan... Strategy: Sequential tool invocation with data piping. Contingency plans established.`;
    case 'execute':
      return `Initiating tool operations... All systems nominal. Monitoring tool responses in real-time.`;
    case 'update':
      return `Contextual memory updated with results. Task status: Completed. AI ready for new instructions.`;
    default:
      return 'Processing...';
  }
};

export const selectToolsForPrompt = (prompt, toolSchemas) => {
  const tools = [];
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('search') || lowerPrompt.includes('find') || lowerPrompt.includes('look up')) tools.push('searchEngine');
  if (lowerPrompt.includes('code') || lowerPrompt.includes('script') || lowerPrompt.includes('python') || lowerPrompt.includes('javascript')) tools.push('codeInterpreter');
  if (lowerPrompt.includes('file') || lowerPrompt.includes('read') || lowerPrompt.includes('write') || lowerPrompt.includes('document')) tools.push('fileManager');
  if (lowerPrompt.includes('email') || lowerPrompt.includes('send') || lowerPrompt.includes('message') || lowerPrompt.includes('chat')) tools.push('communicationUnit');
  
  // If no specific tools are matched, try a general approach
  if (tools.length === 0 && Object.keys(toolSchemas).length > 0) {
    if (lowerPrompt.length > 10) tools.push(Object.keys(toolSchemas)[0]); // Default to first tool for complex prompts
  }
  
  return [...new Set(tools)]; // Return unique tools
};

export const generateToolCalls = (prompt, selectedTools, toolSchemas) => {
  return selectedTools.map(toolKey => {
    const tool = toolSchemas[toolKey];
    if (!tool) return null; 

    const mockCall = {
      tool: tool.name,
      function: tool.schema.function.name,
      parameters: generateMockParameters(toolKey, prompt),
      result: generateMockResult(toolKey)
    };
    return mockCall;
  }).filter(call => call !== null);
};

const generateMockParameters = (toolKey, prompt) => {
  const lowerPrompt = prompt.toLowerCase();
  switch (toolKey) {
    case 'searchEngine':
      let query = "latest AI advancements";
      if (lowerPrompt.includes("weather")) query = "weather in Neo-Tokyo";
      else if (lowerPrompt.match(/search for (["'])(.*?)\1/)) query = lowerPrompt.match(/search for (["'])(.*?)\1/)[2];
      return { query: query, scope: "web" };
    case 'codeInterpreter':
      return { language: "python", code: "print('Hello from the Logic Core!')" };
    case 'fileManager':
      return { operation: "read", filePath: "/data/report_alpha.txt" };
    case 'communicationUnit':
      return { channel: "chat", recipient: "CommanderAnya", message: "Mission update: Parameters processed." };
    default:
      return {};
  }
};

const generateMockResult = (toolKey) => {
  switch (toolKey) {
    case 'searchEngine':
      return "Found 3 critical articles on AI breakthroughs. Top result: 'Quantum Entanglement in Neural Networks'.";
    case 'codeInterpreter':
      return "Execution successful. Output: 'Hello from the Logic Core!'";
    case 'fileManager':
      return "File '/data/report_alpha.txt' read. Content: 15 pages of strategic analysis.";
    case 'communicationUnit':
      return "Message transmitted to CommanderAnya via secure chat. Confirmation received.";
    default:
      return "Tool operation completed successfully.";
  }
};