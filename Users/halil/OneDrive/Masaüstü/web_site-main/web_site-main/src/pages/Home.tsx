import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Github, Instagram, Linkedin, Code, Star, ExternalLink, X } from 'lucide-react';
import { BiLogoTiktok } from "react-icons/bi";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Typewriter = ({ text, delay }: { text: string; delay: number }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
}

const Home = () => {
  const [latestRepos, setLatestRepos] = useState<Repo[]>([]);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const GITHUB_USERNAME = "halilaydin-tru"; 

  useEffect(() => {
    axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=2`)
      .then(res => setLatestRepos(res.data))
      .catch(err => console.error(err));
  }, []);

  const profileImageSrc = "/profile.jpeg";
  const profileImageFallback = "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/912e2426742b4519f7fddc396062a5fd~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=ff4a76bc&x-expires=1767272400&x-signature=MXmsu4B0hTWMkwzJMURqE6JgRt8%3D&t=4d5b0474&ps=13740610&shp=a5d48078&shcp=81f88b70&idc=sg1";

  return (
    <div className="space-y-12 max-w-full overflow-hidden"> 
      <AnimatePresence>
        {isProfileExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 cursor-zoom-out"
            onClick={() => setIsProfileExpanded(false)}
          >
            <motion.div
              layoutId="profile-image-container"
              className="relative w-full max-w-lg aspect-square rounded-[3rem] overflow-hidden border-4 border-purple-500/50 shadow-2xl shadow-purple-500/50"
            >
              <img 
                src={profileImageSrc} 
                onError={(e) => {e.currentTarget.src=profileImageFallback}}
                className="w-full h-full object-cover"
                alt="Halil"
              />
               <button className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-purple-600 transition-colors">
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-center text-center space-y-6 py-10 relative overflow-hidden px-4">        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-purple-600/30 blur-[80px] rounded-full -z-10 animate-pulse" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative group cursor-zoom-in"
          onClick={() => setIsProfileExpanded(true)}>
          <motion.div 
            layoutId="profile-image-container"
            className="w-32 h-32 rounded-full p-1 bg-gradient-to-r from-purple-500 to-pink-500 overflow-hidden group-hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-shadow duration-500">
            <img 
              src={profileImageSrc} 
              onError={(e) => {e.currentTarget.src=profileImageFallback}}
              className="w-full h-full rounded-full object-cover border-4 border-black"
              alt="Halil"/>
          </motion.div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 border-4 border-black rounded-full flex items-center justify-center z-10">
            <div className="w-2 h-2 bg-white rounded-full animate-ping" />
          </div>
        </motion.div>

        <div className="w-full px-2">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2 break-words">
            Merhaba, ben <span className="text-gradient block md:inline">Halil AYDIN</span>
          </h1>
          <div className="text-xl md:text-2xl text-gray-400 font-mono h-8">
            <span className="text-purple-400">{'>'}</span> <Typewriter text="Full Stack Web Developer_" delay={100} />
          </div>
        </div>

        <div className="flex gap-4">
          <a href="https://instagram.com/halilayd_n" target="_blank" className="p-3 bg-white/5 rounded-2xl hover:bg-pink-600/20 hover:text-pink-500 transition-all border border-white/5 hover:scale-110">
            <Instagram />
          </a>
          <a href="https://tiktok.com/@halilayd_n" target="_blank" className="p-3 bg-white/5 rounded-2xl hover:bg-purple-400/20 hover:text-purple-400 transition-all border border-white/5 hover:scale-110">
            <BiLogoTiktok size={24} />
          </a>
          <a href="https://github.com/halilaydin-tru" target="_blank" className="p-3 bg-white/5 rounded-2xl hover:bg-gray-600/20 hover:text-white transition-all border border-white/5 hover:scale-110">
            <Github />
          </a>
          <a href="https://www.linkedin.com/in/halil-ayd%C4%B1n-097690331/" target="_blank" className="p-3 bg-white/5 rounded-2xl hover:bg-blue-600/20 hover:text-blue-500 transition-all border border-white/5 hover:scale-110">
            <Linkedin />
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 pb-4">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl flex items-center gap-2">
              <Code className="text-purple-500" /> Son Kodlar
            </h3>
            <Link to="/projects" className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
              Tümü <ArrowRight size={14} />
            </Link>
          </div>
          
          <div className="space-y-3">
            {latestRepos.map(repo => (
              <a 
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                className="block bg-black/40 p-4 rounded-xl border border-white/5 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <span className="font-medium truncate text-purple-200 max-w-[150px]">{repo.name}</span>
                  <ExternalLink size={14} className="text-gray-500" />
                </div>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1 text-yellow-500/80"><Star size={12}/> {repo.stargazers_count}</span>
                  <span className="bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded">{repo.language}</span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/20 rounded-3xl p-6 flex flex-col justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-2xl font-bold mb-2 z-10">Birlikte Çalışalım?</h3>
          <p className="text-gray-400 mb-6 z-10">
            Projen var ve hayata geçirmek mi istiyorsun?
          </p>
          
          <a 
            href="mailto:halil_aydin24@trabzon.edu.tr?subject=Proje%20Hakkında&body=Merhaba%20Halil,%20seninle%20bir%20proje%20hakkında%20görüşmek%20istiyorum." 
            className="inline-flex items-center justify-center gap-2 bg-white text-black py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-colors z-10"
          >
             Mail Gönder <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;