import { PhotoKey } from "./photos";

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  photo: PhotoKey;
  date: string;
  readTime: string;
  body: string[];
}

export const journalPosts: JournalPost[] = [
  {
    slug: "how-to-stack-rings",
    title: "How to Stack Rings Like a Stylist",
    excerpt: "Three rules for building a ring stack that looks intentional, not accidental.",
    photo: "ringsHands",
    date: "2026-06-12",
    readTime: "4 min read",
    body: [
      "Ring stacking looks effortless when it's done well, and slightly chaotic when it isn't. The difference usually comes down to three things: varying widths, mixing textures, and leaving breathing room.",
      "Start with one statement piece, then build around it with slimmer bands. Mixing a textured band with a plain one adds visual interest without competing for attention.",
      "Finally, don't feel like every finger needs a ring. The most polished stacks usually leave at least one finger bare.",
    ],
  },
  {
    slug: "gold-vs-silver-finding-your-tone",
    title: "Gold or Silver? Finding Your Metal Tone",
    excerpt: "A simple trick to figure out which metal tone actually suits your skin.",
    photo: "earringsSilver",
    date: "2026-05-20",
    readTime: "3 min read",
    body: [
      "Check the veins on the inside of your wrist in natural light. Greenish veins usually mean warmer undertones (gold suits you); bluish veins usually mean cooler undertones (silver suits you).",
      "That said, there are no real rules in modern jewellery styling anymore. Mixed-metal stacking is one of the biggest trends right now, and it works for every skin tone.",
    ],
  },
  {
    slug: "jewellery-for-the-office",
    title: "Jewellery That Works From 9 to 9",
    excerpt: "Pieces polished enough for the boardroom and easy enough for dinner after.",
    photo: "earringsProduct",
    date: "2026-04-08",
    readTime: "3 min read",
    body: [
      "The best office jewellery does double duty: quiet enough for a client call, but not so plain it disappears at dinner.",
      "Our go-to formula: small gold hoops or studs, one thin layered necklace, and a single stacking ring. Nothing that jingles on a video call.",
    ],
  },
];
