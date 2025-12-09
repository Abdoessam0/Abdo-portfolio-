"use client";

import { motion } from "framer-motion";

// Simple tech stack without react-icons to avoid dependency issues
const techStack = [
    { name: "React", emoji: "⚛️", color: "#61DAFB" },
    { name: "Next.js", emoji: "▲", color: "#000000" },
    { name: "TypeScript", emoji: "TS", color: "#3178C6" },
    { name: "Tailwind CSS", emoji: "🎨", color: "#06B6D4" },
    { name: "Node.js", emoji: "🟢", color: "#339933" },
    { name: "Express", emoji: "⚡", color: "#000000" },
    { name: "Java", emoji: "☕", color: "#007396" },
    { name: "Spring Boot", emoji: "🌱", color: "#6DB33F" },
    { name: "PostgreSQL", emoji: "🐘", color: "#4169E1" },
    { name: "MongoDB", emoji: "🍃", color: "#47A248" },
    { name: "MySQL", emoji: "🐬", color: "#4479A1" },
    { name: "SQL Server", emoji: "🗄️", color: "#CC2927" },
    { name: "Supabase", emoji: "⚡", color: "#3ECF8E" },
    { name: "Vercel", emoji: "▲", color: "#000000" },
    { name: "Docker", emoji: "🐳", color: "#2496ED" },
    { name: "Git", emoji: "📦", color: "#F05032" },
    { name: "GitHub Actions", emoji: "⚙️", color: "#2088FF" },
];

export default function TechStackSection() {
    return (
        <section className="space-y-6">
            <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-muted">Tech Stack</p>
                <h2 className="text-3xl font-semibold text-ink">Technologies I work with</h2>
                <p className="text-muted">A compact overview of my core technology stack</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {techStack.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{
                            scale: 1.05,
                            rotateY: 5,
                            rotateX: 5,
                        }}
                        transition={{
                            delay: index * 0.03,
                            type: "spring",
                            stiffness: 300,
                            damping: 20
                        }}
                        viewport={{ once: true }}
                        className="group relative"
                    >
                        <div className="relative rounded-xl border border-outline bg-panel/80 p-4 flex flex-col items-center gap-2 transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_8px_32px_rgba(78,241,157,0.15)]">
                            <div className="text-2xl transition-all duration-300 group-hover:scale-110">
                                {tech.emoji}
                            </div>
                            <span className="text-xs font-medium text-ink/90">{tech.name}</span>

                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 rounded-xl border-2 border-transparent opacity-0 group-hover:opacity-100 group-hover:border-accent/30 transition-opacity duration-300" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}