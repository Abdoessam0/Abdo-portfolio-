import Link from "next/link";
import { PROFILE } from "@/data/profile";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div>
          <p className="font-semibold text-zinc-900">
            (c) {year} {PROFILE.person.name}
          </p>
          <p>{PROFILE.person.availability}</p>
          <p>{PROFILE.person.timezone}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 font-semibold text-zinc-800">
          <Link href={PROFILE.links.github} target="_blank" rel="noreferrer" className="hover:text-zinc-500">
            GitHub
          </Link>
          <Link href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-zinc-500">
            LinkedIn
          </Link>
          <a href={`tel:${PROFILE.person.phone.replace(/\s+/g, "")}`} className="hover:text-zinc-500">
            Call
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
