import React, { useState, useRef, useEffect } from 'react';
import { Send, Code, Eye, RotateCcw, Download, ChevronLeft, ChevronRight, Sparkles, MonitorPlay, Code2 } from 'lucide-react';

// --- Custom Snow Effect Component ---
const Snow = () => {
  const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 3 + 2}s`,
    animationDelay: `${Math.random() * 2}s`,
    opacity: Math.random() * 0.4 + 0.1,
    size: `${Math.random() * 4 + 2}px`
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10vh) translateX(0); }
          100% { transform: translateY(110vh) translateX(20px); }
        }
        .animate-snow {
          animation: snowfall linear infinite;
        }
      `}</style>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full animate-snow"
          style={{
            left: flake.left,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default function AppInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentCode, setCurrentCode] = useState('');
  const [codeHistory, setCodeHistory] = useState([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [showPreview, setShowPreview] = useState(true);
  const [previewError, setPreviewError] = useState(null);
  const [isMockMode, setIsMockMode] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isGenerating) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userIntent: userMessage,
          existingCode: currentCode || null,
        }),
      });

      const result = await response.json();

      if (!result.success) throw new Error(result.error || 'Generation failed');

      if (result.isMockMode !== undefined) {
        setIsMockMode(result.isMockMode);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result.explanation,
          code: result.code,
          plan: result.plan,
        },
      ]);

      setCurrentCode(result.code);
      const newHistory = [...codeHistory.slice(0, currentHistoryIndex + 1), result.code];
      setCodeHistory(newHistory);
      setCurrentHistoryIndex(newHistory.length - 1);
      setPreviewError(null);
      
      // Auto-switch to preview when new code is ready
      setShowPreview(true);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `Error: ${error.message}`, isError: true },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
      if (lastUserMessage) setInputValue(lastUserMessage.content);
    }
  };

  const navigateHistory = (direction) => {
    const newIndex = currentHistoryIndex + direction;
    if (newIndex >= 0 && newIndex < codeHistory.length) {
      setCurrentHistoryIndex(newIndex);
      setCurrentCode(codeHistory[newIndex]);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([currentCode], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedUI.jsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen flex bg-[#050505] text-white relative font-body overflow-hidden">
      {/* Background Snow Effect */}
      <Snow />

      {/* LEFT PANEL: Chat & Controls */}
      <div className="w-[380px] flex flex-col border-r border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md z-10 shadow-2xl">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Sparkles size={16} className="text-white" />
          </div>
          <h1 className="text-xl font-medium tracking-tight font-display">Artifex</h1>
          {isMockMode && (
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full ml-auto">
              Demo
            </span>
          )}
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-400 opacity-60">
              <Sparkles size={32} />
              <p className="text-sm">Describe the UI you want to build.<br/>Be specific about components.</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 rounded-tr-none' 
                    : msg.isError
                    ? 'bg-red-500/10 border border-red-500/20 text-red-400 rounded-tl-none'
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
                {msg.plan && (
                  <details className="mt-2 text-[11px] text-gray-500 max-w-[85%]">
                    <summary className="cursor-pointer hover:text-gray-300 transition-colors">View AI Plan</summary>
                    <div className="mt-2 p-3 bg-black/50 border border-white/5 rounded-lg overflow-x-auto font-mono">
                      {JSON.stringify(msg.plan, null, 2)}
                    </div>
                  </details>
                )}
              </div>
            ))
          )}
          {isGenerating && (
            <div className="flex items-center gap-3 text-sm text-gray-400 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none w-fit">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              Generating...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-5 bg-[#0a0a0a]/90 border-t border-white/10 backdrop-blur-md">
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="E.g., A pricing card with 3 tiers..."
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all resize-none shadow-inner"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isGenerating}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isGenerating}
              className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20"
            >
              <Send size={16} />
            </button>
          </div>
          {currentCode && (
            <button
              onClick={handleRegenerate}
              className="mt-3 flex items-center justify-center gap-2 w-full py-2 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-all"
            >
              <RotateCcw size={14} /> Regenerate Last Prompt
            </button>
          )}
        </div>
      </div>

      {/* RIGHT PANEL: Workspace Area */}
      <div className="flex-1 flex flex-col z-10 relative">
        {/* Toggle & Action Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-md">
          
          {/* View Toggles */}
          <div className="flex p-1 bg-black/50 rounded-lg border border-white/10 shadow-inner">
            <button
              onClick={() => setShowPreview(true)}
              className={`flex items-center gap-2 px-5 py-1.5 text-sm font-medium rounded-md transition-all ${
                showPreview ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <MonitorPlay size={16} /> Preview
            </button>
            <button
              onClick={() => setShowPreview(false)}
              className={`flex items-center gap-2 px-5 py-1.5 text-sm font-medium rounded-md transition-all ${
                !showPreview ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <Code2 size={16} /> Code
            </button>
          </div>

          {/* History & Download Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-black/50 border border-white/10 rounded-lg">
              <button
                onClick={() => navigateHistory(-1)}
                disabled={currentHistoryIndex <= 0}
                className="text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-mono text-gray-400 w-12 text-center">
                {codeHistory.length > 0 ? `${currentHistoryIndex + 1} / ${codeHistory.length}` : '0 / 0'}
              </span>
              <button
                onClick={() => navigateHistory(1)}
                disabled={currentHistoryIndex >= codeHistory.length - 1}
                className="text-gray-500 hover:text-white disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
            
            <button
              onClick={downloadCode}
              disabled={!currentCode}
              className="flex items-center gap-2 px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg disabled:opacity-30 transition-colors border border-white/5"
            >
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Dynamic Content Area (Code vs Preview) */}
        <div className="flex-1 p-6 overflow-hidden">
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 flex flex-col bg-[#0f0f0f]">
            {showPreview ? (
              <div className="flex-1 relative bg-gray-50">
                 {/* Notice the bg-gray-50 here - it keeps your generated components visible! */}
                {previewError ? (
                  <div className="p-6 bg-red-50/10 h-full text-red-400 font-mono text-sm overflow-auto">
                    {previewError}
                  </div>
                ) : currentCode ? (
                  <PreviewFrame code={currentCode} />
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400 bg-[#0a0a0a]">
                    <MonitorPlay size={48} className="opacity-20 mb-4" />
                  </div>
                )}
              </div>
            ) : (
              <textarea
                value={currentCode}
                onChange={(e) => {
                  setCurrentCode(e.target.value);
                  setPreviewError(null);
                }}
                className="flex-1 w-full p-6 bg-[#0f0f0f] text-gray-300 font-mono text-sm resize-none focus:outline-none leading-relaxed"
                placeholder="// Generated code will appear here..."
                spellCheck={false}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// PREVIEW FRAME COMPONENT
// ----------------------------------------------------------------------
function PreviewFrame({ code }) {
  const iframeRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleReady = (event) => {
      if (event.data?.type === 'PREVIEW_READY') setIsReady(true);
    };
    window.addEventListener('message', handleReady);
    return () => window.removeEventListener('message', handleReady);
  }, []);

  useEffect(() => {
    if (isReady && code && iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'UPDATE_CODE', code },
        window.location.origin
      );
    }
  }, [isReady, code]);

  return (
    <iframe
      ref={iframeRef}
      src="/preview"
      className="w-full h-full border-0 bg-transparent"
      title="UI Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}