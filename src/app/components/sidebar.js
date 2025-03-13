'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Briefcase, ScanLine } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div
      className="fixed right-0 top-1/4 bg-black/60 border-t-2 border-l-2 border-b-2 border-green-500 backdrop-blur-md rounded-l-2xl flex flex-col items-center py-4 space-y-4 text-green-500 z-50 shadow-lg"
      initial={{ width: isMobile ? 30 : 100 }}
      animate={{
        width: expanded
          ? isMobile
            ? "calc(100% - 2rem)" // Restar el padding de la galería (2rem)
            : "150px"               // 150px en pantallas más grandes
          : isMobile
          ? "calc(12px + 1rem)" // Mínimo en móvil ajustado con el padding
          : "calc(50px + 2rem)" // Mínimo en pantallas grandes ajustado con el padding
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onTouchStart={() => setExpanded(true)}
    >
      <Link href="/prints" target="_blank">
        <SidebarItem icon={<ScanLine size={24} />} text="Scan" expanded={expanded} />
      </Link>

    </motion.div>
  );
}

function SidebarItem({ icon, text, expanded }) {
  return (
    <motion.div
      className="flex items-center justify-center space-x-2 cursor-pointer px-2 py-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: expanded ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {icon}
      {expanded && <span className="text-sm">{text}</span>}
    </motion.div>
  );
}
