
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Terminal, Send, Brain, Settings, Play, RotateCcw, Sparkles, ChevronRight, Eye, Zap, MessageSquare, FileText, Users, HelpCircle, Cpu } from 'lucide-react';
import AboutPanel from '@/components/AboutPanel';
import InputPanel from '@/components/InputPanel';
import OutputPanel from '@/components/OutputPanel';
import { TOOL_SCHEMAS, EXECUTION_STEPS, examplePrompts } from '@/config/constants';
import { simulateStepExecution, selectToolsForPrompt, generateToolCalls } from '@/lib/simulation';

function App() {
  const [userPrompt, setUserPrompt] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [selectedTools, setSelectedTools] = useState([]);
  const [executionLog, setExecutionLog] = useState([]);
  const [toolCalls, setToolCalls] = useState([]);
  const [activeTab, setActiveTab] = useState("input");

  const executeSimulation = async () => {
    if (!userPrompt.trim()) {
      toast({
        title: "🤖 Prompt Missing!",
        description: "Please give the AI a task to visualize.",
        variant: "destructive",
      });
      return;
    }

    setIsExecuting(true);
    setCurrentStep(0);
    setExecutionLog([]);
    setToolCalls([]);
    setSelectedTools([]);
    setActiveTab("output");

    for (let i = 0; i < EXECUTION_STEPS.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 800)); // Even faster simulation

      const step = EXECUTION_STEPS[i];
      const logEntry = {
        step: step.name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        details: await simulateStepExecution(step.id, userPrompt, TOOL_SCHEMAS)
      };
      setExecutionLog(prev => [...prev, logEntry]);
      
      if (step.id === 'select') {
        const tools = selectToolsForPrompt(userPrompt, TOOL_SCHEMAS);
        setSelectedTools(tools);
      }

      if (step.id === 'execute') {
        const calls = generateToolCalls(userPrompt, selectedTools, TOOL_SCHEMAS);
        setToolCalls(calls);
      }
    }

    setCurrentStep(-1);
    setIsExecuting(false);
    
    toast({
      title: "✨ Simulation Complete ✨",
      description: "AI task processing finished. Check the Output & Logs tab!",
    });
  };

  const resetSimulation = () => {
    setUserPrompt('');
    setIsExecuting(false);
    setCurrentStep(-1);
    setSelectedTools([]);
    setExecutionLog([]);
    setToolCalls([]);
    setActiveTab("input");
    toast({
      title: "🔄 Simulation Reset 🔄",
      description: "Ready for your next amazing command!",
    });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  return (
    <div className="min-h-screen p-3 md:p-5 lg:p-6 bg-background">
      <Toaster />
      
      <motion.header 
        initial={{ opacity: 0, y: -30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
        className="text-center mb-6 md:mb-8"
      >
        <div className="flex items-center justify-center gap-2.5 md:gap-3.5 mb-1.5">
          <Cpu className="w-9 h-9 md:w-12 md:h-12 text-secondary transform transition-transform duration-500 hover:rotate-[360deg] hover:scale-110" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl app-title">
            MCP Visualizer <span className="text-xl font-normal text-secondary opacity-80">Kai</span>
          </h1>
        </div>
        <p className="text-sm sm:text-md md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Dive into the world of AI agents with this interactive Model Context Protocol simulator! 🚀
        </p>
      </motion.header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-5 p-1.5 bg-muted/20 rounded-lg border border-border shadow-sm">
          <TabsTrigger value="about" className="py-2.5 data-[state=active]:tab-active-anime data-[state=inactive]:tab-inactive-anime rounded-md transition-all duration-300 text-xs sm:text-sm font-medium">
            <Info className="w-4 h-4 mr-1.5" /> About
          </TabsTrigger>
          <TabsTrigger value="input" className="py-2.5 data-[state=active]:tab-active-anime data-[state=inactive]:tab-inactive-anime rounded-md transition-all duration-300 text-xs sm:text-sm font-medium">
            <Send className="w-4 h-4 mr-1.5" /> Input Task
          </TabsTrigger>
          <TabsTrigger value="output" className="py-2.5 data-[state=active]:tab-active-anime data-[state=inactive]:tab-inactive-anime rounded-md transition-all duration-300 text-xs sm:text-sm font-medium">
            <Terminal className="w-4 h-4 mr-1.5" /> Output & Logs
          </TabsTrigger>
        </TabsList>
        
        <motion.div
          key={activeTab}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {activeTab === "about" && <TabsContent value="about" forceMount><AboutPanel /></TabsContent>}
          {activeTab === "input" && <TabsContent value="input" forceMount>
            <InputPanel
              userPrompt={userPrompt}
              setUserPrompt={setUserPrompt}
              isExecuting={isExecuting}
              executeSimulation={executeSimulation}
              resetSimulation={resetSimulation}
              examplePrompts={examplePrompts}
              toolSchemas={TOOL_SCHEMAS}
              selectedTools={selectedTools}
            />
          </TabsContent>}
          {activeTab === "output" && <TabsContent value="output" forceMount>
            <OutputPanel
              isExecuting={isExecuting}
              currentStep={currentStep}
              executionLog={executionLog}
              toolCalls={toolCalls}
              executionSteps={EXECUTION_STEPS}
            />
          </TabsContent>}
        </motion.div>
      </Tabs>

      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center mt-10 text-muted-foreground text-xs"
      >
        <p>MCP Visualizer Kai v 1.1.1</p>
        <p>Kawaii AI simulations by Hostinger Horizons! 🎉</p>
      </motion.footer>
    </div>
  );
}

export default App;
