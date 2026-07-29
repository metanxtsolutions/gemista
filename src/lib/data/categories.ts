import { Category } from "./types";

export const categories: Category[] = [
  {
    slug: "earrings",
    name: "Earrings",
    tagline: "Studs, hoops & drops for every day",
    art: { shape: "hoop", tone: "gold" },
    photo: "earringsModel",
    subcategories: [
      "Stud Earrings",
      "Hoops",
      "Drop Earrings",
      "Butterfly Earrings",
      "Pearl Earrings",
      "Crystal Earrings",
    ],
  },
  {
    slug: "necklaces",
    name: "Necklaces",
    tagline: "Pendants & layers that catch the light",
    art: { shape: "pendant", tone: "rose" },
    photo: "necklaceModel",
    subcategories: [
      "Pendant",
      "Chains",
      "Layered",
      "Butterfly",
      "Heart",
      "Crystal",
    ],
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    tagline: "Stack them, wear them daily",
    art: { shape: "bracelet", tone: "gold" },
    photo: "braceletModel",
    subcategories: ["Charm", "Chain", "Crystal", "Tennis"],
  },
  {
    slug: "rings",
    name: "Rings",
    tagline: "Minimal to statement, made to stack",
    art: { shape: "ring", tone: "silver" },
    photo: "ringsHands",
    subcategories: ["Minimal", "Adjustable", "Stackable", "Statement"],
  },
  {
    slug: "jewellery-sets",
    name: "Jewellery Sets",
    tagline: "Coordinated pieces, effortless styling",
    art: { shape: "set", tone: "rose" },
    photo: "jewelryBox",
    subcategories: ["Gift Sets", "Necklace & Earring Sets"],
  },
];
