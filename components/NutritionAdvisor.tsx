
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
// Added Heart to the import list from lucide-react to fix the "Cannot find name 'Heart'" error
import { Sparkles, Loader2, Apple, Utensils, Zap, Send, Leaf, Info, Heart } from 'lucide-react';

const NutritionAdvisor: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const askGemini = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResult(null);

    try {
      // Corrected initialization to use named parameter and direct process.env.API_KEY access
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ parts: [{ text: `You are a nutrition expert. Provide a detailed nutritional analysis and fun facts for: ${query}. Respond ONLY in JSON format following the requested schema.` }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              description: { type: Type.STRING },
              caloriesPer100g: { type: Type.NUMBER },
              macronutrients: {
                type: Type.OBJECT,
                properties: {
                  protein: { type: Type.STRING },
                  carbs: { type: Type.STRING },
                  fat: { type: Type.STRING }
                }
              },
              benefits: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              funFact: { type: Type.STRING }
            },
            required: ["name", "description", "caloriesPer100g", "macronutrients", "benefits", "funFact"]
          }
        }
      });

      if (response.text) {
        const data = JSON.parse(response.text.trim());
        setResult(data);
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI Service is temporarily unavailable. Please check your network or API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-16">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-emerald-500 rounded-3xl text-white shadow-2xl shadow-emerald-500/30">
            <Sparkles size={40} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">AI Nutrition <span className="text-emerald-500">Expert</span></h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Powered by Google Gemini Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-emerald-50 rounded-2xl text-emerald-600 font-bold text-sm border border-emerald-100 shadow-sm">
          <Info size={18} />
          <span>Real-time analysis active</span>
        </div>
      </div>

      <div className="relative mb-20 group">
        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-[50px] blur-2xl opacity-10 group-focus-within:opacity-20 transition duration-1000"></div>
        <input 
          type="text" 
          placeholder="Ex: 'Benefits of wild salmon' or 'Nutritional value of matcha tea'..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && askGemini()}
          className="relative w-full p-10 pr-40 bg-white border border-slate-100 rounded-[40px] shadow-2xl shadow-slate-200/50 focus:outline-none focus:ring-4 ring-emerald-500/10 transition-all text-2xl font-medium placeholder:text-slate-300"
        />
        <button 
          onClick={askGemini}
          disabled={isLoading}
          className="absolute right-5 top-5 bottom-5 px-10 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 text-white rounded-[30px] transition-all flex items-center gap-3 shadow-xl active:scale-95"
        >
          {isLoading ? <Loader2 className="animate-spin" size={28} /> : <Send size={28} />}
          <span className="font-bold text-lg hidden sm:inline">Ask AI</span>
        </button>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="relative">
            <div className="w-24 h-24 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute top-0 left-0 w-24 h-24 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <Leaf className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={32} />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-slate-700">Analyzing molecular data...</p>
            <p className="text-slate-400 font-medium text-sm">Gemini is curating nutritional insights for you.</p>
          </div>
        </div>
      )}

      {result && (
        <div className="grid lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 ease-out">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-12 rounded-[50px] shadow-2xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                 <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full font-black text-[10px] uppercase tracking-widest border border-emerald-100">
                   Analysis Complete
                 </div>
              </div>
              <h3 className="text-5xl font-black mb-6 text-slate-900 leading-tight">{result.name}</h3>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">{result.description}</p>
              
              <div className="grid grid-cols-3 gap-8">
                {[
                  { icon: Utensils, label: "Protein", val: result.macronutrients.protein, col: "text-blue-500", bg: "bg-blue-50" },
                  { icon: Zap, label: "Carbs", val: result.macronutrients.carbs, col: "text-amber-500", bg: "bg-amber-50" },
                  { icon: Apple, label: "Fat", val: result.macronutrients.fat, col: "text-rose-500", bg: "bg-rose-50" }
                ].map((m, idx) => (
                  <div key={idx} className={`p-8 rounded-[35px] ${m.bg} ${m.col} border border-white/50 shadow-sm transition-transform hover:scale-105`}>
                    <div className="mb-4 bg-white/50 w-12 h-12 rounded-2xl flex items-center justify-center"><m.icon size={22} /></div>
                    <div className="text-xs font-black opacity-60 uppercase mb-1 tracking-widest">{m.label}</div>
                    <div className="text-2xl font-black">{m.val}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-12 rounded-[50px] shadow-2xl shadow-slate-200/50 border border-slate-50">
              <h4 className="text-2xl font-black mb-10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl">
                  {/* Fixed missing import for Heart component */}
                  <Heart size={24} fill="white" />
                </div>
                Key Health Benefits
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                {result.benefits.map((benefit: string, i: number) => (
                  <div key={i} className="flex items-center gap-5 p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-all hover:bg-emerald-50 hover:border-emerald-100 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-md group-hover:scale-110 transition-transform">
                      <span className="font-black text-sm">{i + 1}</span>
                    </div>
                    <p className="text-slate-600 font-bold leading-snug">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-10">
            <div className="bg-slate-900 p-12 rounded-[50px] text-white shadow-3xl shadow-emerald-500/10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full group-hover:bg-emerald-500/30 transition-all duration-1000"></div>
              <div className="relative z-10 text-center">
                <div className="text-xs font-black opacity-40 uppercase mb-3 tracking-[0.3em]">Caloric Density</div>
                <div className="text-8xl font-black mb-2 text-emerald-400">{result.caloriesPer100g}</div>
                <div className="text-sm font-bold opacity-60 uppercase tracking-widest">kcal / 100g</div>
                <div className="mt-10 pt-10 border-t border-white/10 space-y-4">
                  <div className="flex justify-between items-center text-xs font-black opacity-40 uppercase tracking-widest">
                    <span>Low</span>
                    <span>Average</span>
                    <span>High</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" style={{ width: `${Math.min(100, (result.caloriesPer100g / 500) * 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 p-10 rounded-[50px] border border-amber-100 relative overflow-hidden group">
              <Sparkles className="absolute -bottom-4 -right-4 text-amber-200 w-32 h-32 rotate-12 group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10">
                <h4 className="font-black text-amber-800 flex items-center gap-3 mb-6 uppercase tracking-widest text-xs">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-amber-600 shadow-sm"><Sparkles size={16} /></div>
                  Pro Insight
                </h4>
                <p className="text-amber-900/80 text-lg leading-relaxed font-bold italic">"{result.funFact}"</p>
              </div>
            </div>

            <div className="p-10 bg-emerald-500 rounded-[50px] text-white space-y-6">
              <h4 className="text-xl font-bold leading-tight">Want a custom meal plan?</h4>
              <p className="opacity-80 font-medium">Get a 7-day plan tailored to your health goal based on this analysis.</p>
              <button className="w-full py-4 bg-white text-emerald-600 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                Generate Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionAdvisor;
