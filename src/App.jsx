import React, { useState, useEffect } from 'react';
import { Bot, Zap, Shield, Database, Code, MessageSquare, Upload, Brain, Server, Lock, CheckCircle, ArrowRight, Github, BookOpen, Sparkles, Cloud, Search, FileText, Link, ChevronRight } from 'lucide-react';

export default function DiscordBotWebsite() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "PDF Processing",
      description: "Upload and process PDF documents with advanced text extraction using PyPDF2",
      color: "from-blue-400 to-cyan-500"
    },
    {
      icon: <Link className="w-6 h-6" />,
      title: "Web Scraping",
      description: "Extract content from URLs using BeautifulSoup4 for comprehensive knowledge gathering",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Q&A",
      description: "Ask questions and get accurate answers powered by Groq's Llama 3.3 70B model",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Server-Specific Storage",
      description: "Each Discord server maintains its own isolated knowledge base for security",
      color: "from-indigo-400 to-blue-500"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Vector Search",
      description: "Uses FAISS for efficient similarity search across your knowledge base",
      color: "from-blue-400 to-purple-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "LLM Integration",
      description: "Seamless integration with Groq API for lightning-fast AI responses",
      color: "from-purple-400 to-blue-500"
    }
  ];

  const techStack = [
    { name: "Discord.py", description: "Bot framework", icon: <MessageSquare /> },
    { name: "LangChain", description: "RAG pipeline", icon: <Link /> },
    { name: "FAISS", description: "Vector database", icon: <Database /> },
    { name: "HuggingFace", description: "Embeddings", icon: <Brain /> },
    { name: "Groq", description: "LLM inference", icon: <Zap /> },
    { name: "FastAPI", description: "Backend API", icon: <Code /> }
  ];

  const commands = [
    {
      command: "-upload [URLs] [PDFs]",
      description: "Upload content to the knowledge base",
      example: "-upload https://example.com",
      permission: "Manage Messages"
    },
    {
      command: "-ask <question>",
      description: "Ask a question based on uploaded content",
      example: "-ask What is the main topic?",
      permission: "None"
    },
    {
      command: "-help",
      description: "Display help message with all commands",
      example: "-help",
      permission: "None"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Upload Phase",
      description: "PDFs are processed and URLs are scraped. Text is split into 400-character chunks with 60-char overlap.",
      icon: <Upload />,
      color: "bg-gradient-to-br from-blue-400 to-cyan-500"
    },
    {
      step: 2,
      title: "Embedding Phase",
      description: "Chunks are embedded using HuggingFace's all-MiniLM-L6-v2 model for semantic understanding.",
      icon: <Brain />,
      color: "bg-gradient-to-br from-cyan-400 to-blue-500"
    },
    {
      step: 3,
      title: "Storage Phase",
      description: "Embeddings are stored in a FAISS vector database, isolated per Discord server.",
      icon: <Database />,
      color: "bg-gradient-to-br from-blue-500 to-indigo-500"
    },
    {
      step: 4,
      title: "Query Phase",
      description: "Questions are embedded, top 4 relevant chunks retrieved, and AI generates accurate answers.",
      icon: <Sparkles />,
      color: "bg-gradient-to-br from-indigo-400 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-20 right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute top-40 left-20 w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-20 right-40 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <Bot className="w-8 h-8 text-blue-600 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                <div className="absolute -inset-2 bg-blue-400 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                RAG Discord Bot
              </span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">How It Works</a>
              <a href="#tech" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">Tech Stack</a>
              <a href="#api" className="text-slate-700 hover:text-blue-600 transition-colors font-medium">API</a>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-on-scroll" id="hero-text" style={{
              opacity: isVisible['hero-text'] ? 1 : 0,
              transform: isVisible['hero-text'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2 w-fit">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Knowledge Base
                </span>
              </div>
              <h1 className="text-6xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 bg-clip-text text-transparent">
                  Transform Your Discord
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Into An AI Brain
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                A powerful RAG-based Discord bot that processes PDFs and web content, creating an intelligent knowledge base for each server. Ask questions and get instant, accurate answers.
              </p>
              <div className="flex items-center gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                  Start Using Bot
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <a href="https://github.com/armanphaugat/q-aragbaseddicordbotproject" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white border-2 border-blue-200 text-blue-700 rounded-xl font-bold text-lg hover:border-blue-400 hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                  <Github className="w-5 h-5" />
                  View Source
                </a>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700 font-medium">Server Isolated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700 font-medium">AI Powered</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-slate-700 font-medium">Open Source</span>
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-on-scroll" id="hero-visual" style={{
              opacity: isVisible['hero-visual'] ? 1 : 0,
              transform: isVisible['hero-visual'] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
            }}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-3xl blur-3xl" />
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Bot className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">RAG Bot</div>
                        <div className="text-sm text-slate-500">Online</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                        <div className="text-xs text-blue-600 font-semibold mb-1">USER</div>
                        <div className="text-slate-800">-ask What features does this bot have?</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-4 text-white shadow-lg">
                        <div className="text-xs font-semibold mb-1 opacity-90">RAG BOT</div>
                        <div className="leading-relaxed">
                          Based on the uploaded content, this bot features PDF processing, web scraping, AI-powered Q&A with Groq's Llama 3.3 70B, server-specific storage, and FAISS vector search for semantic retrieval. 🚀
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-center gap-2 text-sm text-slate-500">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Processing with RAG pipeline
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" id="features-header" style={{
            opacity: isVisible['features-header'] ? 1 : 0,
            transform: isVisible['features-header'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">Powerful Capabilities</span>
            <h2 className="text-5xl font-extrabold mt-3 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Why This Bot Will Work
            </h2>
            <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">
              Built with cutting-edge AI technology and optimized for performance, reliability, and scalability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll"
                id={`feature-${index}`}
                style={{
                  opacity: isVisible[`feature-${index}`] ? 1 : 0,
                  transform: isVisible[`feature-${index}`] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                }}
              >
                <div className="group relative bg-white rounded-2xl p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 h-full cursor-pointer hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-br from-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16 animate-on-scroll" id="how-header" style={{
            opacity: isVisible['how-header'] ? 1 : 0,
            transform: isVisible['how-header'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">The Process</span>
            <h2 className="text-5xl font-extrabold mt-3 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 mt-4 max-w-2xl mx-auto">
              A sophisticated RAG pipeline that transforms your documents into intelligent answers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="animate-on-scroll"
                id={`how-${index}`}
                style={{
                  opacity: isVisible[`how-${index}`] ? 1 : 0,
                  transform: isVisible[`how-${index}`] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
                }}
              >
                <div className="relative h-full">
                  <div className="bg-white rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl h-full flex flex-col">
                    <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl`}>
                      {item.icon}
                    </div>
                    
                    <div className="text-sm font-bold text-blue-600 mb-2">STEP {item.step}</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed flex-grow">
                      {item.description}
                    </p>
                  </div>
                  
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ChevronRight className="w-8 h-8 text-blue-300" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commands Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" id="commands-header" style={{
            opacity: isVisible['commands-header'] ? 1 : 0,
            transform: isVisible['commands-header'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">Bot Commands</span>
            <h2 className="text-5xl font-extrabold mt-3 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Easy To Use
            </h2>
            <p className="text-xl text-slate-600 mt-4">
              Simple commands to harness the power of AI in your Discord server
            </p>
          </div>

          <div className="space-y-6">
            {commands.map((cmd, index) => (
              <div
                key={index}
                className="animate-on-scroll"
                id={`command-${index}`}
                style={{
                  opacity: isVisible[`command-${index}`] ? 1 : 0,
                  transform: isVisible[`command-${index}`] ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                }}
              >
                <div className="bg-white rounded-2xl p-8 border border-blue-100 hover:border-blue-300 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                  <div className="flex items-start justify-between gap-8">
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-4">
                        <code className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-mono text-lg font-semibold">
                          {cmd.command}
                        </code>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                          {cmd.permission}
                        </span>
                      </div>
                      <p className="text-slate-700 mb-3 text-lg">{cmd.description}</p>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="text-xs text-slate-500 font-semibold mb-1">EXAMPLE</div>
                        <code className="text-slate-700 font-mono">{cmd.example}</code>
                      </div>
                    </div>
                    <ArrowRight className="w-6 h-6 text-blue-400 group-hover:translate-x-2 transition-transform flex-shrink-0 mt-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="py-24 px-6 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" id="tech-header" style={{
            opacity: isVisible['tech-header'] ? 1 : 0,
            transform: isVisible['tech-header'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">Technology</span>
            <h2 className="text-5xl font-extrabold mt-3 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              Built With Modern Tech
            </h2>
            <p className="text-xl text-slate-600 mt-4">
              Leveraging the best tools and frameworks for optimal performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="animate-on-scroll"
                id={`tech-${index}`}
                style={{
                  opacity: isVisible[`tech-${index}`] ? 1 : 0,
                  transform: isVisible[`tech-${index}`] ? 'scale(1)' : 'scale(0.9)',
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                }}
              >
                <div className="group bg-white rounded-2xl p-8 border border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-5 group-hover:scale-110 transition-transform shadow-lg">
                    {tech.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{tech.name}</h3>
                  <p className="text-slate-600">{tech.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FastAPI Integration Section */}
      <section id="api" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 animate-on-scroll" id="api-header" style={{
            opacity: isVisible['api-header'] ? 1 : 0,
            transform: isVisible['api-header'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">Integration</span>
            <h2 className="text-5xl font-extrabold mt-3 bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent">
              FastAPI Integration
            </h2>
            <p className="text-xl text-slate-600 mt-4">
              RESTful API for programmatic access to the bot's intelligence
            </p>
          </div>

          <div className="animate-on-scroll" id="api-content" style={{
            opacity: isVisible['api-content'] ? 1 : 0,
            transform: isVisible['api-content'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
          }}>
            <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-8 shadow-2xl border border-blue-500/20">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-bold text-lg">API Endpoint</span>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-green-500 text-white rounded-lg font-mono text-sm font-bold">GET</span>
                    <code className="text-cyan-300 font-mono text-lg">/query</code>
                  </div>
                  <p className="text-slate-300 mb-4">Query the knowledge base for a specific server</p>
                </div>

                <div className="bg-slate-950 rounded-xl p-6 border border-blue-500/30 overflow-x-auto">
                  <div className="text-xs text-slate-400 font-semibold mb-3">REQUEST BODY</div>
                  <pre className="text-cyan-300 font-mono text-sm leading-relaxed">
{`{
  "question": "What features does this bot have?",
  "server": "123456789"
}`}
                  </pre>
                </div>

                <div className="bg-slate-950 rounded-xl p-6 border border-blue-500/30 overflow-x-auto">
                  <div className="text-xs text-slate-400 font-semibold mb-3">RESPONSE</div>
                  <pre className="text-green-300 font-mono text-sm leading-relaxed">
{`{
  "answer": "This bot features PDF processing, 
   web scraping, AI-powered Q&A, server-specific 
   storage, and FAISS vector search..."
}`}
                  </pre>
                </div>

                <div className="flex items-start gap-3 bg-blue-500/10 rounded-xl p-5 border border-blue-500/30">
                  <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-blue-300 font-bold mb-1">Secure & Isolated</div>
                    <p className="text-slate-400 text-sm">Each server maintains its own knowledge base, ensuring data privacy and isolation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-cyan-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="animate-on-scroll" id="cta" style={{
            opacity: isVisible['cta'] ? 1 : 0,
            transform: isVisible['cta'] ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}>
            <h2 className="text-5xl font-extrabold text-white mb-6">
              Ready to Transform Your Discord Server?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Start using the RAG Discord Bot today and give your community access to intelligent, context-aware AI assistance.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button className="group px-10 py-5 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-3">
                <Bot className="w-6 h-6" />
                Add to Discord
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="https://github.com/armanphaugat/q-aragbaseddicordbotproject#readme" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                Documentation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Bot className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">RAG Discord Bot</span>
            </div>
            <div className="flex items-center gap-8">
              <a href="https://github.com/armanphaugat/q-aragbaseddicordbotproject" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">GitHub</a>
              <a href="https://github.com/armanphaugat/q-aragbaseddicordbotproject#readme" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">Documentation</a>
              <a href="https://github.com/armanphaugat/q-aragbaseddicordbotproject/issues" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
            <p>Built with ❤️ using LangChain, Discord.py, and FastAPI</p>
            <p className="mt-2">Open source under MIT License</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
}