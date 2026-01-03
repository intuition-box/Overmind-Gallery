// data/nftRelics.ts
export type Relic = {
  id: number
  title: string
  creator: string
  price: string
  image?: string
  glbUrl?: string
  description: string
  collection?: string
  status?: "coming-soon" | "in-auction" | "available"
}

export const nftRelics: Relic[] = [
  { id: 1, title: "The Obsidian Codex", creator: "DigitalMystic", price: "2.5 TRUST", image: "/images/dark-mystical-obsidian-codex-ancient-book-glowing-.png", description: "An ancient digital grimoire...", collection: "coming-soon", status: "coming-soon" },
  { id: 2, title: "Ethereal Void Walker", creator: "Wolfgang", price: "1.8 TRUST", image: "/images/ethereal-void-walker-dark-figure-glowing-eyes-myst.png", glbUrl: "/models/Ring.glb", description: "A spectral guardian...", collection: "void-walkers", status: "in-auction" },
  { id: 3, title: "Neon Sigil of Power", creator: "RuneForger", price: "3.2 TRUST", image: "/images/neon-sigil-glowing-cyan-violet-runes-mystical-symb.png", glbUrl: "/models/Ring.glb", description: "A powerful sigil...", collection: "coming-soon", status: "coming-soon" },
  { id: 4, title: "Shadow Nexus Crystal", creator: "VoidCrafter", price: "4.1 TRUST", image: "/images/shadow-crystal-dark-mystical-glowing-purple-energy.png", glbUrl: "/models/Ring.glb", description: "A crystalline artifact...", collection: "coming-soon", status: "coming-soon" },
]
