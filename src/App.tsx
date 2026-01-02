import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Instagram, ExternalLink, ChevronDown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

// Custom cursor component with multi-colored dripping effect
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; life: number; color: string; size: number }>>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add multi-colored particle effect with dripping motion
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX + (Math.random() - 0.5) * 30,
        y: e.clientY + (Math.random() - 0.5) * 30,
        life: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 4 + 2
      };
      
      setParticles(prev => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener('mousemove', updateMousePosition);

    // Particle lifecycle with dripping effect
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({ 
          ...p, 
          life: p.life - 0.03,
          y: p.y + 2, // Dripping effect
          x: p.x + (Math.random() - 0.5) * 0.5 // Slight horizontal drift
        }))
            .filter(p => p.life > 0)
            .slice(-20) // Limit to 20 particles max for performance
      );
    }, 50);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div 
        className="fixed pointer-events-none z-50 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transition: 'all 0.1s ease-out'
        }}
      />
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-40 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life,
            transform: `scale(${particle.life})`,
            transition: 'all 0.1s ease-out',
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
          }}
        />
      ))}
    </>
  );
};

// Animated white stars background
const StarryBackground = () => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; opacity: number }>>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = Array.from({ length: 100 }, (_, i) => ({ // Reduced from 150 to 100 for better performance
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2
      }));
      setStars(newStars);
    };

    generateStars();
    
    // Debounce resize event to prevent excessive re-renders
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(generateStars, 250);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map(star => (
        <motion.div
          key={star.id}
          className="absolute bg-white rounded-full"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Header section with left-aligned text
const Header = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen flex items-center justify-start relative overflow-hidden pl-16"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="flex items-center justify-between w-full max-w-7xl">
        <motion.div
          className="flex-1 max-w-3xl"
          initial={{ x: -100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-xl md:text-2xl mb-4 text-gray-300 uppercase tracking-wider">
            Hi, I am
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 cursor-pointer mb-6 uppercase tracking-wider"
              style={{
                filter: 'brightness(1.3) contrast(1.2)',
                textShadow: '0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(147, 51, 234, 0.2)'
              }}>
            Devgaya Goyal
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-light tracking-wide">
            AI/ML Engineer | Full-Stack Developer | DevOps Practitioner
          </p>
        </motion.div>
        
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative flex-shrink-0 ml-8"
        >
          <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1 hover:scale-110 transition-transform duration-300 hover:shadow-2xl hover:shadow-purple-500/50">
            <div className="w-full h-full rounded-full bg-gray-300 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Devgaya Goyal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// About section
const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 relative"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl px-8 text-center">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent uppercase tracking-wider cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            filter: 'brightness(1.4) contrast(1.3)',
            textShadow: '0 0 25px rgba(16, 185, 129, 0.4), 0 0 50px rgba(6, 182, 212, 0.3)'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          About Me
        </motion.h2>
        
        <motion.div 
          className="text-lg md:text-xl text-gray-300 leading-relaxed space-y-6"
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p>
            I'm <span className="text-purple-400 font-semibold">Devgaya Goyal</span>, a passionate computer science enthusiast from <span className="text-pink-400 font-semibold">Rajasthan, India</span>.
          </p>
          <p>
            Currently pursuing <span className="text-blue-400 font-semibold">Computer Science Engineering</span> with a specialization in <span className="text-green-400 font-semibold">AI & Data Science</span>.
          </p>
          <p>
            I'm doing an internship at <span className="text-yellow-400 font-semibold">LINUXWORLD Pvt Ltd</span>, where I'm constantly learning and expanding my skill set in cutting-edge technologies.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Skills section
const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const skills = {
    AI: [
      { name: 'Agentic AI (LangChain)' },
      { name: 'Machine Learning (Scikit-learn)' },
      { name: 'Generative AI' }
    ],
    Coding: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'Flask' }
    ],
    DevOps: [
      { name: 'RedHat Linux' },
      { name: 'Docker' },
      { name: 'Jenkins' },
      { name: 'Kubernetes' },
      { name: 'GitHub' }
    ]
  };

  const toggleAccordion = (category: string) => {
    setActiveAccordion(activeAccordion === category ? null : category);
  };

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen py-20 relative"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto px-8">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-lime-400 via-green-400 to-emerald-500 bg-clip-text text-transparent uppercase tracking-wider cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            filter: 'brightness(1.4) contrast(1.3)',
            textShadow: '0 0 25px rgba(132, 204, 22, 0.4), 0 0 50px rgba(34, 197, 94, 0.3)'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Skills
        </motion.h2>

        {/* Skills Marquee */}
        <div className="mb-16 overflow-hidden">
          <motion.div
            className="flex space-x-8 text-4xl"
            animate={{ x: [-1000, 1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {['🐍', '⚛️', '🐳', '🔧', '☁️', '🤖', '💾', '🌐', '🔥', '⚡', '🚀', '💻', '🎯', '🛠️', '📊', '🔍'].map((icon, index) => (
              <div key={index} className="flex-shrink-0">{icon}</div>
            ))}
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, skillList], index) => (
            <motion.div
              key={category}
              className="relative"
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.2 }}
            >
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-1 hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300">
                <div className="bg-slate-800 rounded-lg p-6 h-full">
                  <button
                    onClick={() => toggleAccordion(category)}
                    className="w-full text-left flex items-center justify-between mb-4 hover:text-purple-400 transition-colors"
                    aria-expanded={activeAccordion === category}
                    aria-controls={`${category}-content`}
                  >
                    <h3 className="text-2xl font-bold text-white uppercase tracking-wider cursor-pointer transition-all duration-300 hover:scale-105"
                        style={{
                          filter: 'brightness(1.3)',
                          textShadow: '0 0 15px rgba(168, 85, 247, 0.4)'
                        }}>
                      {category} Skills
                    </h3>
                    <motion.div
                      animate={{ rotate: activeAccordion === category ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="text-purple-400" />
                    </motion.div>
                  </button>
                  
                  <motion.div
                    id={`${category}-content`}
                    className="overflow-hidden"
                    initial={false}
                    animate={{ 
                      height: activeAccordion === category ? 'auto' : 0,
                      opacity: activeAccordion === category ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-3 pt-2">
                      {skillList.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-4 py-2 hover:from-blue-500/40 hover:to-purple-500/40 transition-all duration-300 cursor-pointer"
                        >
                          <span className="text-sm font-medium text-white">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Projects section
const Projects = () => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [activeProject, setActiveProject] = useState<string | null>(null);

  const projects = [
    {
      id: 'snake-game',
      title: 'SNAKE GAME',
      description: 'Classic snake game built with Python Turtle graphics',
      image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400',
      github: 'https://github.com/Devgaya-Goyal'
    },
    {
      id: 'cicd-pipeline',
      title: 'CICD PIPELINE',
      description: 'Automated deployment pipeline using Jenkins, GitHub, Docker, and RedHat',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400',
      github: 'https://github.com/Devgaya-Goyal/devops-project'
    },
    {
      id: 'streamlit-mailer',
      title: 'MAIL APP',
      description: 'Email automation tool built with Streamlit and smtplib',
      image: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400',
      github: 'https://github.com/Devgaya-Goyal'
    },
    {
      id: 'camera-share',
      title: 'MEDIA ACCESS',
      description: 'Web application for camera sharing using MediaDevices, Flask, and Mail',
      image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=400',
      github: 'https://github.com/Devgaya-Goyal'
    }
  ];

  const toggleProject = (projectId: string) => {
    setActiveProject(activeProject === projectId ? null : projectId);
  };

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen py-20 relative"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto px-8">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-orange-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent uppercase tracking-wider cursor-pointer transition-all duration-300 hover:scale-105"
          style={{
            filter: 'brightness(1.4) contrast(1.3)',
            textShadow: '0 0 25px rgba(251, 146, 60, 0.4), 0 0 50px rgba(245, 158, 11, 0.3)'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Projects
        </motion.h2>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative"
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
            >
              <button
                onClick={() => toggleProject(project.id)}
                className="w-full text-left bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                aria-expanded={activeProject === project.id}
                aria-controls={`${project.id}-content`}
              >
                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider cursor-pointer transition-all duration-300 hover:scale-105"
                    style={{
                      filter: 'brightness(1.3)',
                      textShadow: '0 0 15px rgba(168, 85, 247, 0.4)'
                    }}>
                  {project.title}
                </h3>
                <p className="text-gray-300">{project.description}</p>
              </button>

              <motion.div
                id={`${project.id}-content`}
                className="overflow-hidden"
                initial={false}
                animate={{ 
                  height: activeProject === project.id ? 'auto' : 0,
                  opacity: activeProject === project.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="mt-4 bg-slate-800 rounded-xl p-6 flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-wider">{project.title}</h4>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 uppercase tracking-wider"
                    >
                      <ExternalLink size={20} />
                      Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Contact section
const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const socialLinks = [
    {
      name: 'GITHUB',
      icon: Github,
      url: 'https://github.com/Devgaya-Goyal',
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'from-gray-500 to-gray-700'
    },
    {
      name: 'LINKEDIN',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/devgayaa',
      color: 'from-blue-600 to-blue-800',
      hoverColor: 'from-blue-500 to-blue-700'
    },
    {
      name: 'EMAIL',
      icon: Mail,
      url: 'mailto:devagyagoyal7564@gmail.com',
      color: 'from-red-600 to-red-800',
      hoverColor: 'from-red-500 to-red-700'
    },
    {
      name: 'INSTAGRAM',
      icon: Instagram,
      url: 'https://www.instagram.com/devgayaa_/',
      color: 'from-pink-600 to-purple-800',
      hoverColor: 'from-pink-500 to-purple-700'
    }
  ];

  return (
    <motion.section 
      ref={ref}
      className="min-h-screen flex items-center justify-center py-20 relative bg-slate-200" // changed from gradient to single light slate grey
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-2xl mx-auto px-8 text-center">
        <motion.h2 
          className="text-4xl md:text-6xl font-bold mb-12 text-slate-700 uppercase tracking-wider cursor-pointer transition-all duration-300 hover:scale-105" // changed text color for contrast
          style={{
            filter: 'brightness(1.1) contrast(1.1)',
            textShadow: '0 0 10px rgba(100, 116, 139, 0.2)'
          }}
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Let's Connect
        </motion.h2>

        <div className="space-y-6">
          {socialLinks.map((link, index) => {
            const IconComponent = link.icon;
            const isActive = activeLink === link.name;
            
            return (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-4 bg-slate-300 text-slate-800 px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl group relative overflow-hidden uppercase tracking-wider`} // single shade for buttons
                initial={{ y: 50, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                onClick={() => setActiveLink(link.name)}
                onMouseEnter={() => setActiveLink(link.name)}
                onMouseLeave={() => setActiveLink(null)}
                aria-label={`Visit ${link.name} profile`}
              >
                <motion.div
                  animate={isActive ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <IconComponent size={28} />
                </motion.div>
                <span className="text-lg font-semibold">{link.name}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden cursor-none relative">
      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50">
        Skip to main content
      </a>
      
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-800 via-slate-600 to-teal-800 animate-gradient-xy bg-[length:400%_400%]" 
           style={{
             background: 'linear-gradient(-45deg, #2f4f4f, #708090, #b0c4de, #2f4f4f, #008080, #708090)',
             backgroundSize: '400% 400%',
             animation: 'gradientShift 15s ease infinite'
           }}>
      </div>
      
      <CustomCursor />
      <StarryBackground />
      
      <main id="main-content" className="relative z-10 text-white">
        <Header />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
