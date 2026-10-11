export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  slug: string;
  summary: string;
  overview: string;
  role: string;
  disciplines: string[];
  image: string;
  gallery: string[];
  /** Homepage HUD preview. Omit when no real project artwork is available yet. */
  preview?: string;
  /** Pixel window of the source image to show in the homepage preview. */
  previewCrop?: {
    x: number;
    y: number;
    w: number;
    h: number;
    imageWidth: number;
    imageHeight: number;
  };
  /** Optional full-screen menu background for this project. Falls back to assets.menuBackground. */
  stageImage?: string;
};

export const projects: Project[] = [
  {
    id: "zero-to-design-booklet",
    number: "01",
    title: "ZERO TO DESIGN BOOKLET",
    category: "Graphic Design",
    year: "EDITORIAL DESIGN",
    slug: "zero-to-design-booklet",
    summary:
      "An exploration of graphic design fundamentals through typography, composition, visual hierarchy, and editorial layout.",
    overview: "Replace this placeholder copy with the project overview.",
    role: "TBD",
    disciplines: ["TBD"],
    image: "/projects/zero-to-design.svg",
    preview: "/projects/zero-to-design/page-02.png",
    gallery: [
      "/projects/zero-to-design.svg",
      "/projects/zero-to-design-02.svg",
    ],
  },
  {
    id: "global-warming-brochure",
    number: "02",
    title: "GLOBAL WARMING BROCHURE",
    category: "Awareness Campaign / Editorial Design / Print Design",
    year: "TBD",
    slug: "global-warming-brochure",
    summary:
      "An awareness brochure on melting polar ice caps, combining climate imagery, typography, and print to communicate the urgency of climate change.",
    overview:
      "Designed a multi-page brochure using climate-focused imagery, bold typography, and a cohesive visual system to communicate the consequences of melting polar ice.",
    role: "Designer",
    disciplines: ["Awareness Campaign", "Editorial Design", "Print Design"],
    image: "/projects/night-city.svg",
    preview: "/projects/global-warming/page-01.png",
    previewCrop: {
      x: 752,
      y: 124,
      w: 3425,
      h: 2917,
      imageWidth: 4896,
      imageHeight: 3168,
    },
    gallery: ["/projects/night-city.svg", "/projects/night-city-02.svg"],
  },
  {
    id: "act-for-tomorrow-poster-series",
    number: "03",
    title: "ACT FOR TOMORROW — POSTER SERIES",
    category: "Graphic Design / Poster Design / Environmental Awareness",
    year: "TBD",
    slug: "act-for-tomorrow-poster-series",
    summary:
      "An environmental awareness poster series using visual metaphors to make the consequences of climate change accessible, memorable, and urgent.",
    overview:
      "A cohesive environmental awareness campaign that uses imaginative visual metaphors, illustration, and typography to highlight the consequences of global warming and encourage viewers to take action.",
    role: "Graphic Designer",
    disciplines: ["Graphic Design", "Poster Design", "Environmental Awareness"],
    image: "/projects/climate.svg",
    preview: "/projects/climate-change/page-01.png",
    previewCrop: {
      x: 421,
      y: 542,
      w: 848,
      h: 1207,
      imageWidth: 3601,
      imageHeight: 2330,
    },
    gallery: ["/projects/climate.svg", "/projects/climate-02.svg"],
  },
  {
    id: "the-melting-point-sculpture-concept",
    number: "04",
    title: "THE MELTING POINT — SCULPTURE CONCEPT",
    category: "3D Design / Public Art Installation / Environmental Awareness",
    year: "TBD",
    slug: "the-melting-point-sculpture-concept",
    summary:
      "A conceptual outdoor sculpture that turns Earth into a melting scoop of ice cream, making the urgency of global warming tangible in a public park.",
    overview:
      "The Melting Point is a conceptual 3D public sculpture for an outdoor park, using a monumental melting ice cream form to spark climate awareness.",
    role: "Designer",
    disciplines: ["3D Design", "Public Art Installation", "Environmental Awareness"],
    image: "/projects/melting-earth-sculpture/page-01.png",
    preview: "/projects/the-melting-point-sculpture/the-melting-point-preview.png",
    gallery: [
      "/projects/melting-earth-sculpture/page-01.png",
      "/projects/melting-earth-sculpture/page-05.png",
    ],
  },
  {
    id: "fundamentals-of-graphic-visualization",
    number: "05",
    title: "FUNDAMENTALS OF GRAPHIC VISUALIZATION",
    category: "Graphic Design / Visual Studies / Composition",
    year: "TBD",
    slug: "fundamentals-of-graphic-visualization",
    summary:
      "A collection of visual studies exploring how color, composition, hierarchy, typography, and imagery shape clear visual communication, including AI-assisted experimentation.",
    overview:
      "Developed a body of visual studies that examine color systems, composition, typography, imagery, and AI-assisted workflows while keeping original decision-making at the center of the work.",
    role: "Designer",
    disciplines: ["Graphic Design", "Visual Studies", "Typography"],
    image: "/projects/fundamentals-of-graphic-visualization/page-45.png",
    preview: "/projects/fundamentals-of-graphic-visualization/page-45.png",
    gallery: [
      "/projects/fundamentals-of-graphic-visualization/page-45.png",
      "/projects/fundamentals-of-graphic-visualization/page-63.png",
    ],
  },
  {
    id: "mock-and-proper-brand",
    number: "06",
    title: "MOCK & PROPER — BRAND IDENTITY",
    category: "Branding / Visual Identity / Campaign Design",
    year: "GRAPHIC DESIGN",
    slug: "mock-and-proper-brand-identity",
    summary:
      "A cohesive beverage brand identity combining expressive typography, warm colors, and lifestyle-driven campaign visuals.",
    overview:
      "Designed a complete branding system featuring the primary logo, secondary marks, color palette, typography, and campaign materials that carry Mock & Proper across lifestyle imagery and promotional applications.",
    role: "Designer",
    disciplines: ["Branding", "Visual Identity", "Campaign Design"],
    image: "/projects/mock-and-proper-brand-identity/mock-and-proper-logo.png",
    preview: "/projects/mock-and-proper-brand-identity/mock-and-proper-logo.png",
    gallery: [
      "/projects/mock-and-proper-brand-identity/mock-and-proper-logo.png",
      "/projects/mock-and-proper-brand-identity/mock-and-proper-brand-identity.png",
    ],
  },
  {
    id: "pure-lief-brand",
    number: "07",
    title: "PURE LIEF BRAND",
    category: "Brand Identity / Character Design",
    year: "GRAPHIC DESIGN",
    slug: "pure-lief-brand",
    summary:
      "Brand identity combining a client's four cats and passion for fitness through warrior-inspired character design, bold typography, and apparel applications.",
    overview:
      "PURE LIEF is a personal brand identity created for a client whose lifestyle centers around two things: his four cats and his passion for the gym. The project combines those ideas through a bold character-driven identity that expands into apparel, merchandise, and digital applications.",
    role: "Graphic Designer",
    disciplines: ["Brand Identity", "Character Design", "Apparel"],
    image: "/projects/pure-lief.svg",
    preview: "/projects/pure-lief/page-01.png",
    gallery: ["/projects/pure-lief.svg", "/projects/pure-lief-02.svg"],
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectIndex(id: string) {
  return projects.findIndex((project) => project.id === id);
}
