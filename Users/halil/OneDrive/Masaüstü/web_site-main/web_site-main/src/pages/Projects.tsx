import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Star, GitFork, ExternalLink, Folder, X, Calendar, HardDrive, Clock, Code2, ChevronRight } from 'lucide-react';
import axios from 'axios';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  size: number;
  homepage?: string;
  topics?: string[];
}

const getLanguageColor = (language: string | null) => {
  const colors: { [key: string]: string } = {
    TypeScript: "from-blue-600 to-cyan-500",
    JavaScript: "from-yellow-500 to-orange-500",
    Python: "from-blue-500 to-yellow-500",
    HTML: "from-orange-600 to-red-500",
    CSS: "from-blue-600 to-indigo-500",
    Vue: "from-green-500 to-emerald-400",
    React: "from-cyan-500 to-blue-500",
    Dart: "from-teal-500 to-blue-500",
    Java: "from-red-500 to-orange-600",
    "C#": "from-purple-600 to-indigo-600",
    Go: "from-cyan-600 to-blue-600",
  };
  return colors[language || ""] || "from-purple-600 to-pink-600";
};

const Projects = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const GITHUB_USERNAME = "halilaydin-tru"; 

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=15`);
        setRepos(response.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const selectedRepo = repos.find(r => r.id === selectedId);

  const formatSize = (kb: number) => {
    if (kb > 1024) return `${(kb / 1024).toFixed(1)} MB`;
    return `${kb} KB`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="relative min-h-screen pb-20">
      
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#4c1d95 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 pt-10">
        <div className="mb-12 px-2">
          <h2 className="text-5xl font-black mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            Kod Laboratuvarı
          </h2>
          <p className="text-gray-400 text-lg">
            GitHub üzerinde geliştirdiğim açık kaynak projeler ve detaylı analizleri.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center h-64 items-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center text-xs text-purple-500 font-bold">LOADING</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => {
              const gradientColor = getLanguageColor(repo.language);
              
              return (
                <motion.div
                  layoutId={`card-container-${repo.id}`}
                  key={repo.id}
                  onClick={() => setSelectedId(repo.id)}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative bg-zinc-900/40 backdrop-blur-sm border border-white/5 hover:border-white/20 p-6 rounded-3xl cursor-pointer transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${gradientColor} opacity-10 blur-[50px] group-hover:opacity-20 transition-opacity duration-500`} />

                  <motion.div layoutId={`card-content-${repo.id}`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${gradientColor} bg-opacity-10 text-white shadow-lg`}>
                        <Folder size={24} />
                      </div>
                      <div className="flex gap-2">
                          <span className="flex items-center gap-1 text-xs font-medium bg-black/40 px-3 py-1 rounded-full text-gray-400 border border-white/5">
                            <Star size={12} className="text-yellow-500" /> {repo.stargazers_count}
                          </span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-2xl mb-2 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                      {repo.name}
                    </h3>
                    
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {repo.description || "Gizemli bir proje... Detaylar için tıklayın."}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${gradientColor}`} />
                      {repo.language || "Bilinmiyor"}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedId && selectedRepo && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8">
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div
              layoutId={!isDesktop ? `card-container-${selectedId}` : undefined}
              initial={isDesktop ? { opacity: 0, scale: 0.9, y: 20 } : undefined}
              animate={isDesktop ? { opacity: 1, scale: 1, y: 0 } : undefined}
              exit={isDesktop ? { opacity: 0, scale: 0.9, y: 20 } : undefined}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] overflow-hidden relative z-10 shadow-2xl shadow-purple-900/20 flex flex-col max-h-[90vh]"
            >
              <div className={`relative p-8 md:p-12 overflow-hidden bg-gradient-to-br ${getLanguageColor(selectedRepo.language)}`}>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedId(null); }} 
                  className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md z-20"
                >
                  <X size={24} />
                </button>

                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>

                <motion.div layoutId={!isDesktop ? `card-content-${selectedId}` : undefined} className="relative z-10 mt-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-4 py-1.5 bg-black/30 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/10 flex items-center gap-2">
                        <Code2 size={14} /> {selectedRepo.language}
                    </span>
                    <span className="px-4 py-1.5 bg-black/30 backdrop-blur-md rounded-full text-sm font-medium text-white border border-white/10 flex items-center gap-2">
                        <Clock size={14} /> {formatDate(selectedRepo.updated_at)} (Güncellendi)
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
                    {selectedRepo.name}
                  </h2>
                </motion.div>
              </div>

              <div className="p-8 md:p-12 overflow-y-auto bg-[#0a0a0a]">
                <div className="grid md:grid-cols-3 gap-12">
                  
                  <div className="md:col-span-2 space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        Proje Özeti
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {selectedRepo.description || "Bu proje için detaylı bir açıklama bulunmuyor ancak kod yapısını inceleyerek neler yapıldığını görebilirsiniz."}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      {selectedRepo.homepage ? (
                        <>
                          <a 
                            href={selectedRepo.homepage} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 bg-white text-black py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                          >
                            <ExternalLink size={20} /> Canlı Önizleme
                          </a>
                          <a 
                            href={selectedRepo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 bg-zinc-800 text-white py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-2 hover:bg-zinc-700 transition-all border border-white/10"
                          >
                            <Github size={20} /> Kodları İncele
                          </a>
                        </>
                      ) : (
                        <a 
                          href={selectedRepo.html_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                        >
                          <Github size={20} /> Proje Sayfasına Git <ChevronRight />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-zinc-900/50 rounded-3xl p-6 border border-white/5 space-y-6">
                      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">İstatistikler</h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-300">
                          <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500"><Star size={18}/></div>
                          <span>Yıldız</span>
                        </div>
                        <span className="font-mono text-xl font-bold text-white">{selectedRepo.stargazers_count}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-300">
                          <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><GitFork size={18}/></div>
                          <span>Fork</span>
                        </div>
                        <span className="font-mono text-xl font-bold text-white">{selectedRepo.forks_count}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-gray-300">
                          <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><HardDrive size={18}/></div>
                          <span>Boyut</span>
                        </div>
                        <span className="font-mono text-white">{formatSize(selectedRepo.size)}</span>
                      </div>

                      <div className="pt-4 border-t border-white/5">
                          <div className="text-xs text-gray-500 mb-1">Oluşturulma Tarihi</div>
                          <div className="flex items-center gap-2 text-sm text-gray-300">
                            <Calendar size={14} /> {formatDate(selectedRepo.created_at)}
                          </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;