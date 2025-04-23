'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScanLine, ShoppingCart, SwatchBook } from "lucide-react";
import { HiOutlineCamera } from "react-icons/hi";
import Link from "next/link";

export default function Sidebar({ onCameraToggle }) {
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (expanded && !event.target.closest(".sidebar")) {
        setExpanded(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [expanded]);

  const handleIconClick = () => {
    onCameraToggle(); 
  };

  return (
    <motion.div
      className="fixed right-0 top-1/4 bg-black/60 border backdrop-blur-md rounded-l-2xl flex flex-col items-center py-4 space-y-4 text-white z-50 shadow-lg sidebar"
      animate={{ width: expanded ? (isMobile ? "calc(100% - 2rem)" : "150px") : "30px" }}
      transition={{ duration: 0.3 }}
      onClick={(e) => {
        e.stopPropagation();
        setExpanded(!expanded);
      }}
      onMouseEnter={() => !isMobile && setExpanded(true)}
      onMouseLeave={() => !isMobile && setExpanded(false)}
    >
      <SidebarItem icon={<ScanLine size={20} />} text="Scan" expanded={expanded} link="/prints" />
      <SidebarItem icon={<HiOutlineCamera size={20} />} text="Mod" expanded={expanded} onClick={handleIconClick}/>
      <SidebarItem icon={<SwatchBook size={20} />} text="Flyer" expanded={expanded} link="/flyer_services"/>
    </motion.div>
  );
}

function SidebarItem({ icon, text, expanded, link, onClick }) {
  const content = (
    <motion.div 
      className={`flex items-center space-x-2 cursor-pointer px-2 py-1 ${expanded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      animate={{ opacity: expanded ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClick} // <--- esto faltaba
    >
      {icon}
      {expanded && <span className="text-sm">{text}</span>}
    </motion.div>
  );

  return link
    ? <Link href={link} onClick={(e) => !expanded && e.preventDefault()}>{content}</Link>
    : content;
}

