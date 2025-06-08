
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Sparkles, Zap, MessageSquare, HelpCircle, Activity, CheckCircle } from 'lucide-react';
import ExecutionTimeline from '@/components/ExecutionTimeline';
import ToolCallsPanel from '@/components/ToolCallsPanel';
import ContextLogPanel from '@/components/ContextLogPanel';

const OutputPanel = ({ isExecuting, currentStep, executionLog, toolCalls, executionSteps }) => {
  const hasOutput = executionLog.length > 0 || toolCalls.length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 18 } }
  };
  
  const isFullyCompleted = !isExecuting && currentStep === -1 && hasOutput;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div className="app-card-anime p-6 md:p-8" variants={itemVariants}>
        <h2 className="text-xl md:text-2xl font-semibold mb-6 flex items-center text-foreground">
          <Terminal className="w-7 h-7 mr-2.5 text-primary kawaii-icon" />
          AI Mission Debrief
        </h2>

        <motion.div className="info-panel-anime mb-6" variants={itemVariants}>
           <h3 className="text-md font-semibold flex items-center"><HelpCircle className="w-5 h-5 mr-1.5 text-accent kawaii-icon"/>Output Zone Explained:</h3>
           <p className="text-sm">
            This is where the AI's simulated actions unfold. Watch the magic happen!
           </p>
           <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-sm">
            <li><strong>Execution Timeline:</strong> Follow each step of the AI's mission, from start to finish.</li>
            <li><strong>Tool Invocation Log:</strong> See which cyber-tools the AI uses and how.</li>
            <li><strong>AI Context Chronicle:</strong> Peek into the AI's "thoughts" as it processes info.</li>
           </ul>
           <p className="mt-2.5 text-sm">
            No mission yet? Head to the "Input Task" tab to launch one!
           </p>
        </motion.div>

        {!hasOutput && !isExecuting && (
          <motion.div 
            className="text-center py-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness:100 }}
          >
            <Activity className="w-14 h-14 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">Awaiting AI mission data...</p>
            <p className="text-sm text-muted-foreground">Launch a simulation from the "Input Task" tab to see results!</p>
          </motion.div>
        )}

        {(hasOutput || isExecuting) && (
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4 flex items-center text-foreground">
                {isFullyCompleted 
                  ? <CheckCircle className="w-6 h-6 mr-2 text-green-500" /> 
                  : <Sparkles className="w-6 h-6 mr-2 text-primary kawaii-icon" />
                }
                Execution Timeline
                {isFullyCompleted && <span className="ml-2 text-sm font-normal text-green-500">(Completed!)</span>}
              </h3>
              <ExecutionTimeline steps={executionSteps} currentStep={currentStep} executionLog={executionLog} isExecuting={isExecuting} />
            </motion.div>

            {toolCalls.length > 0 && (
              <motion.div variants={itemVariants}>
                <ToolCallsPanel toolCalls={toolCalls} />
              </motion.div>
            )}
            
            {executionLog.length > 0 && (
              <motion.div variants={itemVariants}>
                <ContextLogPanel executionLog={executionLog} />
              </motion.div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default OutputPanel;
