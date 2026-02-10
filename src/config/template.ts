import type { Template } from "../types/template";

export const configTemplates: Template[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    description:
      "A hero section with a large heading, paragraph, and image in a centered single-column layout.",
    layout: "single-column",
    pageSettings: {
      backgroundColor: "#ffffff",
      contentWidth: 900,
    },
    elements: [
      {
        id: "heading-1",
        type: "heading",
        text: "Welcome to Our Product",
        fontSize: 48,
        color: "#1a1a2e",
        alignment: "center",
      },
      {
        id: "paragraph-1",
        type: "paragraph",
        text: "We build beautiful experiences that delight users and drive results. Get started today and see the difference.",
        fontSize: 18,
        color: "#444444",
        alignment: "center",
      },
      {
        id: "image-1",
        type: "image",
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
        alt: "Hero image",
        width: 100,
        alignment: "center",
      },
    ],
  },
  {
    id: "portfolio-card",
    name: "Portfolio Card",
    description:
      "A two-column card layout with an image on one side and text on the other.",
    layout: "two-column",
    pageSettings: {
      backgroundColor: "#f0f4f8",
      contentWidth: 1000,
    },
    elements: [
      {
        id: "image-1",
        type: "image",
        src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80",
        alt: "Portfolio image",
        width: 100,
        alignment: "center",
      },
      {
        id: "heading-1",
        type: "heading",
        text: "Jane Doe — Designer",
        fontSize: 36,
        color: "#2d3436",
        alignment: "left",
      },
      {
        id: "paragraph-1",
        type: "paragraph",
        text: "Creative designer with 10 years of experience crafting digital products, brand identities, and immersive web experiences for clients worldwide.",
        fontSize: 16,
        color: "#636e72",
        alignment: "left",
      },
    ],
  },
];
