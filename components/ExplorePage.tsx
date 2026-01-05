
import React from 'react';
import { Apple, Dumbbell, Brain, Heart, Wind, Coffee } from 'lucide-react';

const ExplorePage: React.FC = () => {
  const topics = [
    { title: "Keto Recipes", icon: <Apple />, color: "bg-green-500", desc: "Low carb, high energy meals for fat burning." },
    { title: "HIIT Workouts", icon: <Dumbbell />, color: "bg-blue-500", desc: "Burn calories fast with 20 min daily sessions." },
    { title: "Mindfulness", icon: <Brain />, color: "bg-purple-500", desc: "Stress reduction techniques for busy people." },
    { title: "Heart Health", icon: <Heart />, color: "bg-red-500", desc: "Everything you need to know about cardiovascular care." },
    { title: "Better Sleep", icon: <Wind />, color: "bg-cyan-500", desc: "Deep sleep strategies for physical recovery." },
    { title: "Superfoods", icon: <Coffee />, color: "bg-amber-500", desc: "Discover the most nutrient-dense foods on Earth." }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-5xl font-black">Explore <span className="text-green-600">Health Hub</span></h2>
        <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">Dive into our curated library of health and wellness resources designed for your transformation.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((t, i) => (
          <div key={i} className="group bg-white dark:bg-gray-900 p-10 rounded-[40px] shadow-xl border border-green-50 dark:border-gray-800 hover:-translate-y-2 transition-all cursor-pointer">
            <div className={`w-14 h-14 ${t.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform`}>
              {t.icon}
            </div>
            <h3 className="text-2xl font-black mb-3">{t.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
