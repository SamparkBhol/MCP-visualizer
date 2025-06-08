import React from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';

const ToolSchemasPanel = ({ toolSchemas, selectedTools }) => {
  if (!toolSchemas || Object.keys(toolSchemas).length === 0) {
    return (
      <div className="anime-card p-6 text-center">
        <p className="text-muted-foreground">No tools available in the system.</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="anime-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-2xl font-semibold mb-6 flex items-center gradient-text">
        <Settings className="w-7 h-7 mr-3 text-primary" />
        Available Cyber-Tools
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(toolSchemas).map(([key, tool]) => (
          <motion.div
            key={key}
            className={`tool-schema-card-anime p-4 rounded-lg ${selectedTools.includes(key) ? 'selected ring-2 ring-accent' : ''} ${tool.color || 'bg-muted/30 border-muted'}`}
            whileHover={{ scale: 1.03, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <span className="text-3xl mr-3 kawaii-icon">{tool.icon}</span>
              <div>
                <h4 className="text-lg font-semibold text-foreground">{tool.name}</h4>
                <p className="text-xs text-muted-foreground">{tool.schema.function.name}()</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ToolSchemasPanel;