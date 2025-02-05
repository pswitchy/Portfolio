// components/project-card.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  link: string
}

export function ProjectCard({ title, description, link }: ProjectCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="transition-all duration-300 bg-gray-800/50 hover:shadow-lg hover:scale-105 backdrop-blur-sm border border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription className="text-gray-300">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-300">
            <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
              View Project <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

