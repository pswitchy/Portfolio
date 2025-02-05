// components/tech-icons.tsx
import {
  SiReact,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiDocker,
  SiGit,
  SiNextdotjs,
  SiGraphql,
  SiAmazon,
  SiKubernetes,
  SiRedis,
  SiVuedotjs,
  SiAngular,
  SiRust,
  SiFirebase,
  SiPostgresql,
  SiNestjs,
  SiGatsby,
  SiWebpack,
  SiSvelte,
  SiTailwindcss,
  SiMaterialdesign, // Using Material Design icon for Material UI
  SiRedux,
  SiJest,
  SiSharp,
  SiPhp,
  SiSwift,
  SiGo,
  SiKotlin,
  SiFlutter,
  SiUnity,
  SiUnrealengine, // Added Unreal Engine Icon
} from "react-icons/si"

interface TechIconProps {
  name: string
  size?: number
  color?: string
}

export function TechIcon({ name, size = 24, color }: TechIconProps) {
  const iconProps = { size, color }

  switch (name) {
    case "React":
      return <SiReact {...iconProps} />
    case "Node.js":
      return <SiNodedotjs {...iconProps} />
    case "Python":
      return <SiPython {...iconProps} />
    case "JavaScript":
      return <SiJavascript {...iconProps} />
    case "TypeScript":
      return <SiTypescript {...iconProps} />
    case "MongoDB":
      return <SiMongodb {...iconProps} />
    case "Docker":
      return <SiDocker {...iconProps} />
    case "Git":
      return <SiGit {...iconProps} />
    case "Next.js":
      return <SiNextdotjs {...iconProps} />
    case "GraphQL":
      return <SiGraphql {...iconProps} />
    case "AWS":
      return <SiAmazon {...iconProps} />
    case "Kubernetes":
      return <SiKubernetes {...iconProps} />
    case "Redis":
      return <SiRedis {...iconProps} />
    case "Vue.js":
      return <SiVuedotjs {...iconProps} />
    case "Angular":
      return <SiAngular {...iconProps} />
    case "Rust":
      return <SiRust {...iconProps} />
    case "Firebase":
      return <SiFirebase {...iconProps} />
    case "PostgreSQL":
      return <SiPostgresql {...iconProps} />
    case "NestJS":
      return <SiNestjs {...iconProps} />
    case "Gatsby":
      return <SiGatsby {...iconProps} />
    case "Webpack":
      return <SiWebpack {...iconProps} />
    case "Svelte":
      return <SiSvelte {...iconProps} />
    case "Tailwind CSS":
      return <SiTailwindcss {...iconProps} />
    case "Material UI":
      return <SiMaterialdesign {...iconProps} /> // Material Design Icon
    case "Redux":
      return <SiRedux {...iconProps} />
    case "Jest":
      return <SiJest {...iconProps} />
    case "C#":
      return <SiSharp {...iconProps} />
    case "Java":
      return <SiPhp {...iconProps} />
    case "Swift":
      return <SiSwift {...iconProps} />
    case "Go":
      return <SiGo {...iconProps} />
    case "Kotlin":
      return <SiKotlin {...iconProps} />
    case "Flutter":
      return <SiFlutter {...iconProps} />
    case "React Native":
      return <SiReact {...iconProps} /> // Reusing React Icon for React Native
    case "Unity":
      return <SiUnity {...iconProps} />
    case "Unreal Engine":
      return <SiUnrealengine {...iconProps} />
    default:
      return null
  }
}