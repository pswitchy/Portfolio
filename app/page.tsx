// app/page.tsx
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { TechGlobe } from "@/components/tech-globe"
import { motion } from "framer-motion"

const projects = [
  {
    title: "Calendar App",
    description: "A modern, feature-rich calendar application built with Next.js 14, TypeScript, and Prisma.",
    link: "https://calendar-app-ochre-xi.vercel.app/",
  },
  {
    title: "Real-Time Chat Application",
    description: "A feature-rich real-time chat application built with Django, Channels, and modern frontend technologies.",
    link: "https://github.com/pswitchy/ChatApp",
  },
  {
    title: "Mentorship Matching App",
    description: "A full-stack Mentorship Matching Platform built with Next.js 14, Prisma, NextAuth, Pusher, and Cloudinary.",
    link: "https://mentorship-matching-platform-zeta.vercel.app/",
  },
  {
    title: "File Encryptor",
    description: "A command-line tool to encrypt and decrypt files using AES-256-GCM with best practices for key derivation and authenticated encryption.",
    link: "https://github.com/pswitchy/File-Encryptor",
  },
]

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-40 h-40 mx-auto mb-6"
          >
            <Image
              src="/image.png"
              alt="Profile"
              fill
              className="rounded-full object-cover border-4 border-blue-400"
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
          >
            Parth Sharma 
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-blue-300 mb-6"
          >
            Software Engineer | B.Tech CSE | Full Stack Developer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mt-4"
          >
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
          </motion.div>
        </header>

        {/* Tech Stack Globe */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 text-center"
          >
            Tech Stack
          </motion.h2>
          {mounted && <TechGlobe />}
        </section>

        {/* Projects Section */}
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
          >
            Projects
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

