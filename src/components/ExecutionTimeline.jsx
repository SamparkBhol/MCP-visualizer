
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2, ChevronRight, AlertTriangle } from 'lucide-react';

const ExecutionTimeline = ({ steps, currentStep, executionLog, isExecuting }) => {
  if (!steps || steps.length === 0) {
    return (
      <div className="app-card-anime p-6 text-center">
        <p className="text-sm text-muted-foreground">Mission timeline loading...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3.5">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === index;
        const isCompleted = currentStep > index || (!isExecuting && currentStep === -1 && executionLog.length >= steps.length);
        const logEntry = executionLog.find(log => log.step === step.name);
        // A simple error simulation for demonstration, e.g. if a tool "failed"
        const hasError = logEntry && logEntry.details && logEntry.details.toLowerCase().includes("error");


        let statusIcon;
        let borderColorClass = 'border-border';
        let bgColorClass = 'bg-card/80';
        let iconColorClass = 'text-muted-foreground';
        let iconBgClass = 'bg-muted/20';

        if (isActive && isExecuting) {
          statusIcon = <Loader2 className="w-4 h-4 text-primary animate-spin" />;
          borderColorClass = 'active border-primary shadow-lg shadow-primary/20';
          bgColorClass = 'bg-primary/5';
          iconColorClass = 'text-primary';
          iconBgClass = 'bg-primary/10';
        } else if (hasError) {
          statusIcon = <AlertTriangle className="w-4 h-4 text-destructive" />;
          borderColorClass = 'completed border-destructive shadow-md shadow-destructive/15';
          bgColorClass = 'bg-destructive/5';
          iconColorClass = 'text-destructive';
          iconBgClass = 'bg-destructive/10';
        } else if (isCompleted) {
          statusIcon = <CheckCircle className="w-4 h-4 text-green-500" />;
          borderColorClass = 'completed border-green-500 shadow-md shadow-green-500/15';
          bgColorClass = 'bg-green-500/5';
          iconColorClass = 'text-green-500';
          iconBgClass = 'bg-green-500/10';
        } else {
          statusIcon = <ChevronRight className="w-4 h-4 text-muted-foreground opacity-70" />;
        }
        
        return (
          <motion.div
            key={step.id}
            className={`execution-step-anime p-4 rounded-lg flex items-start gap-3.5 ${borderColorClass} ${bgColorClass}`}
            initial={{ opacity: 0, x: -20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.07, type: "spring", stiffness: 180, damping: 20 }}
            whileHover={{y: -2, boxShadow: "0 4px 10px hsla(var(--foreground-raw),0.05)"}}
          >
            <div className={`mt-0.5 p-2 rounded-full ${iconBgClass}`}>
              <Icon className={`w-5 h-5 ${iconColorClass}`} />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-foreground">{step.name}</h4>
              <p className="text-xs text-muted-foreground">{step.description}</p>
              {logEntry && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: '0.5rem' }}
                  transition={{duration: 0.25}}
                  className={`p-2.5 bg-background/70 rounded text-xs border ${hasError ? 'border-destructive/50' : 'border-border'}`}
                >
                  <p className={`whitespace-pre-wrap ${hasError ? 'text-destructive' : 'text-foreground'}`}>{logEntry.details}</p>
                  <p className="text-[0.7rem] text-muted-foreground mt-1.5">{logEntry.timestamp}</p>
                </motion.div>
              )}
            </div>
            <div className="self-center ml-auto">
              {statusIcon}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ExecutionTimeline;
