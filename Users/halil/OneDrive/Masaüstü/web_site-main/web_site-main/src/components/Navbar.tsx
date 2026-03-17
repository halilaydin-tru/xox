import { Link, useLocation } from 'react-router-dom';
import { Terminal, User, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();

  const links = [
    { name: 'Ana Sayfa', path: '/', icon: <Terminal size={20} /> },
    { name: 'Projeler', path: '/projects', icon: <Code size={20} /> },
    { name: 'Ben Kimim', path: '/about', icon: <User size={20} /> },
  ];

  return (
    <>
      <div className="hidden md:flex fixed top-6 left-0 right-0 z-50 justify-center">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-purple-900/20"
        >
          <Link to="/" className="font-bold text-xl tracking-tighter mr-4">
            <span className="text-purple-500">"</span> HALİL AYDIN <span className="text-purple-500">"</span>
          </Link>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-4 py-2 text-sm font-medium transition-colors hover:text-white ${
                location.pathname === link.path ? 'text-white' : 'text-gray-400'
              }`}
            >
              {location.pathname === link.path && (
                <motion.div
                  layoutId="desktop-nav"
                  className="absolute inset-0 bg-purple-600 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="flex items-center gap-2">
                {link.icon} {link.name}
              </span>
            </Link>
          ))}
        </motion.nav>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-t border-white/10 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="flex flex-col items-center justify-center w-full h-full space-y-1 relative"
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-glow"
                    className="absolute top-0 w-12 h-1 bg-purple-500 rounded-b-full shadow-[0_0_10px_#a855f7]"
                  />
                )}
                <div className={`${isActive ? 'text-purple-400' : 'text-gray-500'}`}>
                  {link.icon}
                </div>
                <span className={`text-[10px] ${isActive ? 'text-white font-bold' : 'text-gray-500'}`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;