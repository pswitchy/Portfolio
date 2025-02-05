import { useEffect, useRef, useState } from "react";
import { TechIcon } from "./tech-icons";
import { motion, useAnimation } from "framer-motion";

interface TechData {
  name: string;
  color: string;
  id: string;
  orbitSpeed: number;
  orbitDirection: number;
  orbitPlane: number;
}

const techStack: TechData[] = [
  { name: "React", color: "#61DAFB", id: "react", orbitSpeed: 0.8, orbitDirection: 1, orbitPlane: 0 },
  { name: "Node.js", color: "#339933", id: "node", orbitSpeed: 0.6, orbitDirection: -1, orbitPlane: Math.PI / 8 },
  { name: "Python", color: "#3776AB", id: "python", orbitSpeed: 0.9, orbitDirection: 1, orbitPlane: Math.PI / 4 },
  { name: "JavaScript", color: "#F7DF1E", id: "js", orbitSpeed: 0.7, orbitDirection: -1, orbitPlane: Math.PI / 3 },
  { name: "TypeScript", color: "#3178C6", id: "ts", orbitSpeed: 0.85, orbitDirection: 1, orbitPlane: Math.PI / 2 },
  { name: "MongoDB", color: "#47A248", id: "mongo", orbitSpeed: 1.0, orbitDirection: -1, orbitPlane: 2 * Math.PI / 5 },
  { name: "Docker", color: "#2496ED", id: "docker", orbitSpeed: 0.5, orbitDirection: 1, orbitPlane: 3 * Math.PI / 4 },
  { name: "Git", color: "#F05032", id: "git", orbitSpeed: 1.1, orbitDirection: -1, orbitPlane: 5 * Math.PI / 7 },
  { name: "Next.js", color: "#000000", id: "next", orbitSpeed: 0.45, orbitDirection: 1, orbitPlane: Math.PI },
  { name: "GraphQL", color: "#E535AB", id: "graphql", orbitSpeed: 1.2, orbitDirection: -1, orbitPlane: 8 * Math.PI / 9 },
  { name: "AWS", color: "#FF9900", id: "aws", orbitSpeed: 0.4, orbitDirection: 1, orbitPlane: 4 * Math.PI / 3 },
  { name: "Kubernetes", color: "#326CE5", id: "k8s", orbitSpeed: 0.95, orbitDirection: -1, orbitPlane: 3 * Math.PI / 2 },
  { name: "Redis", color: "#DC382D", id: "redis", orbitSpeed: 0.75, orbitDirection: 1, orbitPlane: 5 * Math.PI / 3 },
  { name: "Vue.js", color: "#4FC08D", id: "vue", orbitSpeed: 1.05, orbitDirection: -1, orbitPlane: 11 * Math.PI / 7 },
  { name: "Angular", color: "#DD0031", id: "angular", orbitSpeed: 0.65, orbitDirection: 1, orbitPlane: 2 * Math.PI },
  { name: "Rust", color: "#000000", id: "rust", orbitSpeed: 0.88, orbitDirection: -1, orbitPlane: Math.PI / 5 },
  { name: "Firebase", color: "#FFCA28", id: "firebase", orbitSpeed: 0.55, orbitDirection: 1, orbitPlane: 7 * Math.PI / 8 },
  { name: "PostgreSQL", color: "#336791", id: "postgres", orbitSpeed: 0.92, orbitDirection: -1, orbitPlane: 13 * Math.PI / 9 },
  { name: "NestJS", color: "#E0234E", id: "nestjs", orbitSpeed: 0.78, orbitDirection: 1, orbitPlane: 17 * Math.PI / 10 },
  { name: "Gatsby", color: "#663399", id: "gatsby", orbitSpeed: 0.62, orbitDirection: -1, orbitPlane: 19 * Math.PI / 11 },
  { name: "Webpack", color: "#8DD6F9", id: "webpack", orbitSpeed: 0.82, orbitDirection: 1, orbitPlane: 23 * Math.PI / 12 },
  { name: "Svelte", color: "#FF3E00", id: "svelte", orbitSpeed: 0.98, orbitDirection: -1, orbitPlane: 14 * Math.PI / 8 },
  { name: "Tailwind CSS", color: "#06B6D4", id: "tailwind", orbitSpeed: 0.72, orbitDirection: 1, orbitPlane: 25 * Math.PI / 13 },
  { name: "Material UI", color: "#0081CB", id: "mui", orbitSpeed: 0.86, orbitDirection: -1, orbitPlane: 29 * Math.PI / 14 },
  { name: "Redux", color: "#764ABC", id: "redux", orbitSpeed: 0.68, orbitDirection: 1, orbitPlane: 31 * Math.PI / 15 },
  { name: "Jest", color: "#C21325", id: "jest", orbitSpeed: 0.94, orbitDirection: -1, orbitPlane: 35 * Math.PI / 16 },
  { name: "C#", color: "#178600", id: "csharp", orbitSpeed: 0.7, orbitDirection: 1, orbitPlane: Math.PI / 12 },
  { name: "Java", color: "#007396", id: "java", orbitSpeed: 0.8, orbitDirection: -1, orbitPlane: 2 * Math.PI / 7 },
  { name: "PHP", color: "#777BB4", id: "php", orbitSpeed: 0.6, orbitDirection: 1, orbitPlane: 9 * Math.PI / 13 },
  { name: "Swift", color: "#F05138", id: "swift", orbitSpeed: 0.9, orbitDirection: -1, orbitPlane: 15 * Math.PI / 8 },
  { name: "Go", color: "#00ADD8", id: "go", orbitSpeed: 0.5, orbitDirection: 1, orbitPlane: 21 * Math.PI / 11 },
  { name: "Kotlin", color: "#A97BFF", id: "kotlin", orbitSpeed: 0.85, orbitDirection: -1, orbitPlane: 27 * Math.PI / 14 },
  { name: "Flutter", color: "#02569B", id: "flutter", orbitSpeed: 0.75, orbitDirection: 1, orbitPlane: 33 * Math.PI / 17 },
  { name: "React Native", color: "#61DAFB", id: "reactnative", orbitSpeed: 0.95, orbitDirection: -1, orbitPlane: 37 * Math.PI / 19 },
  { name: "Unity", color: "#222C37", id: "unity", orbitSpeed: 0.65, orbitDirection: 1, orbitPlane: 41 * Math.PI / 20 },
  { name: "Unreal Engine", color: "#0CAFFF", id: "unreal", orbitSpeed: 0.88, orbitDirection: -1, orbitPlane: 43 * Math.PI / 21 },
];

export function TechGlobe() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [baseSpeed, setBaseSpeed] = useState(0.0002);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const gridControls = useAnimation();
  const gridYControls = useAnimation();

  useEffect(() => {
    setBaseSpeed(isHovered ? 0.001 : 0.0002);
  }, [isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && sphereRef.current) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setRotation((prev) => ({
        x: prev.x + deltaY * 0.15,
        y: prev.y + deltaX * 0.15,
      }));

      setDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    gridControls.start({ rotateZ: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } });
    gridYControls.start({ rotateY: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } });
  };

  const handleMouseEnter = () => {
    gridControls.start({ rotateZ: 360, transition: { duration: 10, repeat: Infinity, ease: "linear" } });
    gridYControls.start({ rotateY: -360, transition: { duration: 10, repeat: Infinity, ease: "linear" } });
  };

  const calculateIconPositions = (time: number) => {
    const radius = 180;
    const positions = techStack.map((tech) => {
      const angle = time * baseSpeed * tech.orbitSpeed * tech.orbitDirection;
      const rotationMatrix = [
        [Math.cos(tech.orbitPlane), 0, Math.sin(tech.orbitPlane)],
        [0, 1, 0],
        [-Math.sin(tech.orbitPlane), 0, Math.cos(tech.orbitPlane)],
      ];

      const baseX = Math.cos(angle) * radius;
      const baseY = Math.sin(angle) * radius;
      const baseZ = 0;

      let x = rotationMatrix[0][0] * baseX + rotationMatrix[0][1] * baseY + rotationMatrix[0][2] * baseZ;
      let y = rotationMatrix[1][0] * baseX + rotationMatrix[1][1] * baseY + rotationMatrix[1][2] * baseZ;
      let z = rotationMatrix[2][0] * baseX + rotationMatrix[2][1] * baseY + rotationMatrix[2][2] * baseZ;

      const radX = rotation.x * Math.PI / 180;
      const radY = rotation.y * Math.PI / 180;

      const rotatedX = x * Math.cos(radY) - z * Math.sin(radY);
      const rotatedZ = x * Math.sin(radY) + z * Math.cos(radY);
      const finalY = y * Math.cos(radX) + rotatedZ * Math.sin(radX);
      const finalZ = -y * Math.sin(radX) + rotatedZ * Math.cos(radX);

      return { x: rotatedX, y: finalY, z: finalZ, tech };
    });

    return positions.sort((a, b) => b.z - a.z);
  };

  useEffect(() => {
    let startTime = Date.now();

    const animate = () => {
      const positions = calculateIconPositions(Date.now() - startTime);
      positions.forEach((pos) => {
        const element = document.getElementById(`tech-${pos.tech.id}`);
        if (element) {
          const scale = Math.max(0.4, (pos.z + 180) / 360);
          const opacity = Math.max(0.3, (pos.z + 180) / 360);

          element.style.transform = `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px) scale(${scale})`;
          element.style.opacity = opacity.toString();
          element.style.zIndex = Math.round(pos.z).toString();
        }
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [baseSpeed, rotation]);

  return (
    <div
      className="w-full h-[80vh] flex items-center justify-center relative perspective-1000"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <div
        ref={sphereRef}
        className="relative w-[400px] h-[400px] transform-style-preserve-3d cursor-grab active:cursor-grabbing"
      >
        <motion.div
          className="absolute inset-0 rounded-full transform-style-preserve-3d"
          animate={gridControls}
          style={{ pointerEvents: 'none' }}
        >
          {/* Latitude Lines */}
          {Array.from({ length: 9 }).map((_, i) => { // Corrected length to 9 for 9 lines
            const fraction = i / 8; // Corrected fraction calculation for 9 lines
            return (
              <div
                key={`lat-${i}`}
                className="absolute w-full h-full rounded-full"
                style={{
                  borderTop: "2px solid rgba(100, 200, 255, 0.9)",
                  boxShadow: '0 0 5px rgba(100, 200, 255, 0.9)',
                  transform: `rotateX(${fraction * 180}deg)`,
                }}
              />
            );
          })}
          {/* Longitude Lines */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`long-${i}`}
              className="absolute w-full h-full rounded-full"
              animate={gridYControls}
              style={{
                borderLeft: "2px solid rgba(100, 200, 255, 0.9)",
                boxShadow: '0 0 5px rgba(100, 200, 255, 0.9)',
                transform: `rotateY(${(i / 12) * 360}deg)`,
              }}
            />
          ))}
        </motion.div>

        {techStack.map((tech) => (
          <div
            key={tech.id}
            id={`tech-${tech.id}`}
            className="absolute left-1/2 top-1/2 -ml-[32px] -mt-[32px] w-[64px] h-[64px] cursor-pointer"
            onMouseEnter={() => {
              setIsHovered(true);
              setActiveTech(tech.name);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
              setActiveTech(null);
            }}
          >
            <div className="relative flex items-center justify-center">
              <TechIcon
                name={tech.name}
                size={48}
                color={tech.color}
              />
              {activeTech === tech.name && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-gray-800/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                >
                  {tech.name}
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}