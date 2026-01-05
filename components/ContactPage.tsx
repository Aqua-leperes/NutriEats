
import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="py-12 max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-5xl font-black">Get in <span className="text-green-600">Touch</span></h2>
            <p className="text-gray-500 text-lg font-medium leading-relaxed">
              Have questions about your nutritional plan or facing technical issues with our runner game? We're here to help!
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-center group">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-gray-400">Email Us</div>
                <div className="text-xl font-bold">hello@nutrieats.hub</div>
              </div>
            </div>
            <div className="flex gap-6 items-center group">
              <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-green-600 group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest text-gray-400">Call Us</div>
                <div className="text-xl font-bold">+1 (555) HEALTHY</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-10 rounded-[40px] shadow-2xl border border-green-50 dark:border-gray-800">
          <form className="space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full p-5 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-green-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full p-5 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-green-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Your Message</label>
              <textarea 
                rows={4}
                placeholder="How can we help you?"
                className="w-full p-5 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl focus:ring-2 ring-green-500 outline-none resize-none"
              ></textarea>
            </div>
            <button className="w-full py-5 bg-green-600 hover:bg-green-700 text-white font-black text-xl rounded-2xl shadow-xl shadow-green-600/20 transition-all flex items-center justify-center gap-3 active:scale-95">
              Send Message
              <Send size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
