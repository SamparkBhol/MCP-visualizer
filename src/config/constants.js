import { Scroll, Eye, Zap, Brain, Settings, Shield, FileText, Users, HelpCircle } from 'lucide-react';

export const TOOL_SCHEMAS = {
  searchEngine: {
    name: "Data Stream Search",
    description: "Scans the digital universe for information.",
    icon: "🔍",
    schema: {
      type: "function",
      function: {
        name: "digital_search",
        description: "Queries the vast data streams for specific knowledge.",
        parameters: {
          type: "object",
          properties: {
            query: { type: "string", description: "The search term or question." },
            scope: { type: "string", enum: ["web", "academic", "news"], description: "The domain to search within." }
          },
          required: ["query"]
        }
      }
    },
    color: "bg-blue-500/20 border-blue-500"
  },
  codeInterpreter: {
    name: "Logic Core Interpreter",
    description: "Executes and analyzes code snippets.",
    icon: "💻",
    schema: {
      type: "function",
      function: {
        name: "execute_code",
        description: "Runs a piece of code in a secure environment.",
        parameters: {
          type: "object",
          properties: {
            language: { type: "string", enum: ["python", "javascript", "bash"], description: "The programming language." },
            code: { type: "string", description: "The code to execute." }
          },
          required: ["language", "code"]
        }
      }
    },
    color: "bg-green-500/20 border-green-500"
  },
  fileManager: {
    name: "Archive Navigator",
    description: "Manages and processes files in the system.",
    icon: "📁",
    schema: {
      type: "function",
      function: {
        name: "access_file",
        description: "Reads, writes, or modifies files.",
        parameters: {
          type: "object",
          properties: {
            operation: { type: "string", enum: ["read", "write", "summarize"], description: "The file operation." },
            filePath: { type: "string", description: "Path to the file." },
            content: { type: "string", description: "Content to write (if applicable)." }
          },
          required: ["operation", "filePath"]
        }
      }
    },
    color: "bg-yellow-500/20 border-yellow-500"
  },
  communicationUnit: {
    name: "Comms Relay",
    description: "Sends messages through various channels.",
    icon: "📡",
    schema: {
      type: "function",
      function: {
        name: "send_message",
        description: "Transmits a message to a specified recipient.",
        parameters: {
          type: "object",
          properties: {
            channel: { type: "string", enum: ["email", "chat", "hologram"], description: "Communication channel." },
            recipient: { type: "string", description: "The recipient's address or ID." },
            message: { type: "string", description: "The message content." }
          },
          required: ["channel", "recipient", "message"]
        }
      }
    },
    color: "bg-purple-500/20 border-purple-500"
  }
};

export const EXECUTION_STEPS = [
  { id: 'parse', name: 'Parse User Request', icon: FileText, description: 'AI deciphers the user\'s task.' },
  { id: 'discover', name: 'Tool Discovery', icon: Eye, description: 'Identifies available and relevant tools.' },
  { id: 'select', name: 'Tool Selection', icon: Users, description: 'Chooses the optimal tools for the task.' },
  { id: 'plan', name: 'Execution Planning', icon: Brain, description: 'Formulates a step-by-step action plan.' },
  { id: 'execute', name: 'Tool Execution', icon: Zap, description: 'AI invokes selected tools with parameters.' },
  { id: 'update', name: 'Context Update', icon: Shield, description: 'Integrates tool outputs and updates its understanding.' }
];

export const examplePrompts = [
  "Search the web for 'latest advancements in AI' and summarize the findings.",
  "Write a Python script to sort a list of numbers and then send it via chat to 'CodeReviewBot'.",
  "Read the 'project_brief.txt' file and create a summary for an email to my_team@example.com.",
  "What's the weather in Tokyo? Then, find a recipe for ramen."
];