"use client";

import { useEffect, useRef } from "react";
import { EditorialCaseStudy } from "@/components/EditorialCaseStudy";

const ASSET = "/projects/nemesis";

const BRIEF = [
  {
    label: "CHALLENGE",
    copy: "NEMESIS needed a startup website that could explain a software firewall for shipped binaries — turning bytecode into readable source, then into a verdict a security team can act on. The site had to carry a dark, technical identity without burying the product story.",
  },
  {
    label: "MISSION",
    copy: "As web developer, build the marketing site from the product narrative: homepage, product pages, research and contact paths, and motion that matches the brand. The goal was a working prototype the client could present, not a generic template.",
  },
  {
    label: "SOLUTION",
    copy: "Developed a static HTML, CSS, and JavaScript site with canvas-based intro and finale motion, custom navigation, and product interfaces such as the decode view. Typography uses Gelasio, Inter, and JetBrains Mono. The live prototype is published at https://nemesis-prototype.vercel.app/",
  },
  {
    label: "REFLECTION",
    copy: "This client project connected front-end implementation with a dense technical story: sequencing the homepage, keeping the dark interface readable, and presenting decode and product pages as part of one visual system rather than disconnected screens.",
  },
] as const;

function IPhone18ProMax({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tryPlay = () => {
      if (reduced) {
        video.pause();
        return;
      }
      video.muted = true;
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || reduced) {
          video.pause();
          return;
        }
        tryPlay();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    video.addEventListener("canplay", tryPlay);

    return () => {
      observer.disconnect();
      video.removeEventListener("canplay", tryPlay);
    };
  }, [src]);

  return (
    <div className="nemesis-phone" aria-label="iPhone 18 Pro Max mockup">
      <div className="nemesis-phone-shell">
        <span className="nemesis-phone-btn nemesis-phone-btn-silent" aria-hidden />
        <span className="nemesis-phone-btn nemesis-phone-btn-vol-up" aria-hidden />
        <span className="nemesis-phone-btn nemesis-phone-btn-vol-down" aria-hidden />
        <span className="nemesis-phone-btn nemesis-phone-btn-power" aria-hidden />
        <div className="nemesis-phone-screen">
          <span className="nemesis-phone-island" aria-hidden />
          <video
            ref={videoRef}
            className="nemesis-phone-video"
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            width={860}
            height={1864}
            aria-label="NEMESIS app navigation on iPhone"
          />
        </div>
      </div>
    </div>
  );
}

export function NemesisCaseStudy() {
  return (
    <EditorialCaseStudy
      className="nemesis-case"
      brief={BRIEF}
      afterBlocks={
        <section className="ztd-showcase nemesis-app">
          <h2 className="ztd-brief-heading">APP VERSION</h2>
          <p className="nemesis-app-copy">
            Mobile layout of the same prototype, shown in an iPhone 18 Pro Max frame. The recording
            moves through Decode, Verdicts, Deliverables, Who, Research, and Contact.
          </p>
          <IPhone18ProMax src={`${ASSET}/app-nav.mp4`} poster={`${ASSET}/app-nav-poster.webp`} />
        </section>
      }
      blocks={[
        {
          type: "showcase",
          item: {
            src: `${ASSET}/showcase-2.webp`,
            alt: "NEMESIS intro with cascading code, logo, and concept direction for the dark interface",
            width: 4000,
            height: 2250,
            fetchPriority: "high",
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/showcase-3.webp`,
            alt: "Light and dark NEMESIS decode interfaces comparing the updated site experience",
            width: 4000,
            height: 2250,
            loading: "lazy",
          },
        },
        {
          type: "covers",
          items: [
            {
              src: `${ASSET}/how-it-works.webp`,
              alt: "NEMESIS How it works product page with environment diagram and deploy recommendation",
              width: 736,
              height: 858,
            },
            {
              src: `${ASSET}/binary-analysis.webp`,
              alt: "NEMESIS Binary analysis page showing Psalms decode of Protocols.dll",
              width: 736,
              height: 858,
            },
          ],
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/mobile-home.webp`,
            alt: "NEMESIS homepage on a mobile viewport with stacked hero, CTAs, and decode section",
            width: 736,
            height: 858,
            loading: "lazy",
            caption: "Mobile homepage",
          },
        },
        {
          type: "showcase",
          item: {
            src: `${ASSET}/showcase-4.webp`,
            alt: "Interactive NEMESIS 3D logo with floating code and parallax motion",
            width: 4000,
            height: 2250,
            loading: "lazy",
          },
        },
      ]}
    />
  );
}
