// components/tech-stack.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Zap, Check } from "lucide-react";
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiDocker,
  SiGit,
} from "react-icons/si";

interface TechItem {
  name: string;
  icon: React.ReactNode;
  xpReward: number;
}

const techStack: TechItem[] = [
  { name: "React", icon: <SiReact className="w-10 h-10" />, xpReward: 10 },
  { name: "Node.js", icon: <SiNodedotjs className="w-10 h-10" />, xpReward: 10 },
  { name: "Python", icon: <SiPython className="w-10 h-10" />, xpReward: 10 },
  { name: "JavaScript", icon: <SiJavascript className="w-10 h-10" />, xpReward: 10 },
  { name: "TypeScript", icon: <SiTypescript className="w-10 h-10" />, xpReward: 15 },
  { name: "MongoDB", icon: <SiMongodb className="w-10 h-10" />, xpReward: 10 },
  { name: "Docker", icon: <SiDocker className="w-10 h-10" />, xpReward: 15 },
  { name: "Git", icon: <SiGit className="w-10 h-10" />, xpReward: 10 },
];

interface TechStackProps {
  addXp: (amount: number) => void;
}

export function TechStack({ addXp }: TechStackProps) {
  const [unlockedTech, setUnlockedTech] = useState<string[]>([]);

  const handleUnlock = (tech: TechItem) => {
    if (!unlockedTech.includes(tech.name)) {
      addXp(tech.xpReward);
      setUnlockedTech([...unlockedTech, tech.name]);
      console.log(`Unlocked ${tech.name}, awarded ${tech.xpReward} XP`); // For debugging
    } else {
      console.log(`${tech.name} already unlocked`); // For debugging
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Button
            onClick={() => handleUnlock(tech)}
            disabled={unlockedTech.includes(tech.name)}
            className={`w-full h-32 relative ${
              unlockedTech.includes(tech.name)
                ? "bg-blue-600/20 border-2 border-blue-400 cursor-default" // Removed hover effect and cursor for unlocked
                : "bg-gray-800/50 border border-gray-600 hover:bg-blue-700/30 cursor-pointer" // Added cursor-pointer for unlocked
            } transition-all duration-300 rounded-xl flex flex-col items-center justify-center gap-2 overflow-hidden`} // Added overflow-hidden
          >
            <div className="text-4xl mb-2">{tech.icon}</div>
            <div className="font-semibold">{tech.name}</div>
            {!unlockedTech.includes(tech.name) && (
              <div className="text-xs flex items-center text-yellow-400">
                <Zap className="w-3 h-3 mr-1" /> {tech.xpReward} XP
              </div>
            )}
            {unlockedTech.includes(tech.name) && (
              <motion.div
                layout
                className="absolute inset-0 flex items-center justify-center bg-blue-600/30 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Check className="w-12 h-12 text-blue-400" />
              </motion.div>
            )}
          </Button>
        </motion.div>
      ))}
    </div>
  );
}

export { techStack };
// Export TechItem interface
export type { TechItem };