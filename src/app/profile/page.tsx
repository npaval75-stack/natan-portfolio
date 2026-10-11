import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ProfileLogoAtmosphere } from "@/components/ProfileLogoAtmosphere";

export const metadata: Metadata = {
  title: "Natanael Paval — Profile",
  description:
    "Profile of Natanael Paval, multidisciplinary designer.",
};

export default function ProfilePage() {
  return (
    <article className="profile-page relative z-10 min-h-dvh">
      <ProfileLogoAtmosphere />

      <div className="profile-copy relative z-10 px-8 py-12 md:px-12 lg:px-14">
        <Link
          href="/"
          className="hud-label text-[0.62rem] transition-colors duration-200"
        >
          ← RETURN TO MENU
        </Link>

        <p className="hud-label mt-14">DESIGNER // PROFILE</p>
        <h1 className="font-display mt-3 text-4xl tracking-[0.14em] text-white md:text-5xl">
          NATAN PAVAL
        </h1>
        <p className="interface-label mt-3 font-display text-sm tracking-[0.2em]">
          MULTIDISCIPLINARY DESIGNER
        </p>

        <p className="mt-8 max-w-lg text-sm leading-relaxed text-white/55">
          My name is Natan Paval, and I’m a multidisciplinary designer working
          across branding, digital design, interactive visuals, and visual
          storytelling. I enjoy turning ideas into thoughtful visual experiences
          through strong concepts, clean execution, and attention to detail.
        </p>

        <ContactForm />
      </div>
    </article>
  );
}
