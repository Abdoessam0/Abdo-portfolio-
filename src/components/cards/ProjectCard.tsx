"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type ProjectCardProps = {
  imageUrl?: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
};

export default function ProjectCard({ imageUrl = "/next.svg", title, description, tech, liveUrl, repoUrl }: ProjectCardProps) {
  return (
    <motion.article whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="rounded-xl bg-bg/60 backdrop-blur-xs shadow-glass ring-1 ring-white/5 overflow-hidden">
      <div className="aspect-video relative">
        <Image src={imageUrl} alt="project image" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-text">{title}</h3>
        <p className="mt-1 text-text/80 text-sm">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tech.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-md bg-text/10 text-text/90">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
              Live
            </a>
          )}
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
              Repo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}


