
import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Lock, User, ArrowRight, Leaf, ShieldCheck, CheckCircle2, Sparkles, Heart, Apple, AlertCircle, Eye, EyeOff, Loader2, X, Fingerprint } from 'lucide-react';

interface Props {
  initialType: 'login' | 'signup';
  onAuthSuccess: (email: string, name?: string) => void;
}

const RealisticBurgerMascot: React.FC<{ 
  mode: 'happy' | 'thinking' | 'hiding' | 'frowning' | 'excited' | 'shocked' | 'wave' | 'googleHover',
  lookX: number,
  lookY: number
}> = ({ mode, lookX, lookY }) => {
  const [isBlinking, setIsBlinking] = useState(false);

  // Blinking logic
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 4000);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="relative w-80 h-80 mb-6 group perspective-container select-none">
      <div 
        className="relative w-full h-full transform transition-all duration-700 ease-out animate-burger-breath"
        style={{ transform: `rotateY(${lookX * 15}deg) rotateX(${lookY * -15}deg)` }}
      >
        {/* Realistic 3D Burger Rendering */}
        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-[-18px]">
          {/* Top Bun */}
          <div className="w-64 h-32 bg-[#e0a96d] rounded-t-[110px] border-b-[10px] border-[#c48d55] shadow-[inset_0_15px_30px_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.2)] relative overflow-hidden transition-all duration-500">
             {/* Sesame Seeds */}
             {[...Array(10)].map((_, i) => (
               <div key={i} className={`absolute w-3 h-1.5 bg-[#fef3c7]/80 rounded-full`} style={{ top: `${15 + i*8}%`, left: `${20 + (i%3)*20}%`, transform: `rotate(${i*45}deg)` }}></div>
             ))}
             
             {/* Facial Elements */}
             <div 
               className="absolute inset-0 flex flex-col items-center justify-center pt-10 transition-transform duration-300"
               style={{ transform: mode === 'hiding' ? 'translateY(140px)' : `translate(${lookX * 25}px, ${lookY * 25}px)` }}
             >
                {/* Eyes with Blinking */}
                <div className="flex gap-14 mb-5">
                  {[1, 2].map(i => (
                    <div key={i} className={`w-11 h-11 bg-slate-900 rounded-full shadow-2xl relative overflow-hidden border-4 border-slate-800 transition-all duration-100 ${isBlinking ? 'scale-y-0' : 'scale-y-100'}`}>
                      <div 
                        className="absolute bg-white rounded-full transition-all duration-300"
                        style={{ 
                          width: (mode === 'shocked' || mode === 'googleHover') ? '30px' : mode === 'thinking' ? '20px' : '8px',
                          height: (mode === 'shocked' || mode === 'googleHover') ? '30px' : mode === 'thinking' ? '20px' : '8px',
                          top: '10%',
                          left: '10%'
                        }}
                      ></div>
                    </div>
                  ))}
                </div>
                {/* Dynamic Mouth */}
                <div className={`transition-all duration-500 bg-slate-900 rounded-full shadow-inner ${
                  mode === 'happy' || mode === 'excited' || mode === 'wave' ? 'w-24 h-12 rounded-b-[50px] scale-110' : 
                  mode === 'googleHover' ? 'w-14 h-14' : 
                  mode === 'frowning' ? 'w-20 h-4 rounded-t-[30px] translate-y-2' : 
                  mode === 'shocked' ? 'w-12 h-16' :
                  'w-16 h-2.5'
                }`}></div>
             </div>
          </div>

          {/* Lettuce */}
          <div className="w-70 h-10 bg-[#22c55e] rounded-full border-b-6 border-[#16a34a] shadow-lg relative z-10 flex justify-center overflow-hidden transform skew-x-1">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>

          {/* Cheese */}
          <div className="w-66 h-8 bg-[#fbbf24] rounded-sm border-b-6 border-[#f59e0b] shadow-xl transform rotate-1 skew-x-12 z-20">
             <div className="absolute -bottom-5 right-12 w-5 h-10 bg-[#fbbf24] rounded-full shadow-lg"></div>
          </div>

          {/* Patty */}
          <div className="w-62 h-14 bg-[#451a03] rounded-[40px] border-b-6 border-black shadow-inner z-10"></div>

          {/* Bottom Bun */}
          <div className="w-64 h-14 bg-[#e0a96d] rounded-b-3xl border-t-8 border-[#c48d55] shadow-2xl"></div>
        </div>

        {/* Arms */}
        <div 
          className={`absolute -right-14 top-1/2 w-16 h-8 bg-[#e0a96d] rounded-full transition-all duration-500 origin-left border-4 border-[#c48d55] z-50 ${
            mode === 'wave' ? 'rotate-[-85deg] animate-wave' : 
            mode === 'googleHover' ? 'rotate-[-30deg] translate-x-2' : 'rotate-0'
          }`}
        ></div>
        <div className={`absolute -left-14 top-1/2 w-16 h-8 bg-[#e0a96d] rounded-full border-4 border-[#c48d55] transition-transform ${mode === 'frowning' ? '-rotate-12' : 'rotate-0'}`}></div>

        {/* Emotes */}
        <div className="absolute top-0 right-0 z-[60]">
          {(mode === 'excited' || mode === 'googleHover') && <div className="text-amber-500 animate-bounce scale-150 drop-shadow-2xl"><Sparkles size={52} fill="currentColor" /></div>}
          {mode === 'happy' && <div className="text-rose-500 animate-pulse scale-150 drop-shadow-2xl"><Heart size={48} fill="currentColor" /></div>}
          {mode === 'frowning' && <div className="text-slate-400 animate-shake scale-125"><AlertCircle size={48} /></div>}
        </div>
      </div>
    </div>
  );
};

const AuthPages: React.FC<Props> = ({ initialType, onAuthSuccess }) => {
  const [type, setType] = useState(initialType);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const [mascotMode, setMascotMode] = useState<'happy' | 'thinking' | 'hiding' | 'frowning' | 'excited' | 'shocked' | 'wave' | 'googleHover'>('happy');
  const [lookPos, setLookPos] = useState({ x: 0, y: 0 });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [showGoogleConfirm, setShowGoogleConfirm] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    setLookPos({ x, y });
  };

  useEffect(() => {
    if (showGoogleConfirm) return; // Modal takes precedence
    
    const isEmailValid = email.includes('@') && email.includes('.');
    const isPassStrong = password.length >= 8;

    if (password.length > 0 && password.length < 8) setMascotMode('frowning');
    else if (password.length >= 8) setMascotMode('hiding');
    else if (isEmailValid) setMascotMode('excited');
    else if (fullName.length > 3 || username.length > 3) setMascotMode('happy');
    else setMascotMode('thinking');
  }, [password, fullName, username, email, showGoogleConfirm]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'signup' && password !== confirmPassword) {
      setMascotMode('frowning');
      return;
    }
    setIsProcessing(true);
    setMascotMode('wave');
    setTimeout(() => {
      onAuthSuccess(email, type === 'signup' ? fullName : username);
      setIsProcessing(false);
    }, 1800);
  };

  const handleGoogleClick = () => {
    setShowGoogleConfirm(true);
    setMascotMode('shocked');
  };

  const confirmGoogleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      onAuthSuccess(email || 'google.user@gmail.com', 'Google Explorer');
      setIsProcessing(false);
      setShowGoogleConfirm(false);
    }, 1500);
  };

  const passwordReqs = [
    { label: "8+ Characters", met: password.length >= 8 },
    { label: "Includes Number", met: /\d/.test(password) },
    { label: "Includes Symbol", met: /[!@#$%^&*]/.test(password) },
    { label: "Matches Confirm", met: password === confirmPassword && password.length > 0 }
  ];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8 relative overflow-hidden" onMouseMove={handleMouseMove}>
      <style>{`
        @keyframes burger-breath {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02) translateY(-10px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(-85deg); }
          50% { transform: rotate(-40deg); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-burger-breath { animation: burger-breath 4s ease-in-out infinite; }
        .animate-wave { animation: wave 0.6s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s linear infinite; }
      `}</style>

      {/* Google Confirmation Modal */}
      {showGoogleConfirm && (
        <div className="fixed inset-0 z-[150] bg-emerald-950/80 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-lg rounded-[50px] shadow-4xl p-12 relative overflow-hidden animate-in zoom-in duration-300">
            <button onClick={() => setShowGoogleConfirm(false)} className="absolute top-8 right-8 text-slate-400 hover:text-emerald-900 transition-colors"><X size={32}/></button>
            <div className="text-center mb-10">
              <div className="flex justify-center mb-6">
                 <svg className="w-16 h-16" viewBox="0 0 24 24">
                   <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                   <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                   <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                   <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                 </svg>
              </div>
              <h4 className="text-4xl font-black text-slate-900 tracking-tighter">Google Identity</h4>
              <p className="text-slate-500 font-bold mt-2">NutriEats Hub requires Gmail verification.</p>
            </div>
            <form onSubmit={confirmGoogleAuth} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-3">Gmail Account</label>
                 <input type="email" required placeholder="user@gmail.com" className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold"/>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-3">Account Secret</label>
                 <input type="password" required placeholder="••••••••" className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold"/>
              </div>
              <button className="w-full py-7 bg-emerald-900 text-white font-black rounded-3xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3">
                {isProcessing ? <Loader2 className="animate-spin" /> : 'Confirm & Authenticate'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Background Decor */}
      <div className="absolute top-[-5%] right-[-5%] w-[45vw] h-[45vw] bg-emerald-50 rounded-full blur-[140px] opacity-70"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[45vw] h-[45vw] bg-sky-50 rounded-full blur-[140px] opacity-70"></div>

      <div className="max-w-7xl w-full bg-white rounded-[80px] shadow-[0_40px_100px_-20px_rgba(6,78,59,0.12)] overflow-hidden flex flex-col md:flex-row border border-slate-100 min-h-[800px] relative z-10">
        
        {/* Left Panel */}
        <div className="md:w-[45%] bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 p-16 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-14 self-start group cursor-pointer">
              <div className="p-3 bg-white text-emerald-900 rounded-2xl shadow-xl transition-all group-hover:rotate-12">
                <Leaf size={32} fill="currentColor" />
              </div>
              <span className="text-3xl font-black tracking-tight">NutriEats Hub</span>
            </div>
            
            <RealisticBurgerMascot mode={mascotMode} lookX={lookPos.x} lookY={lookPos.y} />
            
            <div className="self-start mt-8">
              <h2 className="text-7xl font-black leading-[0.9] tracking-tighter mb-8">
                {type === 'login' ? "Elevate your vitality." : "Join our healthy ecosystem."}
              </h2>
              <div className="space-y-4">
                {["Neural health insights", "Metabolic intelligence", "Encrypted data vault"].map((text, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 border border-white/20"><CheckCircle2 size={18}/></div>
                    <span className="font-bold text-xl opacity-80">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-2xl"><ShieldCheck size={32}/></div>
            <div>
              <div className="font-black text-xs uppercase tracking-widest text-white">Full Encryption</div>
              <div className="text-[10px] font-bold opacity-30 uppercase tracking-[0.4em]">Clinical Security Standard</div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 p-10 lg:p-24 flex flex-col justify-center bg-white relative">
          <div className="max-w-md mx-auto w-full space-y-10">
            <div className="text-center md:text-left">
              <div className="inline-block px-5 py-2 bg-emerald-50 text-emerald-900 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-6 border border-emerald-100 shadow-sm">
                {type === 'login' ? 'Authentication' : 'Registration'}
              </div>
              <h3 className="text-6xl font-black text-slate-900 mb-3 tracking-tighter leading-none">
                {type === 'login' ? 'Hi Again!' : 'Join Hub'}
              </h3>
              <p className="text-slate-400 font-bold text-lg leading-relaxed">Personal health intelligence at your fingertips.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {type === 'signup' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-4">Full Name</label>
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-900 transition-colors" size={20} />
                      <input type="text" placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full p-6 pl-14 bg-slate-50 border-2 border-slate-50 rounded-[30px] focus:bg-white focus:border-emerald-900 outline-none transition-all font-black text-lg" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-4">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-900 transition-colors" size={20} />
                      <input type="email" placeholder="john@example.com" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-6 pl-14 bg-slate-50 border-2 border-slate-50 rounded-[30px] focus:bg-white focus:border-emerald-900 outline-none transition-all font-black text-lg" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-4">Password</label>
                      <div className="relative group">
                        <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-[30px] focus:bg-white focus:border-emerald-900 outline-none transition-all font-black text-lg" required />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-900 transition-colors">
                          {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-4">Confirm</label>
                      <div className="relative group">
                        <input type={showConfirm ? "text" : "password"} placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full p-6 bg-slate-50 border-2 border-slate-50 rounded-[30px] focus:bg-white focus:border-emerald-900 outline-none transition-all font-black text-lg" required />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-900 transition-colors">
                          {showConfirm ? <EyeOff size={20}/> : <Eye size={20}/>}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-5 rounded-[25px] grid grid-cols-2 gap-3 border border-slate-100">
                    {passwordReqs.map((req, i) => (
                      <div key={i} className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${req.met ? 'text-emerald-700' : 'text-slate-300'}`}>
                        {req.met ? <CheckCircle2 size={12}/> : <div className="w-2.5 h-2.5 border-2 border-slate-200 rounded-full"/>}
                        {req.label}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-4">Username</label>
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-900 transition-colors" size={20} />
                      <input type="text" placeholder="jane_explorer" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-6 pl-14 bg-slate-50 border-2 border-slate-50 rounded-[30px] focus:bg-white focus:border-emerald-900 outline-none transition-all font-black text-lg" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-4">Password</label>
                    <div className="relative group">
                      <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-900 transition-colors" size={20} />
                      <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-6 pl-14 bg-slate-50 border-2 border-slate-50 rounded-[30px] focus:bg-white focus:border-emerald-900 outline-none transition-all font-black text-lg" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-900 transition-colors">
                        {showPassword ? <EyeOff size={24}/> : <Eye size={24}/>}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <button disabled={isProcessing} className="group w-full py-8 bg-emerald-900 text-white font-black text-2xl rounded-[40px] shadow-3xl transition-all flex items-center justify-center gap-5 active:scale-95 hover:scale-[1.02] cursor-pointer disabled:bg-slate-300">
                {isProcessing ? <Loader2 className="animate-spin" /> : (type === 'login' ? 'Initiate Session' : 'Activate Profile')}
                {!isProcessing && <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />}
              </button>
            </form>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-slate-100"></div></div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.8em]"><span className="px-8 bg-white text-slate-300">Direct Connect</span></div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               <button 
                 onMouseEnter={() => setMascotMode('googleHover')} 
                 onMouseLeave={() => setMascotMode('happy')} 
                 onClick={handleGoogleClick}
                 className="flex items-center justify-center gap-4 py-5 border-2 border-slate-100 rounded-[3