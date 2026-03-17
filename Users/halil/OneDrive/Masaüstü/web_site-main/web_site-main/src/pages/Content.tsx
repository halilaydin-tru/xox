import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Instagram, ChevronRight, ChevronLeft } from 'lucide-react';

const videos = [
  { id: 1, title: 'Bunu senden beklemezdim…', url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80' },
  { id: 2, title: 'React ile Animasyon', url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80' },
  { id: 3, title: 'Yazılımcı Günlüğü', url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
  { id: 4, title: 'Ofis Kurulumu', url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' },
  { id: 5, title: 'Proje Tanıtımı', url: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80' },
];

const Content = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  const scrollLeft = () => {
    const slider = document.getElementById('video-slider');
    if (slider) slider.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const slider = document.getElementById('video-slider');
    if (slider) slider.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
             Sosyal Medya İçerikleri
          </h2>
          <p className="text-gray-400">Instagram ve diğer platformlarda paylaştığım son videolar.</p>
        </div>
        
        <div className="flex gap-2">
           <button onClick={scrollLeft} className="p-2 bg-zinc-900 border border-zinc-800 rounded-full hover:border-purple-500 transition-colors">
             <ChevronLeft size={24} />
           </button>
           <button onClick={scrollRight} className="p-2 bg-zinc-900 border border-zinc-800 rounded-full hover:border-purple-500 transition-colors">
             <ChevronRight size={24} />
           </button>
        </div>
      </div>

      <div 
        id="video-slider" 
        className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 w-72 md:w-80 snap-center cursor-pointer group relative"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="aspect-[9/16] rounded-2xl overflow-hidden relative border border-zinc-800">
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Play size={24} fill="white" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-4 w-full">
                <div className="flex items-center gap-2 text-xs text-purple-400 mb-1">
                  <Instagram size={14} />
                  <span>Instagram</span>
                </div>
                <h3 className="font-bold text-white text-lg leading-tight">{video.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-zinc-900 w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-zinc-800 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900/50">
                <h3 className="font-bold text-lg">{selectedVideo.title}</h3>
                <button onClick={() => setSelectedVideo(null)} className="p-1 hover:bg-zinc-800 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              
              <div className="relative pt-[56.25%] bg-black">
                <video 
                  src={selectedVideo.url} 
                  controls 
                  autoPlay 
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Content;