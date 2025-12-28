import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiFile } from "react-icons/fi";
import { useHeroData } from "../hooks/usePortfolioData";
import HeroAvatar from "./HeroAvatar";

// Magic UI Particles Component (Dark Mode Only)
const Particles = ({ className = "", quantity = 100, staticity = 50, ease = 50 }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const ctx = useRef(null);
  const circles = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const size = useRef({ w: 0, h: 0 });
  const dpr = window.devicePixelRatio || 1;
  const raf = useRef(null);

  useEffect(() => {
    ctx.current = canvasRef.current.getContext("2d");
    init();
    animate();

    const handleMouseMove = (e) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left - size.current.w / 2;
      mouse.current.y = e.clientY - rect.top - size.current.h / 2;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", init);
    };
  }, []);

  const init = () => {
    size.current.w = containerRef.current.offsetWidth;
    size.current.h = containerRef.current.offsetHeight;
    canvasRef.current.width = size.current.w * dpr;
    canvasRef.current.height = size.current.h * dpr;
    canvasRef.current.style.width = `${size.current.w}px`;
    canvasRef.current.style.height = `${size.current.h}px`;
    ctx.current.scale(dpr, dpr);
    circles.current = Array.from({ length: quantity }, () => createCircle());
  };

  const createCircle = () => ({
    x: Math.random() * size.current.w,
    y: Math.random() * size.current.h,
    dx: (Math.random() - 0.5) * 0.1,
    dy: (Math.random() - 0.5) * 0.1,
    size: Math.random() * 2 + 0.5,
    alpha: 0,
    targetAlpha: Math.random() * 0.6 + 0.2,
  });

  const drawCircle = (c) => {
    ctx.current.beginPath();
    ctx.current.arc(c.x, c.y, c.size, 0, Math.PI * 2);
    ctx.current.fillStyle = `rgba(255, 255, 255, ${c.alpha})`;
    ctx.current.fill();
  };

  const animate = () => {
    ctx.current.clearRect(0, 0, size.current.w, size.current.h);
    circles.current.forEach((c) => {
      c.x += c.dx;
      c.y += c.dy;
      c.alpha = Math.min(c.targetAlpha, c.alpha + 0.02);
      drawCircle(c);
      if (
        c.x < -c.size ||
        c.x > size.current.w + c.size ||
        c.y < -c.size ||
        c.y > size.current.h + c.size
      ) {
        Object.assign(c, createCircle());
      }
    });
    raf.current = requestAnimationFrame(animate);
  };

  return (
    <div className={`pointer-events-none ${className}`} ref={containerRef}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

const Hero = () => {
  const { data: heroData, loading } = useHeroData();
  const [currentRole, setCurrentRole] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const defaultHero = {
    name: "Suriya Prakash",
    description:
      "Passionate about building immersive digital experiences using modern technologies. Always learning, always creating.",
    roles: ["Full Stack Developer", "Tech Enthusiast", "Problem Solver"],
    avatar: "",
    animatedAvatar: "",
    cvUrl: "",
    cvName: ""
  };

  const data = heroData || defaultHero;
  const roles = data.roles || defaultHero.roles;

  useEffect(() => {
    const role = roles[currentRole];
    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < role.length) {
          setText(role.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (text.length > 0) {
          setText(role.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, deleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [text, deleting, currentRole, roles]);

  const handleViewCV = () => {
    if (data.cvUrl) {
      // Open CV in a new tab
      window.open(data.cvUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-gray-300">Loading...</div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-950 relative overflow-hidden text-white"
    >
      {/* Dark Particles */}
      <Particles className="absolute inset-0" />

      {/* Glowing gradient blobs */}
      <motion.div
        className="absolute top-1/3 -left-20 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 -right-20 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl"
        animate={{ scale: [1.1, 0.9, 1.1], opacity: [0.6, 0.4, 0.6] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 text-5xl font-bold leading-tight tracking-tight md:text-6xl"
          >
            <span className="inline-flex items-baseline gap-3 whitespace-nowrap">
              <span className="text-slate-200">Hi, I'm</span>
              <motion.span
                className="bg-gradient-to-r from-sky-300 via-indigo-200 to-pink-300 bg-clip-text text-transparent"
                animate={{
                  filter: [
                    'drop-shadow(0 0 0 rgba(125,211,252,0))',
                    'drop-shadow(0 0 14px rgba(56,189,248,0.55))',
                    'drop-shadow(0 0 10px rgba(236,72,153,0.45))',
                    'drop-shadow(0 0 0 rgba(125,211,252,0))'
                  ]
                }}
                transition={{ duration: 2.6, repeat: Infinity, repeatType: 'mirror' }}
              >
                {data.name}
              </motion.span>
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl md:text-2xl font-medium text-blue-300 mb-6"
          >
            {text}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-purple-400"
            >
              |
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 mb-8 max-w-2xl leading-relaxed"
          >
            {data.description}
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px rgba(147, 51, 234, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 justify-center"
            >
              <FiExternalLink className="w-5 h-5" />
              View My Work
            </motion.button>

            {data.cvUrl && (
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(239, 68, 68, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewCV}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 justify-center"
              >
                <FiFile className="w-5 h-5" />
                View CV
              </motion.button>
            )}
          </motion.div>
        </div>

        {/* Hero Avatar */}
        <HeroAvatar data={data} isHovering={isHovering} setIsHovering={setIsHovering} />
      </div>
    </section>
  );
};

export default Hero;