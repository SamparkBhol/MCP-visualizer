
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Brain } from 'lucide-react';

const ContextLogPanel = ({ executionLog }) => {
  if (!executionLog || executionLog.length === 0) {
    return (
      <div className="app-card-anime p-6 text-center">
        <p className="text-sm text-muted-foreground">AI's inner monologue will appear here...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="app-card-anime p-6"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, type: "spring", stiffness:150, delay: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-5 flex items-center text-foreground">
        <Brain className="w-6 h-6 mr-2 text-primary kawaii-icon" />
        AI Context Chronicle
      </h3>
      <div className="max-h-96 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
        {executionLog.map((entry, index) => (
          <motion.div
            key={index}
            className="p-3 rounded-md bg-card/70 border border-border text-xs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            whileHover={{borderColor: "hsl(var(--primary))", scale: 1.01}}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-primary">{entry.step}</span>
              <span className="text-[0.7rem] text-muted-foreground">{entry.timestamp}</span>
            </div>
            <p className="text-foreground whitespace-pre-wrap text-[0.8rem]">{entry.details}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ContextLogPanel;
