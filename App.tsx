
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Compass, MessageSquare, User, Moon, Sun, Leaf, LogIn, UserPlus, Search, X, Shield, FileText, LifeBuoy } from 'lucide-react';
import type { Section, UserProfile } from './types';
import LandingPage from './components/LandingPage';
import HealthAI from './components/HealthAI';
import BMITool from './components/BMITool';
import ProfilePage from './components/ProfilePage';
import ExplorePage from './components/ExplorePage';
import ContactPage from './components/ContactPage';
import AuthPages from './components/AuthPages';

gsap.registerPlugin(ScrollTrigger);

const StaticPage: React.FC<{ title: string; icon: React.ReactNode; content: string }> = ({ title, icon, content }) => (
  <div className="container mx-auto px-8 py-24 max-w-6xl min-h-screen">
    <div className="flex items-center gap-8 mb-20">
      <div className="p-6 bg-emerald-950 rounded-[32px] text-white shadow-2xl ring-8 ring-emerald-900/10">{icon}</div>
      <h1 className="text-7xl font-black text-slate-900 tracking-tighter">{title}</h1>
    </div>
    <div className="space-y-16">
      {content.split('\n\n').map((para, i) => (
        <p key={i} className="text-2xl text-slate-700 leading-[2.2] text-justify font-light bg-white p-12 rounded-[50px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          {para}
        </p>
      ))}
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiUsageCount, setAiUsageCount] = useState(() => Number(localStorage.getItem('ai_usage_count') || 0));
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('is_logged_in') === 'true');
  
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('user_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Adventurer',
      age: 25,
      goal: 'maintain',
      highestScore: 0
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.setItem('is_logged_in', isLoggedIn.toString());
  }, [activeSection, isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('ai_usage_count', aiUsageCount.toString());
  }, [aiUsageCount]);

  const handleLogoClick = () => setActiveSection('home');
  const goToLogin = () => setActiveSection('login');

  const incrementAiUsage = () => {
    setAiUsageCount(prev => prev + 1);
  };

  const handleAuthSuccess = (email: string, name?: string) => {
    setIsLoggedIn(true);
    if (name) {
      const newProfile = { ...userProfile, name };
      setUserProfile(newProfile);
      localStorage.setItem('user_profile', JSON.stringify(newProfile));
    }
    setActiveSection('home');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 font-['Poppins'] relative bg-white selection:bg-emerald-100 selection:text-emerald-900">
      
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
          <button onClick={() => setIsSearchOpen(false)} className="absolute top-12 right-12 p-4 hover:bg-slate-100 rounded-full transition-all group">
            <X size={48} className="text-slate-400 group-hover:text-emerald-900 group-hover:rotate-90 transition-transform" />
          </button>
          <div className="w-full max-w-3xl space-y-12">
            <h2 className="text-6xl font-black text-center tracking-tighter text-slate-900">Your <span className="text-emerald-900">Intelligence Core</span></h2>
            <div className="relative group">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-900 transition-colors" size={32} />
              <input 
                autoFocus
                type="text" 
                placeholder="Search molecular data, recipes, or health guides..."
                className="w-full p-12 pl-24 bg-slate-100 border-none rounded-[50px] text-3xl font-medium focus:ring-8 ring-emerald-900/5 outline-none transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsSearchOpen(false);
                    setActiveSection('nutrition');
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100 px-10 py-6 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={handleLogoClick} role="button">
          <div className="p-3 bg-emerald-950 rounded-2xl text-white shadow-xl group-hover:rotate-12 transition-all duration-300">
            <Leaf size={28} fill="currentColor" />
          </div>
          <span className="text-3xl font-black tracking-tighter text-slate-800">
            NutriEats<span className="text-emerald-900">Hub</span>
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-12">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'explore', label: 'Explore', icon: Compass },
            { id: 'contact', label: 'Contact Us', icon: MessageSquare },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`flex items-center gap-2.5 font-bold text-sm transition-all relative py-2 group ${
                activeSection === item.id ? 'text-emerald-900' : 'text-slate-400 hover:text-emerald-800'
              }`}
            >
              <item.icon size={20} strokeWidth={2.5} />
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-900 rounded-full transition-all duration-300 ${activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center bg-slate-100 rounded-full px-5 py-2.5 text-slate-400 gap-3 border border-slate-200/50 hover:bg-slate-200 transition-all cursor-pointer"
          >
            <Search size={18} />
            <span className="text-xs font-black uppercase tracking-widest">Universal Search...</span>
          </button>
          
          <div className="flex gap-4">
            {!isLoggedIn ? (
              <>
                <button onClick={goToLogin} className="px-6 py-3 text-sm font-black text-slate-600 hover:text-emerald-900 transition-colors uppercase tracking-widest">Login</button>
                <button onClick={() => setActiveSection('signup')} className="px-8 py-3 bg-emerald-950 text-white rounded-2xl text-sm font-black shadow-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">Join Free</button>
              </>
            ) : (
              <div className="flex items-center gap-6">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Welcome, {userProfile.name}</span>
                <button onClick={() => setActiveSection('profile')} className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-900 hover:bg-emerald-100 transition-colors shadow-sm">
                  <User size={24}/>
                </button>
                <button onClick={() => { setIsLoggedIn(false); setActiveSection('home'); }} className="text-xs font-black text-slate-300 hover:text-red-600 uppercase tracking-[0.2em] transition-colors">Logout</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 z-10 relative">
        {activeSection === 'home' && <LandingPage onNavigate={setActiveSection} />}
        {activeSection === 'nutrition' && (
          <div className="container mx-auto px-4 py-12">
            <HealthAI 
              usageCount={aiUsageCount} 
              onQuery={incrementAiUsage} 
              isLoggedIn={isLoggedIn}
              onLoginRequest={goToLogin}
            />
          </div>
        )}
        {activeSection === 'tools' && <div className="container mx-auto px-4 py-12"><BMITool /></div>}
        {activeSection === 'profile' && <div className="container mx-auto px-4 py-12"><ProfilePage profile={userProfile} updateProfile={setUserProfile} /></div>}
        {activeSection === 'explore' && <div className="container mx-auto px-4 py-12"><ExplorePage /></div>}
        {activeSection === 'contact' && <div className="container mx-auto px-4 py-12"><ContactPage /></div>}
        {(activeSection === 'login' || activeSection === 'signup') && (
          <AuthPages 
            initialType={activeSection} 
            onAuthSuccess={handleAuthSuccess} 
          />
        )}
        
        {activeSection === 'support' && (
          <StaticPage 
            title="Comprehensive Support" 
            icon={<LifeBuoy size={56} />} 
            content={`Our customer support infrastructure is built upon the foundation of total user satisfaction and clinical accuracy. At NutriEats Hub, we understand that health journeys are deeply personal and sometimes complex, which is why our support team is available twenty-four hours a day, seven days a week, across all global time zones. Whether you are experiencing a technical difficulty with the perspective-based Nutri-Run game, or you have identified a potential inaccuracy in a generated meal plan, our specialized engineers and certified nutritional consultants are standing by to intervene immediately.

The contemporary health landscape requires a support system that is as dynamic as the users it serves. We have integrated advanced telemetry and real-time monitoring to ensure that your experience remains seamless even during high-traffic intervals. If you are a member of our premium Vitality tier, you gain access to the "Priority Direct Channel," which guarantees a response from a specialized consultant within sixty minutes of any ticket submission. Our commitment to accuracy means that every health-related query is reviewed by multiple logic systems before a final recommendation is delivered to you.

Technical troubleshooting is a core part of our mission. The 2.5D rendering engine utilized in our health games requires robust browser performance, and our support portal provides automated hardware diagnostics to ensure your device is fully optimized for the best visual experience. We maintain a transparent public incident log, allowing users to see any scheduled maintenance or known issues in real-time. This level of transparency is rare in the industry but is essential for maintaining the high level of trust that NutriEats Hub users have come to expect from us.

Beyond technical fixes, our support team acts as a human extension of our Artificial Intelligence. If NutriBot provides a recipe or a metabolic breakdown that you find confusing, you can "Request Clarification" with a single click. This triggers a human review process where a certified nutritionist will break down the data in even greater detail, ensuring you have the confidence to implement our suggestions into your daily life. We also host weekly community webinars and Q&A sessions where you can interact directly with the developers and health experts behind the platform.`} 
          />
        )}
        {activeSection === 'privacy' && (
          <StaticPage 
            title="Privacy Protocol" 
            icon={<Shield size={56} />} 
            content={`Privacy is the absolute core of the NutriEats Hub architecture. We believe that your biometric data, nutritional habits, and personal health goals are your most sensitive property. In an era where personal data is often commodified without consent, we have taken a radical stance: your data belongs to you, and we are merely its temporary custodians. We have architected our entire platform around the "Zero Trust" security framework, ensuring that even our internal systems require multiple layers of unique authorization to access any identifiable user information.

We utilize enterprise-grade AES-256 encryption for all data at rest and TLS 1.3 for all data in transit. This means that from the moment you input your current weight or your dietary preferences, your information is scrambled into a cryptographic code that is mathematically impossible to decipher without your unique user-held key. Furthermore, we are fully compliant with the General Data Protection Regulation (GDPR) and the Health Insurance Portability and Accountability Act (HIPAA) frameworks, providing you with the strongest legal protections available in the modern digital world.

Our relationship with Artificial Intelligence is governed by strict ethical guardrails. NutriBot operates in a strictly isolated sandbox environment. Your private health queries are never used to train global models that could potentially expose your habits to other users through data leakage. Every AI session is a closed loop, deleted from our active neural memory as soon as you close the session, unless you specifically choose to save the session to your "Healthy Vault." Even then, that vault is encrypted with a key that we do not store on our servers, giving you total and exclusive control over its contents.

We also believe fundamentally in the "Right to be Forgotten." If you ever decide to leave the Hub, you can purge your entire digital footprint with a single button click in your profile settings. This is not a partial deletion or a "deactivation"; it is a permanent wipe from our production databases, our backup archives, and our analytical logs. We do not maintain "shadow profiles" or residual metadata. When you leave, every trace of your health journey leaves with you. This absolute level of privacy is why over 100,000 users trust us with their most intimate vitality metrics every single day.`} 
          />
        )}
        {activeSection === 'cookies' && (
          <StaticPage 
            title="Tracking & Cookie Policy" 
            icon={<FileText size={56} />} 
            content={`Our platform utilizes advanced cookie technology to ensure that your wellness journey is as smooth and personalized as possible. A cookie is a small piece of data that we place on your device to help our systems recognize you as you move between different sections of the Hub. Without these technologies, we wouldn't be able to remember your theme preferences, your current game progress, or the nutritional goals you've set for the week. Every click would require a fresh login, making the platform virtually unusable for long-term tracking.

We have simplified our cookie management into three distinct categories to provide you with maximum clarity and control. First are the "Operational Cookies," which are strictly necessary for the platform to function. These manage your secure login session, protect you from cross-site request forgery attacks, and ensure that our metabolic calculators are pulling data for the correct user profile. These are mandatory for security reasons and cannot be disabled without breaking the core functionality of the website. If you block these in your browser, the Hub will experience significant session errors.

Next are the "Personalization Cookies," which are used to tailor the Hub experience to your unique habits. These cookies remember whether you prefer our elegant Deep Forest theme or the standard high-contrast White theme. They also allow NutriBot to recall your "Favorite Ingredients" so it can suggest recipes that you'll actually enjoy without you having to re-input your tastes every session. These cookies stay on your device for a set period but can be cleared through your browser settings at any time if you prefer a fresh start. These are entirely optional but highly recommended for a premium experience.

Finally, we use "Analytical Cookies" to help us improve the Hub for everyone. These cookies provide us with anonymized, aggregated data about how people use our platform. We can see which health topics are trending globally, which recipes are being shared most often, and where people are dropping off in the runner game. We never link this data back to your personal identity. It is purely mathematical information that helps our development team decide which new features to build next. You have full control over these through our "Consent Manager" in the footer, allowing you to opt-out of all non-essential tracking with a single click.`} 
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-100 py-24 z-20 relative">
        <div className="container mx-auto px-10">
          <div className="grid md:grid-cols-4 gap-20 mb-20">
            <div className="space-y-8">
              <div className="flex items-center gap-4 cursor-pointer" onClick={handleLogoClick}>
                <Leaf className="text-emerald-950" size={36} />
                <span className="text-3xl font-black tracking-tighter">NutriEats Hub</span>
              </div>
              <p className="text-slate-500 text-xl leading-relaxed font-medium">The synthesis of clinical intelligence and human vitality. Join 100k+ explorers.</p>
            </div>
            
            <div>
              <h4 className="font-black mb-10 text-slate-900 uppercase tracking-[0.4em] text-xs">Explore Hub</h4>
              <ul className="space-y-5 text-sm text-slate-400 font-bold">
                {['AI Consultant', 'Metabolic Tracking', 'Meal Intelligence'].map(item => (
                  <li key={item} onClick={goToLogin} className="hover:text-emerald-900 cursor-pointer transition-all hover:translate-x-2">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-10 text-slate-900 uppercase tracking-[0.4em] text-xs">Community</h4>
              <ul className="space-y-5 text-sm text-slate-400 font-bold">
                {['Success Stories', 'Expert Insights', 'Support Forum'].map(item => (
                  <li key={item} onClick={goToLogin} className="hover:text-emerald-900 cursor-pointer transition-all hover:translate-x-2">{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-black mb-10 text-slate-900 uppercase tracking-[0.4em] text-xs">Legal & Help</h4>
              <ul className="space-y-5 text-sm text-slate-400 font-bold">
                <li onClick={() => setActiveSection('support')} className="hover:text-emerald-900 cursor-pointer transition-all hover:translate-x-2">Contact Support</li>
                <li onClick={() => setActiveSection('privacy')} className="hover:text-emerald-900 cursor-pointer transition-all hover:translate-x-2">Privacy Protocol</li>
                <li onClick={() => setActiveSection('cookies')} className="hover:text-emerald-900 cursor-pointer transition-all hover:translate-x-2">Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="pt-16 border-t border-slate-50 text-center text-[12px] font-black text-slate-300 uppercase tracking-[1em]">Vitality Powered Hub &copy; 2025</div>
        </div>
      </footer>
    </div>
  );
};

export default App;
