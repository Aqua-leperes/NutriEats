
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Save, User, Award, Shield, Target, Flame } from 'lucide-react';

interface Props {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
}

const ProfilePage: React.FC<Props> = ({ profile, updateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(profile);

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <div className="glass p-8 rounded-[40px] text-center shadow-xl border border-white/20">
            <div className="w-32 h-32 mx-auto rounded-[32px] bg-gradient-to-br from-green-400 to-blue-500 p-1 mb-6">
              <div className="w-full h-full bg-gray-900 rounded-[30px] flex items-center justify-center text-white text-4xl font-black">
                {profile.name[0]}
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-1">{profile.name}</h3>
            <p className="text-sm opacity-60 mb-6 uppercase tracking-widest font-bold">Nutrition Level 12</p>
            
            <div className="flex justify-center gap-4 mb-8">
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-yellow-500"><Award size={20} /></div>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-blue-500"><Shield size={20} /></div>
              <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-2xl text-red-500"><Flame size={20} /></div>
            </div>

            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="w-full py-3 bg-gray-200 dark:bg-gray-800 rounded-2xl font-bold hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
            >
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          <div className="glass p-6 rounded-[32px] shadow-lg border border-white/10">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Target size={18} className="text-green-500" />
              Recent Achievements
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-500 flex items-center justify-center text-xs font-bold">7D</div>
                <p className="text-xs font-medium">7 Day Healthy Streak</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs font-bold">HI</div>
                <p className="text-xs font-medium">High Score 25,000+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Profile Info */}
        <div className="flex-1 space-y-8 w-full">
          {isEditing ? (
            <div className="glass p-10 rounded-[40px] shadow-2xl space-y-6">
              <h2 className="text-3xl font-black mb-8">Edit Your Identity</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:ring-2 ring-green-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold opacity-60">Age</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                    className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:ring-2 ring-green-500 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold opacity-60">Primary Fitness Goal</label>
                <select 
                  value={formData.goal}
                  onChange={(e) => setFormData({...formData, goal: e.target.value as any})}
                  className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl focus:ring-2 ring-green-500 outline-none"
                >
                  <option value="lose">Weight Loss</option>
                  <option value="maintain">Maintenance</option>
                  <option value="gain">Muscle Gain</option>
                </select>
              </div>
              <button 
                onClick={handleSave}
                className="w-full py-5 bg-green-500 hover:bg-green-600 text-white font-bold text-xl rounded-[24px] shadow-xl shadow-green-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Save size={24} />
                Update Profile
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass p-10 rounded-[40px] shadow-xl">
                  <h4 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">High Score</h4>
                  <div className="text-6xl font-black text-green-500">{profile.highestScore.toLocaleString()}</div>
                  <p className="text-sm opacity-60 mt-4">Top performance in Nutri-Run. Top 5% worldwide.</p>
                </div>
                <div className="glass p-10 rounded-[40px] shadow-xl">
                  <h4 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Current Goal</h4>
                  <div className="text-4xl font-black text-blue-500 capitalize">{profile.goal === 'lose' ? 'Weight Loss' : profile.goal === 'gain' ? 'Muscle Gain' : 'Healthy Balance'}</div>
                  <p className="text-sm opacity-60 mt-4">We've customized your AI advisor and game items for this goal.</p>
                </div>
              </div>

              <div className="glass p-10 rounded-[40px] shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Personal Statistics</h3>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>Vitamins Collected</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>Junk Avoidance</span>
                      <span>62%</span>
                    </div>
                    <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>Hydration Level</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full h-4 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
