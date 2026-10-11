"use client";

import { useCallback, useState } from "react";
import { ArtworkLightbox } from "@/components/ArtworkLightbox";
import { EditorialCaseStudy, type CaseArtwork } from "@/components/EditorialCaseStudy";

const ASSET = "/projects/mock-and-proper-brand-identity";

const BRIEF = [
  {
    label: "CHALLENGE",
    copy: "Create a professional brand identity that feels cohesive, memorable, and adaptable across digital and print applications.",
  },
  {
    label: "MISSION",
    copy: "Develop a timeless visual identity through thoughtful typography, a versatile logo system, and consistent brand elements that communicate Mock & Proper's personality.",
  },
  {
    label: "SOLUTION",
    copy: "Designed a complete branding system featuring the primary logo, secondary marks, color palette, typography, and branded mockups. Developed campaign materials that demonstrate the identity across lifestyle imagery and promotional applications.",
  },
  {
    label: "REFLECTION",
    copy: "This project strengthened my understanding of brand systems and reinforced the importance of consistency, scalability, and purposeful design when creating an identity that can grow with a business.",
  },
] as const;

const LOGO: CaseArtwork = {
  src: `${ASSET}/mock-and-proper-logo.png`,
  alt: "Mock & Proper logo with Impeccably Improper tagline on a warm gradient",
  width: 4295,
  height: 4168,
  caption: "Exploring the primary brand identity.",
};

const CAMPAIGN: CaseArtwork[] = [
  {
    src: `${ASSET}/campaign-01.png`,
    alt: "Mock & Proper campaign poster: Not just a wine. A better decision",
    width: 4504,
    height: 5628,
  },
  {
    src: `${ASSET}/campaign-02.png`,
    alt: "Mock & Proper campaign poster: Made for moments that matter",
    width: 4500,
    height: 5628,
  },
  {
    src: `${ASSET}/campaign-03.png`,
    alt: "Mock & Proper campaign poster with Impeccably Improper wordmark",
    width: 4504,
    height: 5624,
  },
  {
    src: `${ASSET}/campaign-04.png`,
    alt: "Mock & Proper campaign poster: Better together Always",
    width: 4500,
    height: 5624,
  },
];

const LIGHTBOX_PAGES: CaseArtwork[] = [LOGO, ...CAMPAIGN];

export function MockAndProperCaseStudy() {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  const openPage = useCallback((studyId: string, index: number) => {
    setViewerIndex(studyId === "study-campaign" ? index + 1 : index);
  }, []);

  const closeViewer = useCallback(() => {
    setViewerIndex(null);
  }, []);

  return (
    <>
      <EditorialCaseStudy
        brief={BRIEF}
        onStudyArtworkSelect={openPage}
        blocks={[
          {
            type: "study",
            id: "study-identity",
            heading: "06 / MOCK & PROPER",
            items: [LOGO],
          },
          {
            type: "gallery",
            id: "study-campaign",
            items: CAMPAIGN,
            caption: "Lifestyle-inspired advertising campaign.",
          },
        ]}
      />
      {viewerIndex != null ? (
        <ArtworkLightbox
          collectionLabel="MOCK & PROPER — BRAND IDENTITY"
          studyHeading="06 / MOCK & PROPER"
          items={LIGHTBOX_PAGES}
          startIndex={viewerIndex}
          onClose={closeViewer}
        />
      ) : null}
    </>
  );
}
