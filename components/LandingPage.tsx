
import React, { useState, useEffect } from 'react';
import { Section } from '../types';
import { ArrowRight, Sparkles, Scale, Leaf, Heart, Zap, CheckCircle, Users, Activity, Play, Star, ExternalLink, X, ShieldCheck } from 'lucide-react';

interface Props {
  onNavigate: (section: Section) => void;
}

const LandingPage: React.FC<Props> = ({ onNavigate }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);

  const slides = [
    {
      title: "Fuel Your Potential",
      subtitle: "Experience AI-driven meal analysis that adapts to your unique metabolism.",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1600&q=80",
      tag: "Nutrition First",
      icon: <Leaf className="text-emerald-400" size={20} />,
      btnText: "Consult AI Expert",
      action: () => onNavigate('nutrition')
    },
    {
      title: "Strength in Movement",
      subtitle: "Optimize your routines with expert-curated exercises for every fitness level.",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
      tag: "Daily Vitality",
      icon: <Zap className="text-amber-400" size={20} />,
      btnText: "Explore Workouts",
      action: () => onNavigate('explore')
    },
    {
      title: "Wellness Decoded",
      subtitle: "Detailed health metrics tracking to visualize your journey towards longevity.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80",
      tag: "Smart Tracking",
      icon: <Activity className="text-sky-400" size={20} />,
      btnText: "Measure BMI",
      action: () => onNavigate('tools')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white">
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <button onClick={() => setShowVideo(false)} className="absolute top-10 right-10 text-white hover:text-emerald-400 transition-colors z-50">
            <X size={40} />
          </button>
          <div className="w-full max-w-5xl aspect-video bg-slate-900 rounded-[40px] overflow-hidden shadow-2xl relative">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Success Story"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Slider Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          {slides.map((slide, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                idx === activeSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.title}
                className={`w-full h-full object-cover transition-transform duration-[8000ms] ease-linear ${
                  idx === activeSlide ? 'scale-110' : 'scale-100'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-6xl mx-auto">
          {slides.map((slide, idx) => (
            <div 
              key={idx}
              className={`absolute flex flex-col items-center transition-all duration-1000 ${
                idx === activeSlide ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
              }`}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/10 backdrop-blur-2xl rounded-full border border-white/20 text-white font-bold text-xs tracking-widest uppercase mb-10">
                {slide.icon}
                {slide.tag}
              </div>
              <h1 className="text-6xl md:text-[92px] font-black text-white mb-10 leading-[0.95] tracking-tighter">
                {slide.title.split(' ')[0]} <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">{slide.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-14 max-w-3xl leading-relaxed font-medium">
                {slide.subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={slide.action}
                  className="group px-12 py-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[24px] font-black text-xl transition-all flex items-center gap-3 shadow-2xl shadow-emerald-500/40 hover:-translate-y-1 cursor-pointer"
                >
                  {slide.btnText}
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setShowVideo(true)}
                  className="group px-12 py-6 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-[24px] font-black text-xl transition-all hover:bg-white/20 flex items-center gap-3 cursor-pointer"
                >
                  <Play size={22} fill="currentColor" />
                  Success Stories
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Path Section */}
      <section className="py-40 container mx-auto px-8 relative">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <h2 className="text-sm font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">The Interactive Path</h2>
            <h3 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
              One platform. <br/><span className="text-slate-400 font-light italic">Infinite wellness.</span>
            </h3>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              We've designed NutriEats Hub to be your 24/7 digital health companion.
            </p>
            <div className="grid sm:grid-cols-2 gap-8 pt-6">
              {[
                { t: "Predictive Analytics", d: "Forecast health trends based on current habits." },
                { t: "Molecular Insight", d: "Deep-dive data on exactly what's in your food." },
                { t: "Adaptive Coaching", d: "Workouts that change as you get stronger." },
                { t: "Global Benchmarks", d: "Compare progress to world averages." }
              ].map((item, i) => (
                <div key={i} className="space-y-2 group cursor-default">
                  <div className="font-black text-emerald-600 flex items-center gap-2 group-hover:gap-3 transition-all">
                    <CheckCircle size={18} strokeWidth={3} />
                    {item.t}
                  </div>
                  <p className="text-sm text-slate-400 font-medium">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-tr from-emerald-100/30 via-sky-100/30 to-teal-100/30 blur-[100px] -z-10 rounded-full"></div>
            <div className="grid grid-cols-2 gap-6 p-4">
              <div className="space-y-6 pt-12">
                <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] hover:scale-[1.03] transition-all cursor-pointer group" onClick={() => onNavigate('nutrition')} role="button">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Sparkles /></div>
                  <h4 className="font-black text-lg">AI Consultant</h4>
                  <p className="text-xs text-slate-400 mt-2 font-bold group-hover:text-emerald-500 transition-colors">Launch Tool →</p>
                </div>
                <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-slate-50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(56,189,248,0.1)] hover:scale-[1.03] transition-all cursor-pointer group" onClick={() => onNavigate('tools')} role="button">
                  <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Activity /></div>
                  <h4 className="font-black text-lg">Metric Hub</h4>
                  <p className="text-xs text-slate-400 mt-2 font-bold group-hover:text-sky-500 transition-colors">Open Dashboard →</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-slate-900 p-10 rounded-[40px] shadow-3xl text-white hover:-translate-y-2 hover:scale-[1.03] transition-all cursor-default">
                  <h4 className="text-4xl font-black mb-2">94%</h4>
                  <p className="text-xs opacity-60 font-black uppercase tracking-widest">Satisfaction</p>
                </div>
                <div className="bg-emerald-500 p-8 rounded-[40px] shadow-2xl text-white hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,185,129,0.3)] hover:scale-[1.03] transition-all cursor-pointer group" onClick={() => onNavigate('signup')} role="button">
                  <h4 className="font-black text-lg">Start Free</h4>
                  <p className="text-xs opacity-80 mt-2 font-bold group-hover:translate-x-1 transition-transform">Join Now →</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-40 bg-slate-50/50 relative overflow-hidden">
        <div className="container mx-auto px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-sm font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">Real Results</h2>
              <h3 className="text-5xl font-black text-slate-900">Health is the <br/><span className="text-slate-400 font-light">ultimate luxury.</span></h3>
            </div>
            <button onClick={() => setShowVideo(true)} className="group px-10 py-5 border-2 border-slate-200 rounded-full font-black text-slate-600 hover:border-emerald-500 hover:text-emerald-500 transition-all flex items-center gap-3 cursor-pointer">
              <Play size={20} fill="currentColor" />
              Watch Success Stories
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                name: "Sarah Jenkins", 
                tag: "Metabolic Fix", 
                text: "The AI Coach taught me why I was always tired. Changed my life.", 
                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
              },
              { 
                name: "David Chen", 
                tag: "Performance", 
                text: "Data-driven health is the only way to go for high performers.", 
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
              },
              { 
                name: "Amara Okoro", 
                tag: "Mindful Living", 
                text: "I finally understand my body's language. Highly recommended!", 
                img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80"
              }
            ].map((story, i) => (
              <div key={i} className="p-10 bg-white border border-slate-100 rounded-[45px] space-y-6 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center gap-4">
                  <img src={story.img} className="w-14 h-14 rounded-2xl object-cover shadow-lg" alt={story.name} />
                  <div>
                    <h5 className="font-black text-lg text-slate-800">{story.name}</h5>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-full">{story.tag}</span>
                  </div>
                </div>
                <p className="text-slate-500 font-medium italic leading-relaxed text-lg">"{story.text}"</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-emerald-400 text-emerald-400" />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-40 container mx-auto px-8 relative">
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 p-16 md:p-32 rounded-[80px] text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter">Your evolution starts <br/>with <span className="underline decoration-white/30 underline-offset-8">an account.</span></h2>
            <p className="text-2xl font-medium opacity-90 leading-relaxed">
              Unlock personalized AI insights and professional tracking.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <button 
                onClick={() => onNavigate('signup')}
                className="flex-1 px-12 py-7 bg-white text-emerald-600 font-black text-2xl rounded-[30px] shadow-2xl transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Join Free Today
              </button>
            </div>
            <p className="text-sm font-black opacity-40 uppercase tracking-[0.4em]">Become part of the NutriEats community</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
