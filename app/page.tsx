"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { ProjectCard } from "@/components/project-card"
import { TechCannonBlast } from "@/components/tech-globe"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

const projects = [
  {
    title: "Calendar App",
    description: "A modern, feature-rich calendar application built with Next.js 14, TypeScript, and Prisma.",
    link: "https://calendar-app-ochre-xi.vercel.app/",
    tags: ["Next.js", "TypeScript", "Prisma"],
    image: "/calendar-app.jpg"
  },
  {
    title: "Real-Time Chat Application",
    description: "A feature-rich real-time chat application built with Django, Channels, and modern frontend technologies.",
    link: "https://github.com/pswitchy/ChatApp",
    tags: ["Django", "Channels", "WebSocket"],
    image: "/chat-app.jpg"
  },
  {
    title: "Mentorship Matching App",
    description: "A full-stack Mentorship Matching Platform built with Next.js 14, Prisma, NextAuth, Pusher, and Cloudinary.",
    link: "https://mentorship-matching-platform-zeta.vercel.app/",
    tags: ["Next.js", "Prisma", "NextAuth"],
    image: "/mentorship-app.jpg"
  },
  {
    title: "File Encryptor",
    description: "A command-line tool to encrypt and decrypt files using AES-256-GCM with best practices for key derivation and authenticated encryption.",
    link: "https://github.com/pswitchy/File-Encryptor",
    tags: ["Rust", "Cryptography", "CLI"],
    image: "/encryptor.jpg"
  },
  {
    title: "Url Shortener",
    description: "A modern and vibrant URL shortening service built with Next.js, TypeScript, and Tailwind CSS.",
    link: "https://url-shortener-hazel-three.vercel.app/",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    image: "/url-shortener.jpg"
  },
]

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Python", "Django", "Express", "Rust"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "MySQL"] },
  { category: "DevOps", items: ["Docker", "AWS", "CI/CD", "Git"] },
]

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      const sections = ["about", "skills", "projects"]
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top >= 0 && rect.top <= window.innerHeight / 2
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50 py-4">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            PS
          </motion.div>
          <div className="flex gap-6">
            {["About", "Skills", "Projects"].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className={`text-sm ${
                  activeSection === item.toLowerCase() 
                    ? "text-blue-400" 
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => {
                  document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-24">
        {/* Profile Header */}
        <section id="about" className="min-h-screen flex items-center">
          <div className="w-full">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-48 h-48 mx-auto mb-8"
            >
              <Image
                src="/image.png"
                alt="Profile"
                fill
                className="rounded-full object-cover border-4 border-blue-400 shadow-lg shadow-blue-500/20"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Parth Sharma
              </h1>
              <p className="text-2xl text-blue-300 mb-8">
                Software Engineer | B.Tech CSE | Full Stack Developer
              </p>
              <p className="max-w-2xl mx-auto text-gray-300 mb-8 leading-relaxed">
                Passionate about building scalable web applications and exploring new technologies. 
                Specialized in full-stack development with expertise in React, Node.js, and cloud technologies.
              </p>
              
                <div className="flex justify-center gap-6">
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <Link href="/resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <Link href="mailto:parsharma89@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Me
                  </Link>
                </Button>
                </div>

              <div className="flex justify-center gap-4 mt-8">
                <Button variant="outline" size="icon" asChild className="rounded-full bg-gray-800 hover:bg-gray-700">
                  <Link href="https://github.com/pswitchy">
                    <Github className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full bg-gray-800 hover:bg-gray-700">
                  <Link href="https://linkedin.com/in/parth-sharma-52248b1ab/">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild className="rounded-full bg-gray-800 hover:bg-gray-700">
                  <Link href="mailto:parsharma89@gmail.com">
                    <Mail className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen py-20">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 text-center"
          >
            Skills & Technologies
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {skills.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-sm border-none">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">
                    {category.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-blue-500 bg-opacity-20 rounded-full text-sm text-blue-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {mounted && (
            <div className="relative h-[600px] mb-16">
              <TechCannonBlast />
            </div>
          )}
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 text-center"
          >
            Featured Projects
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group relative overflow-hidden bg-gray-800 bg-opacity-50 backdrop-blur-sm border-none">
                  <div className="relative h-48">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link
                        href={project.link}
                        className="text-white flex items-center gap-2"
                      >
                        <ExternalLink className="w-6 h-6" />
                        View Project
                      </Link>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-blue-400">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-500 bg-opacity-20 rounded-full text-xs text-blue-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 bg-opacity-50 backdrop-blur-sm py-8 mt-20">
        <div className="max-w-5xl mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Parth Sharma. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}