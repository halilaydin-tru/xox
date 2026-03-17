import { motion } from 'framer-motion';
import { Cpu, Globe, Database, Layout, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const skills = [
    { name: 'Frontend', icon: <Layout className="text-purple-400" />, items: ['HTML', 'CSS', 'JavaScript', 'PHP'] },
    { name: 'Backend', icon: <Database className="text-pink-400" />, items: ['Python', 'MySQL', 'SQL', 'C#'] },
    { name: 'Tools', icon: <Cpu className="text-blue-400" />, items: ['Git Hub', 'VS Code', 'Android Studio', 'CapCut'] },
    { name: 'Social-Media', icon: <Globe className="text-green-400" />, items: ['Instagram', 'Youtube', 'Tiktok', 'Photography'] },
  ];

  return (
    <div className="pt-20 pb-10 space-y-20">
      <section className="grid lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
          print ("👋 Merhaba, ben Halil ")
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Dijital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Mimari
            </span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed border-l-4 border-purple-500 pl-6">
            Web teknolojileri, modern arayüzler ve güçlü backend sistemleri üzerine çalışıyorum. 
            Fikirleri koda, kodları yaşayan projelere dönüştürüyorum.
          </p>
          
          <div className="flex gap-4 pt-4">
            <Link to="/projects" className="px-6 py-3 border border-white/20 rounded-lg font-medium hover:bg-white/5 transition-colors flex items-center gap-2">
              Projelerimi Gör <ArrowRight size={20} />
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[2rem] blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border-2 border-white/10 bg-zinc-900">
            <img 
              src="profile.jpeg" 
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?q=80&w=1000&auto=format&fit=crop";
              }}
              alt="Halil Aydın" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-2xl font-bold text-white">Halil Aydın</h3>
              <p className="text-purple-400">Full Stack WEB Developer</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-10 text-center">Teknik Yetenekler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="p-6 bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                {skill.icon}
                <h3 className="font-semibold text-lg">{skill.name}</h3>
              </div>
              <ul className="space-y-2">
                {skill.items.map((item, i) => (
                  <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;