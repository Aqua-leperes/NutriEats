
import React, { useState, useEffect } from 'react';
import { Scale, Info, HelpCircle, Activity, Heart, Zap } from 'lucide-react';

const BMITool: React.FC = () => {
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [bmi, setBmi] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    const calculatedBmi = weight / ((height / 100) ** 2);
    setBmi(Number(calculatedBmi.toFixed(1)));

    if (calculatedBmi < 18.5) {
      setCategory('Underweight');
      setColor('text-sky-500');
    } else if (calculatedBmi < 25) {
      setCategory('Healthy Weight');
      setColor('text-emerald-500');
    } else if (calculatedBmi < 30) {
      setCategory('Overweight');
      setColor('text-amber-500');
    } else {
      setCategory('Obese');
      setColor('text-rose-500');
    }
  }, [weight, height]);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-20">
        <div className="flex items-center gap-6">
          <div className="p-5 bg-gradient-to-tr from-sky-400 to-blue-600 rounded-[30px] text-white shadow-2xl shadow-blue-500/20">
            <Scale size={44} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Metric <span className="text-blue-500">Dashboard</span></h2>
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] mt-2">Body Mass Index Analysis Core</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 bg-white p-12 rounded-[60px] space-y-12 shadow-3xl border border-slate-50">
          <div className="space-y-6">
            <div className="flex justify-between items-center px-4">
              <label className="font-black text-slate-500 uppercase tracking-widest text-xs flex items-center gap-2">
                Body Weight <span className="text-slate-300">(kg)</span>
              </label>
              <span className="text-4xl font-black text-slate-900">{weight}</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="200" 
              value={weight} 
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-center px-4">
              <label className="font-black text-slate-500 uppercase tracking-widest text-xs flex items-center gap-2">
                Stature Height <span className="text-slate-300">(cm)</span>
              </label>
              <span className="text-4xl font-black text-slate-900">{height}</span>
            </div>
            <input 
              type="range" 
              min="100" 
              max="250" 
              value={height} 
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="pt-10 border-t border-slate-100">
            <div className="flex items-start gap-4 p-6 bg-slate-50 rounded-[30px] border border-slate-100">
              <Info className="text-blue-500 mt-1 flex-shrink-0" size={20} />
              <p className="text-sm font-bold text-slate-400 leading-relaxed">
                Scientific Note: BMI provides a standard metric for weight categories, though individual results may vary based on muscle-to-fat ratios.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <div className="bg-white p-16 rounded-[60px] text-center shadow-3xl border border-slate-50 relative overflow-hidden group">
            <div className={`absolute inset-0 opacity-5 pointer-events-none transition-all duration-1000 ${color.replace('text-', 'bg-')}`}></div>
            
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 mb-6">Computed Result</p>
            <h3 className={`text-[120px] font-black mb-6 leading-none tracking-tighter transition-colors duration-500 ${color}`}>{bmi}</h3>
            
            <div className={`inline-flex px-10 py-4 rounded-full font-black text-2xl mb-12 shadow-lg border-2 ${color.replace('text-', 'bg-').replace('500', '50')} ${color} border-current`}>
              {category.toUpperCase()}
            </div>

            <div className="w-full h-4 bg-slate-100 rounded-full flex overflow-hidden shadow-inner">
              <div className="h-full bg-sky-400" style={{ width: '18.5%' }}></div>
              <div className="h-full bg-emerald-400" style={{ width: '25%' }}></div>
              <div className="h-full bg-amber-400" style={{ width: '15%' }}></div>
              <div className="h-full bg-rose-400" style={{ width: '41.5%' }}></div>
            </div>
            <div className="flex justify-between w-full mt-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] px-2">
              <span>Under</span>
              <span>Healthy</span>
              <span>Over</span>
              <span>Obese</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 p-12 rounded-[50px] text-white shadow-2xl relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                 <Zap size={64}/>
               </div>
               <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                 <HelpCircle size={24} className="text-emerald-500" />
                 Status Impact
               </h4>
               <p className="text-slate-400 font-bold leading-relaxed">
                 {category === 'Healthy Weight' 
                  ? 'Your biometric profile is optimal. Maintain high-protein intake and consistent sleep patterns to preserve this status.' 
                  : 'Based on clinical benchmarks, your current range suggests exploring a structured meal plan. NutriBot can help curate one for you.'}
               </p>
            </div>
            <div className="bg-emerald-500 p-12 rounded-[50px] text-white shadow-2xl relative group overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                 <Activity size={64}/>
               </div>
               <h4 className="text-xl font-black mb-4 flex items-center gap-3">
                 <Heart size={24} className="fill-white" />
                 Next Step
               </h4>
               <p className="text-white/80 font-bold leading-relaxed">
                 Sync your health data with our Apple Health integration to see how your BMI trends over time with your activity.
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BMITool;
