
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Play, RotateCcw, Lightbulb, Send, Settings2, Wand2 } from 'lucide-react';

const InputPanel = ({
  userPrompt,
  setUserPrompt,
  isExecuting,
  executeSimulation,
  resetSimulation,
  examplePrompts,
  toolSchemas,
  selectedTools,
}) => {
  const handleExecute = () => {
    if (!userPrompt.trim()) {
      toast({
        title: "🤔 Task Required!",
        description: "Please tell the AI what to do.",
        variant: "destructive",
      });
      return;
    }
    executeSimulation();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 180, damping: 20 } }
  };


  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div className="app-card-anime p-6 md:p-8" variants={itemVariants}>
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-foreground flex items-center">
          <Send size={22} className="mr-2.5 text-primary kawaii-icon" />
          Craft Your AI's Mission
        </h2>
        <p className="text-sm text-muted-foreground mb-5">
          Type your command! Our AI agent is ready to parse it, select tools, and show you how it works, anime-style! ✨
        </p>
        <Textarea
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="e.g., 'Find top anime of the year and draft a blog post summary...'"
          className="w-full h-36 app-input-anime text-sm"
          disabled={isExecuting}
        />
      
        <div className="flex flex-col sm:flex-row gap-3 mt-5">
          <Button
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex-1 app-button-anime bg-primary hover:bg-primary/90 text-primary-foreground text-sm"
          >
            {isExecuting ? (
              <>
                <div className="loading-spinner-dynamic mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <Play size={18} className="mr-1.5" />
                Launch Simulation!
              </>
            )}
          </Button>
          <Button
            onClick={resetSimulation}
            variant="outline"
            className="flex-1 app-button-anime text-sm border-primary/50 text-primary hover:bg-primary/10"
            disabled={isExecuting && userPrompt === ''}
          >
            <RotateCcw size={18} className="mr-1.5" />
            Reset
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div className="app-card-anime p-6" variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-3.5 text-foreground flex items-center">
            <Lightbulb size={20} className="mr-2 text-accent kawaii-icon" />
            Mission Ideas
          </h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {examplePrompts.map((prompt, index) => (
              <motion.button
                key={index}
                onClick={() => setUserPrompt(prompt)}
                disabled={isExecuting}
                className="w-full text-left text-xs text-muted-foreground hover:text-primary p-2.5 rounded-md hover:bg-primary/5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
                whileHover={{ x: 3, backgroundColor: 'hsla(var(--primary-raw), 0.08)' }}
                whileTap={{ scale: 0.98 }}
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div className="app-card-anime p-6" variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-3.5 text-foreground flex items-center">
            <Wand2 size={20} className="mr-2 text-secondary kawaii-icon" />
            Available Cyber-Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
            {Object.entries(toolSchemas).map(([key, tool]) => (
              <motion.div
                key={key}
                className={`p-3 rounded-lg border text-xs transition-all duration-200 cursor-default
                  ${selectedTools.includes(key)
                    ? 'border-accent bg-accent/10 shadow-md shadow-accent/20'
                    : 'border-border bg-card/50 hover:border-secondary/70'
                  }`}
                whileHover={{ y: -2, scale:1.02,  boxShadow: "0 3px 10px hsla(var(--secondary-raw),0.1)" }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-xl ">{tool.icon}</span>
                  <h4 className="font-medium text-foreground text-sm">{tool.name}</h4>
                </div>
                <p className="text-muted-foreground text-[0.7rem] leading-snug">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InputPanel;
