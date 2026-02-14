import { ArrowRight, Sparkles, Layers, Zap, Code2, Cpu, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Landing() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/5 to-pink-900/10 pointer-events-none" />
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 md:px-12 py-6 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-medium tracking-tight">Artifex</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it Works</a>
            
            <button
              onClick={() => router.push('/app')}
              className="px-6 py-2 bg-black text-white border border-white/20 text-sm font-semibold rounded-full hover:bg-white/10 transition-all shadow-lg"
            >
              Launch App
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-6 pt-32 pb-24 max-w-5xl mx-auto text-center space-y-8">
          

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Design Systems,<br />
            <span className="font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Generated Instantly.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Stop wrestling with CSS. Describe your interface in plain English and watch as Artifex generates clean, deterministic React components in seconds. 
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button
              onClick={() => router.push('/app')}
              className="group px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-100 transition-all flex items-center gap-2 shadow-xl shadow-white/10 w-full sm:w-auto justify-center"
            >
              Start Generating
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all w-full sm:w-auto text-center"
            >
              See how it works
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="px-6 py-24 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-4">Why choose Artifex?</h2>
            <p className="text-gray-400 text-lg">Built to solve the unpredictability of AI code generation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
                <Layers className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Deterministic Layouts</h3>
              <p className="text-gray-400 leading-relaxed">
                Unlike other AI tools that hallucinate random libraries, Artifex is strictly bound to a predefined React component library. You get guaranteed, consistent results every time.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6">
                <Code2 className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pure Presentational</h3>
              <p className="text-gray-400 leading-relaxed">
                We generate stateless UI. No messy event handlers, no hidden state hooks. Just clean, modular JSX that is ready for you to drop directly into your backend architecture.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/[0.07] transition-colors">
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="text-pink-400" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-Agent Pipeline</h3>
              <p className="text-gray-400 leading-relaxed">
                Your prompt passes through a Planner, a Generator, and a Validator. This ensures the output actually matches your intent before it ever reaches your screen.
              </p>
            </div>
          </div>
        </section>

        {/* NEW: How It Works Section */}
        <section id="how-it-works" className="px-6 py-24 max-w-7xl mx-auto border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-4">How Artifex Works</h2>
            <p className="text-gray-400 text-lg">A transparent, step-by-step AI pipeline ensuring production-ready code.</p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { 
                num: '01', 
                title: 'The Planner Agent', 
                desc: 'First, Gemini analyzes your natural language prompt and constructs a strict JSON layout plan. It decides exactly which predefined components to use and how to arrange them.' 
              },
              { 
                num: '02', 
                title: 'The Generator Agent', 
                desc: 'Next, the Generator takes the JSON plan and writes clean, deterministic React JSX code. It is strictly forbidden from writing state or business logic.' 
              },
              { 
                num: '03', 
                title: 'The Explainer & Validator', 
                desc: 'A final agent reviews the generated code to ensure no illegal imports or inline styles slipped through, and provides a plain-English explanation of its layout choices.' 
              },
              { 
                num: '04', 
                title: 'Live Transpilation', 
                desc: 'Your browser uses Babel Standalone to safely transpile the raw JSX into JavaScript on-the-fly, rendering a live, interactive preview inside a secure iframe.' 
              },
            ].map((step) => (
              <div key={step.num} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 hover:bg-white/[0.07] transition-colors">
                <span className="text-5xl md:text-6xl font-light text-white/10">{step.num}</span>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 px-8 py-8 mt-12 bg-black/20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-500 gap-4">
            <p>© {new Date().getFullYear()} Artifex UI. Built for Ryze AI.</p>
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              <span>Safe, sandboxed live previews via Babel.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}