
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Loader2, Apple, Utensils, Zap, Send, Leaf, Heart, Activity, Stethoscope, CheckCircle, Lightbulb, MessageCircle, ChefHat, ClipboardList, Flame, Clock, Users, Soup, Lock, AlertCircle, Info, Bookmark, BookOpen } from 'lucide-react';

interface Props {
  usageCount: number;
  onQuery: () => void;
  isLoggedIn: boolean;
  onLoginRequest: () => void;
}

const HealthAI: React.FC<Props> = ({ usageCount, onQuery, isLoggedIn, onLoginRequest }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const isLocked = !isLoggedIn && usageCount >= 3;

  const askGemini = async () => {
    if (!query.trim() || isLocked) return;
    setIsLoading(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ 
          parts: [{ 
            text: `You are NutriBot, an elite, world-class Holistic Health Consultant and Master Chef.
            Your responses must be encyclopedic, scientific, yet deeply conversational and encouraging. Provide maximum detail.
            
            Capabilities:
            1. Advanced Nutrition: Provide molecular context (e.g., mention specific vitamins like B12 or minerals like Magnesium).
            2. Gourmet Recipes: Provide chef-grade advice. If user gives ingredients, be creative.
            3. Disease Management: Explain the biological mechanisms (e.g., how fiber affects glucose spikes).
            
            When providing a recipe:
            - Provide 6-10 detailed steps.
            - Include "Chef's Notes" for texture or flavor improvement.
            
            Query: "${query}"
            
            Respond strictly in JSON according to the schema.` 
          }] 
        }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              topic: { type: Type.STRING },
              category: { type: Type.STRING },
              isRecipe: { type: Type.BOOLEAN },
              recipeDetails: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  prepTime: { type: Type.STRING },
                  servings: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                  instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
                  chefNote: { type: Type.STRING }
                }
              },
              greeting: { type: Type.STRING },
              detailedAnalysis: { type: Type.STRING, description: "Deep encyclopedic paragraph" },
              stats: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.STRING }
                  }
                }
              },
              scientificEvidence: { type: Type.STRING, description: "A sentence about the science behind the topic" },
              actionSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
              coachClosing: { type: Type.STRING }
            },
            required: ["topic", "category", "isRecipe", "greeting", "detailedAnalysis", "stats", "scientificEvidence", "actionSteps", "coachClosing"]
          }
        }
      });

      if (response.text) {
        setResult(JSON.parse(response.text.trim()));
        onQuery();
      }
    } catch (error) {
      console.error("AI Error:", error);
      alert("NutriBot encountered a synaptic error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch(cat.toLowerCase()) {
      case 'fitness': return <Activity className="w-5 h-5" />;
      case 'recipe': return <ChefHat className="w-5 h-5" />;
      case 'wellness': return <Heart className="w-5 h-5" />;
      case 'medical': return <Stethoscope className="w-5 h-5" />;
      default: return <Apple className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-20 relative z-10">
        <div className="flex items-center gap-8">
          <div className="p-6 bg-emerald-900 rounded-[40px] text-white shadow-3xl shadow-emerald-500/20">
            <Sparkles size={52} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-6xl font-black text-slate-900 tracking-tighter">NutriBot <span className="text-emerald-900 italic">Expert</span></h2>
            <p className="text-slate-400 font-black uppercase tracking-[0.4em] text-[11px] mt-2">Comprehensive Clinical Intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-5 px-10 py-5 bg-white rounded-full text-slate-400 font-black text-sm border border-slate-100 shadow-xl">
          {!isLoggedIn && (
            <div className="flex items-center gap-3">
              <span className="text-emerald-900 font-black">{3 - usageCount} analysis remaining</span>
              <div className="w-px h-4 bg-slate-100"></div>
            </div>
          )}
          <div className={`w-3 h-3 rounded-full ${isLocked ? 'bg-red-700 shadow-[0_0_10px_red]' : 'bg-emerald-900 animate-pulse'}`}></div>
          <span className={isLocked ? 'text-red-700' : 'text-emerald-900 font-black'}>{isLocked ? 'LOCKED' : 'ONLINE'}</span>
        </div>
      </div>

      <div className="relative mb-32 group z-20">
        {isLocked && (
          <div className="absolute inset-0 z-30 bg-white/80 backdrop-blur-2xl rounded-[60px] flex items-center justify-center border-4 border-dashed border-emerald-100 p-8 text-center animate-in fade-in duration-500">
            <div className="max-w-md space-y-8">
              <div className="w-24 h-24 bg-emerald-900 text-white rounded-[35px] flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <Lock size={44} />
              </div>
              <div>
                <h4 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Access Restricted</h4>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">To maintain clinical-grade processing, unlimited analysis is reserved for our registered community members.</p>
              </div>
              <button 
                onClick={onLoginRequest}
                className="w-full py-6 bg-emerald-900 text-white rounded-[30px] font-black text-xl shadow-3xl hover:bg-emerald-950 transition-all hover:scale-105 active:scale-95"
              >
                Join Now for Unlimited Access
              </button>
            </div>
          </div>
        )}
        
        <div className="absolute -inset-10 bg-gradient-to-r from-emerald-900 via-emerald-700 to-sky-700 rounded-[80px] blur-[100px] opacity-10 group-focus-within:opacity-20 transition duration-1000"></div>
        <input 
          disabled={isLocked}
          type="text" 
          placeholder="Ask NutriBot: 'Molecular breakdown of turmeric', 'Recipe for lean mass', or 'Explain glycogen storage'..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && askGemini()}
          className="relative w-full p-14 pr-52 bg-white border-2 border-slate-50 rounded-[60px] shadow-4xl shadow-slate-200/40 focus:outline-none focus:ring-[15px] ring-emerald-900/5 transition-all text-3xl font-black placeholder:text-slate-200 text-slate-800"
        />
        <button 
          onClick={askGemini}
          disabled={isLoading || isLocked}
          className="absolute right-8 top-8 bottom-8 px-16 bg-emerald-900 hover:bg-emerald-950 text-white rounded-[40px] transition-all flex items-center gap-5 shadow-2xl active:scale-95 disabled:bg-slate-200"
        >
          {isLoading ? <Loader2 className="animate-spin" size={40} /> : <Send size={40} />}
          <span className="font-black text-2xl hidden lg:inline">Ask AI Expert</span>
        </button>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-52 space-y-12 animate-in fade-in zoom-in duration-500 text-center">
          <div className="relative">
            <div className="w-40 h-40 border-[12px] border-slate-50 rounded-full"></div>
            <div className="absolute top-0 left-0 w-40 h-40 border-[12px] border-emerald-900 border-t-transparent rounded-full animate-spin"></div>
            <ChefHat className="absolute inset-0 m-auto text-emerald-900 animate-pulse" size={56} />
          </div>
          <div>
            <h4 className="text-3xl font-black text-slate-800 tracking-tight">Querying Neural Knowledge Core...</h4>
            <p className="text-slate-400 font-black uppercase tracking-[0.5em] text-xs mt-4">Analyzing medical & culinary data</p>
          </div>
        </div>
      )}

      {result && (
        <div className="grid lg:grid-cols-12 gap-16 animate-in fade-in slide-in-from-bottom-32 duration-1000 ease-out relative z-10">
          <div className="lg:col-span-8 space-y-16">
            <div className="bg-white p-14 md:p-20 rounded-[80px] shadow-4xl border border-slate-50 relative overflow-hidden">
              <div className="absolute top-10 right-10">
                 <div className="px-8 py-3 bg-emerald-50 text-emerald-900 rounded-full font-black text-xs uppercase tracking-[0.3em] border border-emerald-100 flex items-center gap-3">
                   {getCategoryIcon(result.category)} {result.category}
                 </div>
              </div>
              
              <div className="flex items-center gap-6 mb-16">
                <div className="w-16 h-16 bg-sky-50 rounded-[28px] flex items-center justify-center text-sky-800 shadow-xl shadow-sky-500/10">
                   {result.isRecipe ? <Soup size={32} /> : <Lightbulb size={32} />}
                </div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{result.isRecipe ? result.recipeDetails?.name : result.topic}</h3>
              </div>

              <div className="space-y-16">
                <div className="relative">
                  <p className="text-2xl text-slate-700 font-bold leading-relaxed italic bg-emerald-50/20 p-10 rounded-[45px] border-l-[10px] border-emerald-900 shadow-sm relative z-10">
                    "{result.greeting}"
                  </p>
                  <MessageCircle className="absolute -bottom-6 -left-6 text-emerald-100 w-24 h-24 -z-0" />
                </div>

                {result.isRecipe && result.recipeDetails && (
                  <div className="space-y-16">
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="bg-slate-50 p-12 rounded-[50px] border border-slate-100 shadow-inner">
                        <h4 className="text-2xl font-black text-slate-900 flex items-center gap-4 mb-10">
                          <ClipboardList className="text-emerald-900" /> Essential Ingredients
                        </h4>
                        <ul className="space-y-5">
                          {result.recipeDetails.ingredients?.map((ing: string, i: number) => (
                            <li key={i} className="flex items-start gap-5 text-slate-600 font-bold bg-white p-5 rounded-2xl shadow-sm border border-emerald-50 group hover:translate-x-2 transition-transform">
                              <CheckCircle className="w-6 h-6 text-emerald-900 mt-0.5 group-hover:scale-110" />
                              <span className="text-lg">{ing}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="space-y-8">
                        <div className="bg-white p-10 rounded-[50px] border border-emerald-50 space-y-8 shadow-2xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                          <div className="flex justify-between items-center text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                            <span className="flex items-center gap-3"><Clock size={20} className="text-sky-800"/> Effort Time</span>
                            <span className="text-slate-900">{result.recipeDetails.prepTime}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                            <span className="flex items-center gap-3"><Users size={20} className="text-emerald-900"/> Servings</span>
                            <span className="text-slate-900">{result.recipeDetails.servings}</span>
                          </div>
                          <div className="flex justify-between items-center text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                            <span className="flex items-center gap-3"><Activity size={20} className="text-amber-700"/> Complexity</span>
                            <span className="text-slate-900">{result.recipeDetails.difficulty || 'Intermediate'}</span>
                          </div>
                        </div>
                        
                        <div className="p-10 bg-emerald-900 rounded-[50px] text-white shadow-3xl flex flex-col items-center justify-center gap-4 group">
                           <Flame size={48} className="animate-pulse group-hover:scale-125 transition-transform" />
                           <div className="text-5xl font-black tracking-tighter">{result.stats.find((s:any) => s.label.toLowerCase().includes('cal'))?.value || 'Nutrient Dense'}</div>
                           <div className="text-[11px] font-black uppercase opacity-70 tracking-[0.4em]">Est. Metabolic Load</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-14 rounded-[50px] border border-slate-100 shadow-4xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-10 opacity-5"><ChefHat size={120}/></div>
                      <h4 className="text-3xl font-black text-slate-900 flex items-center gap-5 mb-12">
                        <Utensils className="text-sky-800" /> Culinary Execution
                      </h4>
                      <div className="space-y-12">
                        {result.recipeDetails.instructions?.map((step: string, i: number) => (
                          <div key={i} className="flex gap-10 items-start group">
                            <div className="flex-shrink-0 w-14 h-14 rounded-[24px] bg-emerald-50 text-emerald-900 flex items-center justify-center font-black text-2xl group-hover:bg-emerald-900 group-hover:text-white transition-all shadow-lg">
                              {i + 1}
                            </div>
                            <p className="text-2xl text-slate-600 font-medium leading-[1.8] pt-3">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="space-y-10">
                  <h4 className="text-2xl font-black text-slate-900 flex items-center gap-4">
                    <BookOpen className="text-emerald-900" /> Clinical Breakdown
                  </h4>
                  <div className="prose prose-slate prose-2xl max-w-none text-slate-700 font-medium leading-[1.9] bg-slate-50/50 p-12 rounded-[50px] border border-slate-100">
                    {result.detailedAnalysis}
                  </div>
                </div>

                <div className="p-8 bg-sky-50 rounded-[35px] border border-sky-100 flex items-center gap-6">
                   <div className="p-4 bg-white rounded-2xl shadow-md text-sky-800"><Stethoscope size={28}/></div>
                   <p className="text-sky-900 font-bold italic text-lg leading-relaxed">Clinical Intelligence: {result.scientificEvidence}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-14 md:p-20 rounded-[80px] shadow-4xl border border-slate-50">
              <h4 className="text-4xl font-black mb-16 flex items-center gap-6 text-slate-900">
                <div className="w-16 h-16 rounded-[28px] bg-emerald-900 flex items-center justify-center text-white shadow-3xl">
                  <CheckCircle size={32} strokeWidth={3} />
                </div>
                The Clinical Protocol
              </h4>
              <div className="grid md:grid-cols-2 gap-10">
                {result.actionSteps.map((step: string, i: number) => (
                  <div key={i} className="flex items-start gap-8 p-12 bg-slate-50 rounded-[55px] border border-slate-100 transition-all hover:bg-emerald-50 hover:border-emerald-100 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-3xl bg-white flex items-center justify-center text-emerald-900 shadow-xl group-hover:rotate-12 transition-transform font-black text-xl">
                      {i + 1}
                    </div>
                    <p className="text-slate-800 font-bold text-xl leading-relaxed pt-2">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-16">
            <div className="bg-slate-900 p-20 rounded-[80px] text-white shadow-4xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><Zap size={150}/></div>
              <div className="relative z-10 space-y-16 text-center">
                <p className="text-[11px] font-black opacity-40 uppercase tracking-[0.5em] mb-10">Biometric Focus</p>
                {result.stats.map((s: any, idx: number) => (
                  <div key={idx} className="space-y-4 hover:scale-110 transition-transform duration-500">
                    <div className="text-6xl font-black text-emerald-400 tracking-tighter">{s.value}</div>
                    <div className="text-xs font-black opacity-50 uppercase tracking-[0.4em]">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-amber-50 p-16 rounded-[70px] border border-amber-100 relative overflow-hidden group hover:shadow-3xl transition-all duration-700">
              <div className="absolute -bottom-10 -right-10 text-amber-100 w-40 h-40"><Sparkles size={160}/></div>
              <div className="relative z-10">
                <h4 className="font-black text-amber-800 flex items-center gap-5 mb-10 uppercase tracking-[0.4em] text-[11px]">
                  <div className="w-12 h-12 rounded-3xl bg-white flex items-center justify-center text-amber-900 shadow-lg"><Sparkles size={24} /></div>
                  Bot Synthesis
                </h4>
                <p className="text-amber-900 text-3xl leading-relaxed font-black italic">"{result.coachClosing}"</p>
              </div>
            </div>

            <div className="p-16 bg-emerald-900 rounded-[80px] text-white space-y-10 shadow-4xl hover:-translate-y-4 transition-transform relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="flex justify-center"><Bookmark size={64} className="animate-pulse" /></div>
              <div className="text-center space-y-4">
                <h4 className="text-3xl font-black tracking-tight">Preserve Analysis</h4>
                <p className="opacity-80 font-bold text-lg leading-relaxed px-4">Identify and store these sessions permanently in your private vault.</p>
              </div>
              <button 
                onClick={onLoginRequest}
                className="w-full py-8 bg-white text-emerald-900 font-black rounded-[40px] shadow-3xl transition-all hover:scale-[1.03] active:scale-95 cursor-pointer uppercase text-sm tracking-[0.3em]"
              >
                Sign In to Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthAI;
