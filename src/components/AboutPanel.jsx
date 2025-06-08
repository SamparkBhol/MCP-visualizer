import React from 'react';
import { motion } from 'framer-motion';
import { Info, Brain, Settings, Zap, Users, FileText, Shield, HelpCircle, CheckCircle, Wand2, Sparkles } from 'lucide-react';

const AboutPanel = () => {
  const features = [
    { icon: <Brain className="w-6 h-6 text-accent-light" />, title: "MCP Simulation Engine", description: "Watch how AI agents interpret tasks and utilize tools through the Model Context Protocol, brought to life!" },
    { icon: <Settings className="w-6 h-6 text-accent-light" />, title: "Tool Schema Galaxy", description: "Explore a universe of mock tool schemas in JSON format, just as AI agents perceive them." },
    { icon: <Zap className="w-6 h-6 text-accent-light" />, title: "Dynamic Execution Flow", description: "Witness a step-by-step animated spectacle of the AI's decision-making journey." },
    { icon: <FileText className="w-6 h-6 text-accent-light" />, title: "Natural Language Command", description: "Issue tasks in plain English and see the AI parse and strategize like a true anime protagonist." },
    { icon: <Users className="w-6 h-6 text-accent-light" />, title: "Intelligent Tool Selection", description: "Uncover the logic behind how the AI picks the perfect tools for any given mission." },
    { icon: <Shield className="w-6 h-6 text-accent-light" />, title: "Context Core Memory", description: "Observe how the AI's understanding (its context memory) evolves throughout complex operations." },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.div 
      className="app-card-anime p-6 md:p-8 glassmorphism"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "circOut" }}
    >
      <div className="text-center mb-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
        >
          <Wand2 className="w-20 h-20 text-primary mx-auto mb-4 anime-icon-shadow" />
        </motion.div>
        <h2 className="text-3xl md:text-4xl font-bold app-title gradient-text-anime mb-3">
          Discover the MCP Visualizer Kai!
        </h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto font-body-font">
          Welcome,ユーザー ! This is the MCP Visualizer - Kai Edition! Step into an interactive simulation of Anthropic's Model Context Protocol, reimagined with anime flair. It's designed to electrify your understanding of how AI models synergize with tools to conquer complex quests.
        </p>
      </div>

      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-6 text-center app-title gradient-text-anime">
          <Sparkles className="inline-block w-6 h-6 mr-2 text-accent" />
          Core Features
          <Sparkles className="inline-block w-6 h-6 ml-2 text-accent" />
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="p-5 rounded-xl bg-background/70 border border-primary/30 h-full flex flex-col items-center text-center hover-float app-card-anime"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover={{ y: -5, boxShadow: "0px 10px 20px hsla(var(--primary), 0.2)"}}
            >
              <motion.div 
                className="mb-3 p-3 bg-primary/10 rounded-full inline-block"
                animate={{ rotate: [0, 10, -10, 0], transition: { repeat: Infinity, duration: 3, delay: index * 0.2} }}
              >
                {feature.icon}
              </motion.div>
              <h4 className="text-xl font-semibold text-foreground mb-2 font-body-font">{feature.title}</h4>
              <p className="text-sm text-foreground/70 flex-grow font-body-font">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="info-panel-anime text-left p-6 rounded-xl border border-secondary/30">
        <h3 className="text-xl font-semibold flex items-center app-title text-secondary mb-3">
          <HelpCircle className="w-6 h-6 mr-2"/>How This Magic Works
        </h3>
        <p className="text-sm font-body-font text-foreground/80">
          You, the protagonist, provide a mission directive (a task in natural language). The Visualizer then simulates an AI user's journey:
        </p>
        <ul className="list-none mt-3 space-y-2 text-sm font-body-font">
          {[
            "Mission Analysis (Parsing): Deciphering your command with keen insight.",
            "Scroll of Tools (Tool Discovery): Identifying available ancient relics and modern gadgets.",
            "Strategic Selection (Tool Selection): Choosing the optimal gear for the quest.",
            "Battle Plan (Execution Planning): Formulating a legendary sequence of actions.",
            "Artifact Activation (Tool Execution): Invoking chosen tools with precise parameters.",
            "Wisdom Gained (Context Update): Integrating new knowledge from tool outputs, leveling up its understanding."
          ].map((item, idx) => (
             <motion.li 
                key={idx} 
                className="flex items-start p-2 rounded-md hover:bg-primary/5"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.1 }}
              >
                <CheckCircle className="w-5 h-5 mr-2.5 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-foreground/90">{item}</span>
             </motion.li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-body-font text-foreground/80">
          This entire saga is visualized, offering a crystal-clear view into the AI's \"thought process.\" All tool interactions are thrillingly simulated with mock data, ensuring a safe and enlightening spectacle!
        </p>
      </div>
    </motion.div>
  );
};

export default AboutPanel;
