import { ArrowRight, Sparkles, Layers, Zap } from 'lucide-react';
import { useRouter } from 'next/router';

export default function Landing() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-pink-900/20 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-12 py-6 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg" />
            <span className="text-xl font-light tracking-tight">Artifex</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">How it Works</a>
            <button
              onClick={() => router.push('/app')}
              className="px-6 py-2 bg-white text-black text-sm font-medium rounded-full hover:bg-gray-100 transition-all"
            >
              Try Demo
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-12 pt-32 pb-24 max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <Sparkles size={14} className="text-blue-400" />
            <span className="text-sm text-gray-300">Pure Layout Generation</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-light tracking-tight leading-[0.9]">
            Natural Language<br />
            to <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Perfect Layouts</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Describe your UI in plain English. Get production-ready React components 
            with deterministic, state-free layouts. No surprises. No magic.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => router.push('/app')}
              className="group px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              Start Generating
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

        {/* Visual Demo */}
        <section className="px-12 pb-24 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="text-sm text-gray-500 font-mono">INPUT</div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-6 min-h-[200px]">
                  <p className="text-gray-300 font-mono text-sm">
                    "Create a login form with email and password fields"
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-sm text-gray-500 font-mono">OUTPUT</div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-6 min-h-[200px]">
                  <pre className="text-gray-300 font-mono text-xs leading-relaxed">
{`<Card title="Login">
  <Input label="Email" type="email" />
  <Input label="Password" type="password" />
  <Button>Login</Button>
</Card>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}