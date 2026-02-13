import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Code2, MonitorPlay, Loader2 } from 'lucide-react';

export default function AppInterface() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentCode, setCurrentCode] = useState('');
  // Toggle state: 'preview' or 'code'
  const [activeView, setActiveView] = useState('preview');

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    const userMessage = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt('');
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userIntent: userMessage.content, existingCode: currentCode || null }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Failed to generate UI');

      setCurrentCode(data.code);
      
      const aiMessage = { 
        role: 'assistant', 
        content: data.explanation || 'UI generated successfully.',
        plan: data.plan 
      };
      setMessages((prev) => [...prev, aiMessage]);
      
      // Automatically switch to preview when new code arrives
      setActiveView('preview');
    } catch (error) {
      console.error('Generation Error:', error);
      setMessages((prev) => [...prev, { role: 'error', content: error.message }]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* LEFT PANEL: Chat & Controls */}
      <div className="w-1/3 flex flex-col border-r border-gray-200 bg-white shadow-sm z-10">
        <div className="p-4 border-b border-gray-100 flex items-center gap-2 bg-white">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
            <Sparkles size={16} className="text-white" />
          </div>
          <h1 className="font-semibold text-gray-800 tracking-tight">Artifex UI Generator</h1>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 space-y-3">
              <Sparkles size={32} className="opacity-50" />
              <p className="text-sm">Describe the UI you want to build.<br/>Be specific about components and layout.</p>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white shadow-md rounded-tr-none' 
                    : msg.role === 'error'
                    ? 'bg-red-50 border border-red-100 text-red-800 rounded-tl-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
                {/* Show AI thought process if available */}
                {msg.plan && (
                  <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100 max-w-[85%]">
                    <strong>Layout Plan:</strong> {msg.plan.layoutStructure}
                  </div>
                )}
              </div>
            ))
          )}
          {isGenerating && (
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-3 rounded-2xl rounded-tl-none w-fit">
              <Loader2 size={16} className="animate-spin" />
              <span>AI is thinking & generating...</span>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">
          <form onSubmit={handleGenerate} className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., A pricing card with 3 tiers..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all resize-none"
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT PANEL: Code / Preview Area */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Toggle Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
          <div className="flex bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveView('preview')}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeView === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MonitorPlay size={16} /> Preview
            </button>
            <button
              onClick={() => setActiveView('code')}
              className={`flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeView === 'code' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Code2 size={16} /> Code
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-hidden relative">
          <div className="absolute inset-6 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            {activeView === 'code' ? (
              <div className="flex-1 overflow-auto bg-[#0d1117] p-6">
                <pre className="text-sm font-mono text-gray-300">
                  <code>{currentCode || '// Awaiting AI generation...'}</code>
                </pre>
              </div>
            ) : (
              <div className="flex-1 relative bg-white">
                <PreviewFrame code={currentCode} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// PREVIEW FRAME COMPONENT (With Handshake Logic from Commit 4)
// ----------------------------------------------------------------------
function PreviewFrame({ code }) {
  const iframeRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Listen for the "READY" signal from the iframe
  useEffect(() => {
    const handleReady = (event) => {
      if (event.data?.type === 'PREVIEW_READY') {
        setIsReady(true);
      }
    };
    window.addEventListener('message', handleReady);
    return () => window.removeEventListener('message', handleReady);
  }, []);

  // Send code once the iframe is ready AND code is available
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
      className="w-full h-full border-0"
      title="UI Preview"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}