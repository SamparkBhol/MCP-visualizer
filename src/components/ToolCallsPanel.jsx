
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Terminal } from 'lucide-react';

const ToolCallsPanel = ({ toolCalls }) => {
  if (!toolCalls || toolCalls.length === 0) {
    return (
      <div className="app-card-anime p-6 text-center">
        <p className="text-sm text-muted-foreground">Cyber-tool invocation logs will materialize here...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="app-card-anime p-6"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness:150, delay: 0.1 }}
    >
      <h3 className="text-lg font-semibold mb-5 flex items-center text-foreground">
        <Zap className="w-6 h-6 mr-2 text-secondary kawaii-icon" />
        Tool Invocation Matrix
      </h3>
      <div className="space-y-4">
        <AnimatePresence>
          {toolCalls.map((call, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-lg bg-card/70 border border-border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.08, type: "spring", stiffness:180 }}
              whileHover={{borderColor: "hsl(var(--secondary))", boxShadow: "0 2px 8px hsla(var(--secondary-raw),0.1)"}}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-medium text-secondary flex items-center">
                  <Terminal size={16} className="mr-1.5"/> {call.tool}
                </h4>
                <span className="text-xs text-muted-foreground">{call.function}()</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div>
                  <strong className="text-foreground">Parameters Sent:</strong>
                  <pre className="code-block-anime mt-1.5 text-xs">{JSON.stringify(call.parameters, null, 2)}</pre>
                </div>
                <div>
                  <strong className="text-foreground">Result Received:</strong>
                  <div className="code-block-anime mt-1.5 text-green-400 dark:text-green-300 italic">"{call.result}"</div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ToolCallsPanel;
