import {
  Activity,
  BadgeCheck,
  BarChart3,
  CheckSquare,
  Bell,
  FileSearch,
  Globe2,
  Images,
  Layers3,
  Leaf,
  Megaphone,
  PackageCheck,
  PanelTop,
  Percent,
  Shield,
  ShieldCheck
} from "lucide-react";

export type Product = {
  slug: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  rating: number;
  stock: number;
  market: string;
  badge: string;
  tone: string;
  description: string;
  ritual: string[];
  ingredients: string[];
  image: string;
  status: "Published" | "Draft" | "Hidden";
  seoCompleteness: number;
  imageAlt: string;
  sku: string;
  updatedAt: string;
};

export type Collection = {
  slug: string;
  name: string;
  description: string;
  heroImage: string;
  featuredProducts: string[];
  market: string;
  language: string;
  status: "Draft" | "Scheduled" | "Live" | "Archived";
  startsAt: string;
  endsAt: string;
  seoCompleteness: number;
};

export type Campaign = {
  slug: string;
  title: string;
  status: "Draft" | "Ready" | "Live";
  market: string;
  readiness: number;
  launchDate: string;
  heroCopy: string;
  focusProducts: string[];
  missingRequirements: string[];
};

export type Banner = {
  id: string;
  placement: string;
  message: string;
  status: "Scheduled" | "Live" | "Paused";
  market: string;
  startsAt: string;
  endsAt: string;
  destination: string;
  imageAlt: string;
  visual: string;
};

export type Audit = {
  id: string;
  area: string;
  score: number;
  status: "Healthy" | "Review" | "Action needed";
  note: string;
};

export type AuditIssue = {
  id: string;
  area: string;
  issue: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In progress" | "Waiting for approval" | "Fixed" | "Closed";
  owner: string;
  due: string;
};

export type ResourceArticle = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingTime: string;
  author: string;
  status: "Published" | "Scheduled" | "Draft";
  image: string;
};

export type Translation = {
  locale: string;
  market: string;
  language: string;
  completeness: number;
  pending: number;
  reviewer: string;
};

export type ContentTranslation = {
  id: string;
  section: string;
  source: string;
  language: "English" | "French" | "German" | "Spanish" | "Italian" | "Lithuanian";
  locale: string;
  status: "Complete" | "Review" | "Missing";
  translated: string;
  owner: string;
  updatedAt: string;
};

export type ActivityLog = {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  category: "Products" | "Campaigns" | "Banners" | "Translations" | "Audit" | "System";
  detail: string;
};

export type Market = {
  code: string;
  name: string;
  currency: string;
  health: number;
  status: "Live" | "Preparing" | "Paused";
};

export type LaunchChecklistItem = {
  id: string;
  label: string;
  owner: string;
  complete: boolean;
};

export type CalendarItem = {
  id: string;
  date: string;
  title: string;
  channel: "Homepage" | "Email" | "Product" | "Banner" | "Audit";
  status: "Draft" | "Ready" | "Live" | "Blocked";
  owner: string;
  note: string;
};

export type PermissionRole = {
  role: string;
  description: string;
  members: number;
  permissions: {
    products: boolean;
    campaigns: boolean;
    banners: boolean;
    translations: boolean;
    audits: boolean;
    settings: boolean;
  };
};

export type SeoRecord = {
  path: string;
  title: string;
  metaDescription: string;
  score: number;
  issue: string;
  owner: string;
  status: "Healthy" | "Review" | "Action needed";
};

export type MediaAsset = {
  id: string;
  name: string;
  type: "Product" | "Campaign" | "Banner" | "Editorial";
  altText: string;
  size: string;
  usedIn: string;
  status: "Ready" | "Missing alt text" | "Oversized";
  visual: string;
};

export type Promotion = {
  id: string;
  name: string;
  code: string;
  discount: string;
  status: "Draft" | "Scheduled" | "Live" | "Expired";
  startsAt: string;
  endsAt: string;
  market: string;
  requirement: string;
};

export type HomepageBlock = {
  id: string;
  name: string;
  type: "Hero" | "Product rail" | "Campaign" | "Editorial" | "Newsletter";
  status: "Draft" | "Ready" | "Live";
  owner: string;
  note: string;
};

export type AdminNotification = {
  id: string;
  title: string;
  body: string;
  type: "Audit" | "Translation" | "Campaign" | "Stock" | "System";
  priority: "High" | "Medium" | "Low";
  time: string;
  read: boolean;
};

export const products: Product[] = [
  {
    slug: "luna-mineral-bath-soak",
    name: "Luna Mineral Bath Soak",
    category: "Bath Rituals",
    collection: "Evening Reset",
    price: 42,
    rating: 4.8,
    stock: 148,
    market: "UK",
    badge: "Best evening ritual",
    tone: "soft sage",
    description:
      "A magnesium-rich mineral soak with lavender, oat silk, and neroli for slow evenings and restored skin.",
    ritual: ["Pour two handfuls", "Soak for 18 minutes", "Finish with warm oil"],
    ingredients: ["Magnesium flakes", "Oat silk", "Lavender", "Neroli"],
    image: "linear-gradient(135deg, #dfead8 0%, #f8efe5 55%, #cab794 100%)",
    status: "Published",
    seoCompleteness: 96,
    imageAlt: "Ceramic jar of Luna Mineral Bath Soak beside lavender and linen.",
    sku: "AUR-BATH-LUNA-042",
    updatedAt: "2026-05-23"
  },
  {
    slug: "aurea-vitamin-c-serum",
    name: "Aurea Vitamin C Serum",
    category: "Skincare",
    collection: "Morning Light",
    price: 68,
    rating: 4.9,
    stock: 72,
    market: "EU",
    badge: "Low-stock hero",
    tone: "warm citrus",
    description:
      "A brightening daily serum pairing stable vitamin C with fermented green tea and barrier-friendly botanicals.",
    ritual: ["Apply after mist", "Use two pumps", "Seal with SPF"],
    ingredients: ["Vitamin C", "Green tea ferment", "Squalane", "Calendula"],
    image: "linear-gradient(135deg, #f5d2b8 0%, #fbfaf7 48%, #c8d8bd 100%)",
    status: "Published",
    seoCompleteness: 78,
    imageAlt: "",
    sku: "AUR-SKIN-AUREA-068",
    updatedAt: "2026-05-22"
  },
  {
    slug: "solace-aromatherapy-mist",
    name: "Solace Aromatherapy Mist",
    category: "Aromatherapy",
    collection: "Desk to Dusk",
    price: 28,
    rating: 4.7,
    stock: 230,
    market: "US",
    badge: "Admin pick",
    tone: "clear botanical",
    description:
      "A light room and linen mist balanced with clary sage, bergamot, and cedar for focused calm.",
    ritual: ["Mist linens", "Pause for three breaths", "Refresh workspace"],
    ingredients: ["Clary sage", "Bergamot", "Cedar", "Aloe water"],
    image: "linear-gradient(135deg, #d6e5e0 0%, #fbfaf7 52%, #e8ccb5 100%)",
    status: "Draft",
    seoCompleteness: 68,
    imageAlt: "Amber aromatherapy mist bottle on a pale stone tray.",
    sku: "AUR-AROMA-SOL-028",
    updatedAt: "2026-05-20"
  },
  {
    slug: "terra-body-polish",
    name: "Terra Body Polish",
    category: "Bodycare",
    collection: "Weekend Renewal",
    price: 38,
    rating: 4.6,
    stock: 96,
    market: "UK",
    badge: "New collection",
    tone: "grounded clay",
    description:
      "A fine-grain body polish with rice powder, cupuacu butter, and pink clay for smooth, luminous skin.",
    ritual: ["Massage onto damp skin", "Rinse slowly", "Follow with balm"],
    ingredients: ["Rice powder", "Pink clay", "Cupuacu", "Geranium"],
    image: "linear-gradient(135deg, #ead4c8 0%, #f9f1e8 52%, #b8c7a8 100%)",
    status: "Hidden",
    seoCompleteness: 86,
    imageAlt: "",
    sku: "AUR-BODY-TERRA-038",
    updatedAt: "2026-05-18"
  }
];

export const additionalProducts: Product[] = [
  {
    slug: "lavender-calm-essential-oil",
    name: "Lavender Calm Essential Oil",
    category: "Essential Oils",
    collection: "Sleep Essentials",
    price: 24,
    rating: 4.9,
    stock: 184,
    market: "UK",
    badge: "Bestseller",
    tone: "botanical lavender",
    description: "A pure lavender essential oil for evening diffusion, bath rituals, and slow wind-down routines.",
    ritual: ["Add six drops to diffuser", "Breathe slowly", "Use before sleep"],
    ingredients: ["Lavender essential oil"],
    image: "linear-gradient(135deg, #ddd7ec 0%, #fbfaf7 52%, #a8bfa3 100%)",
    status: "Published",
    seoCompleteness: 94,
    imageAlt: "Small amber bottle of lavender essential oil beside dried lavender stems.",
    sku: "AUR-OIL-LAV-024",
    updatedAt: "2026-05-23"
  },
  {
    slug: "citrus-focus-blend",
    name: "Citrus Focus Blend",
    category: "Energy & Focus",
    collection: "Focus & Energy",
    price: 26,
    rating: 4.6,
    stock: 118,
    market: "EU",
    badge: "Online Exclusive",
    tone: "bright citrus",
    description: "A crisp citrus and rosemary aromatherapy blend created for focused mornings and desk rituals.",
    ritual: ["Diffuse for 30 minutes", "Refresh workspace", "Pair with water and light"],
    ingredients: ["Orange", "Grapefruit", "Rosemary", "Lemon"],
    image: "linear-gradient(135deg, #f6d196 0%, #fff9f0 54%, #b5c9ad 100%)",
    status: "Published",
    seoCompleteness: 88,
    imageAlt: "Citrus essential oil bottle with orange peel and rosemary.",
    sku: "AUR-FOCUS-CIT-026",
    updatedAt: "2026-05-21"
  },
  {
    slug: "rose-glow-facial-oil",
    name: "Rose Glow Facial Oil",
    category: "Skincare",
    collection: "Skincare Rituals",
    price: 54,
    rating: 4.8,
    stock: 63,
    market: "UK",
    badge: "Limited",
    tone: "rose gold",
    description: "A nourishing facial oil with rosehip, jojoba, and calendula for a soft evening glow.",
    ritual: ["Warm three drops", "Press into skin", "Use after serum"],
    ingredients: ["Rosehip", "Jojoba", "Calendula", "Vitamin E"],
    image: "linear-gradient(135deg, #ecc7bc 0%, #fff9f0 50%, #d8c7ae 100%)",
    status: "Draft",
    seoCompleteness: 72,
    imageAlt: "",
    sku: "AUR-SKIN-ROSE-054",
    updatedAt: "2026-05-20"
  },
  {
    slug: "sleep-ritual-bundle",
    name: "Sleep Ritual Bundle",
    category: "Wellness Bundles",
    collection: "Sleep Essentials",
    price: 86,
    rating: 4.9,
    stock: 41,
    market: "EU",
    badge: "Low Stock",
    tone: "night calm",
    description: "A curated sleep bundle with bath soak, pillow spray, and lavender oil for restorative evenings.",
    ritual: ["Start with bath soak", "Mist pillow", "Diffuse lavender"],
    ingredients: ["Lavender", "Magnesium", "Chamomile", "Cedar"],
    image: "linear-gradient(135deg, #c9d6cb 0%, #f5efe7 54%, #b99b5f 100%)",
    status: "Published",
    seoCompleteness: 91,
    imageAlt: "Sleep bundle with bath soak jar, pillow spray, and lavender oil.",
    sku: "AUR-BUNDLE-SLEEP-086",
    updatedAt: "2026-05-19"
  },
  {
    slug: "botanical-hand-cream",
    name: "Botanical Hand Cream",
    category: "Skincare",
    collection: "Self-Care Favourites",
    price: 18,
    rating: 4.5,
    stock: 205,
    market: "US",
    badge: "New",
    tone: "soft cream",
    description: "A lightweight botanical hand cream with shea, oat, and neroli for daily comfort.",
    ritual: ["Massage into hands", "Reapply after washing", "Use before sleep"],
    ingredients: ["Shea butter", "Oat extract", "Neroli", "Aloe"],
    image: "linear-gradient(135deg, #fff9f0 0%, #ead8c8 52%, #a8bfa3 100%)",
    status: "Published",
    seoCompleteness: 83,
    imageAlt: "Tube of botanical hand cream beside oat stems.",
    sku: "AUR-SKIN-HAND-018",
    updatedAt: "2026-05-18"
  },
  {
    slug: "eucalyptus-shower-drops",
    name: "Eucalyptus Shower Drops",
    category: "Bath Rituals",
    collection: "Starter Bundles",
    price: 22,
    rating: 4.7,
    stock: 89,
    market: "LT",
    badge: "Seasonal",
    tone: "fresh eucalyptus",
    description: "A pack of eucalyptus shower drops that release a fresh spa aroma in warm steam.",
    ritual: ["Place one on shower floor", "Let steam activate", "Breathe deeply"],
    ingredients: ["Eucalyptus", "Menthol", "Peppermint"],
    image: "linear-gradient(135deg, #d8eee9 0%, #fbfaf7 48%, #a8bfa3 100%)",
    status: "Published",
    seoCompleteness: 79,
    imageAlt: "Eucalyptus shower drops on a stone tray with fresh leaves.",
    sku: "AUR-BATH-EUC-022",
    updatedAt: "2026-05-17"
  },
  {
    slug: "golden-hour-body-oil",
    name: "Golden Hour Body Oil",
    category: "Bodycare",
    collection: "Summer Wellness",
    price: 46,
    rating: 4.8,
    stock: 57,
    market: "IT",
    badge: "Summer Edit",
    tone: "muted gold",
    description: "A silky body oil with apricot, squalane, and jasmine for warm-weather skin rituals.",
    ritual: ["Apply after shower", "Massage over damp skin", "Let absorb before dressing"],
    ingredients: ["Apricot oil", "Squalane", "Jasmine", "Vitamin E"],
    image: "linear-gradient(135deg, #ead09a 0%, #fff9f0 48%, #cfa58a 100%)",
    status: "Draft",
    seoCompleteness: 66,
    imageAlt: "",
    sku: "AUR-BODY-GOLD-046",
    updatedAt: "2026-05-16"
  },
  {
    slug: "deep-rest-pillow-spray",
    name: "Deep Rest Pillow Spray",
    category: "Sleep & Relaxation",
    collection: "Sleep Essentials",
    price: 30,
    rating: 4.9,
    stock: 132,
    market: "DE",
    badge: "Bestseller",
    tone: "soft dusk",
    description: "A calming pillow spray with lavender, vetiver, and chamomile for a quiet sleep ritual.",
    ritual: ["Mist pillow lightly", "Wait one minute", "Pair with slow breathing"],
    ingredients: ["Lavender", "Vetiver", "Chamomile", "Aloe water"],
    image: "linear-gradient(135deg, #d7d9ed 0%, #fbfaf7 52%, #d8c7ae 100%)",
    status: "Published",
    seoCompleteness: 93,
    imageAlt: "Deep Rest Pillow Spray bottle on folded linen bedding.",
    sku: "AUR-SLEEP-DEEP-030",
    updatedAt: "2026-05-15"
  }
];

products.push(...additionalProducts);

export const collections: Collection[] = [
  {
    slug: "sleep-essentials",
    name: "Sleep Essentials",
    description: "Evening products for bath, scent, and pillow rituals.",
    heroImage: "linear-gradient(135deg, #d7d9ed 0%, #fbfaf7 52%, #a8bfa3 100%)",
    featuredProducts: ["Lavender Calm Essential Oil", "Sleep Ritual Bundle", "Deep Rest Pillow Spray"],
    market: "UK + EU",
    language: "English, French, German",
    status: "Live",
    startsAt: "2026-05-01",
    endsAt: "2026-08-31",
    seoCompleteness: 94
  },
  {
    slug: "summer-wellness",
    name: "Summer Wellness",
    description: "Warm-weather bodycare, aromatherapy, and seasonal self-care edits.",
    heroImage: "linear-gradient(135deg, #ead09a 0%, #fff9f0 52%, #cfa58a 100%)",
    featuredProducts: ["Golden Hour Body Oil", "Citrus Focus Blend", "Solace Aromatherapy Mist"],
    market: "EU",
    language: "English, Italian, Spanish",
    status: "Scheduled",
    startsAt: "2026-06-01",
    endsAt: "2026-07-15",
    seoCompleteness: 81
  },
  {
    slug: "skincare-rituals",
    name: "Skincare Rituals",
    description: "Facial oils, serums, and daily botanical skincare.",
    heroImage: "linear-gradient(135deg, #ecc7bc 0%, #fbfaf7 48%, #a8bfa3 100%)",
    featuredProducts: ["Aurea Vitamin C Serum", "Rose Glow Facial Oil", "Botanical Hand Cream"],
    market: "UK + US",
    language: "English",
    status: "Live",
    startsAt: "2026-04-15",
    endsAt: "2026-09-30",
    seoCompleteness: 88
  },
  {
    slug: "starter-bundles",
    name: "Starter Bundles",
    description: "Accessible first rituals for new wellness customers.",
    heroImage: "linear-gradient(135deg, #d8eee9 0%, #fbfaf7 52%, #d8c7ae 100%)",
    featuredProducts: ["Eucalyptus Shower Drops", "Solace Aromatherapy Mist", "Botanical Hand Cream"],
    market: "UK + LT",
    language: "English, Lithuanian",
    status: "Draft",
    startsAt: "2026-06-10",
    endsAt: "2026-08-01",
    seoCompleteness: 69
  },
  {
    slug: "self-care-favourites",
    name: "Self-Care Favourites",
    description: "Always-on bestsellers for gifting, restocking, and everyday comfort.",
    heroImage: "linear-gradient(135deg, #f8efe5 0%, #ffffff 48%, #a8bfa3 100%)",
    featuredProducts: ["Luna Mineral Bath Soak", "Botanical Hand Cream", "Terra Body Polish"],
    market: "Global",
    language: "English, French, German, Spanish, Italian, Lithuanian",
    status: "Live",
    startsAt: "2026-01-01",
    endsAt: "2026-12-31",
    seoCompleteness: 97
  }
];

export const resourceArticles: ResourceArticle[] = [
  {
    slug: "build-a-relaxing-evening-routine",
    title: "How to Build a Relaxing Evening Routine",
    category: "Sleep & Relaxation",
    excerpt:
      "A considered wind-down practice — bath, scent, breath — trains your body to move gently from the day's pace into genuine rest.",
    readingTime: "4 min read",
    author: "Maya",
    status: "Published",
    image: "linear-gradient(135deg, #d7d9ed 0%, #fbfaf7 52%, #a8bfa3 100%)"
  },
  {
    slug: "best-essential-oils-for-focus",
    title: "Best Essential Oils for Focus",
    category: "Energy & Focus",
    excerpt:
      "Rosemary, peppermint, and lemon are well-researched companions for clear thinking. Here is how to use them without overwhelm.",
    readingTime: "5 min read",
    author: "Noah",
    status: "Published",
    image: "linear-gradient(135deg, #f6d196 0%, #fff9f0 54%, #b5c9ad 100%)"
  },
  {
    slug: "calm-home-workspace",
    title: "How to Create a Calm Home Workspace",
    category: "Home Fragrance",
    excerpt:
      "Small ritual choices — a botanical mist, tidy surfaces, a steady scent — have a measurable effect on how well you work from home.",
    readingTime: "6 min read",
    author: "Skai",
    status: "Published",
    image: "linear-gradient(135deg, #d6e5e0 0%, #fbfaf7 52%, #e8ccb5 100%)"
  },
  {
    slug: "beginners-guide-to-aromatherapy",
    title: "A Beginner's Guide to Aromatherapy",
    category: "Essential Oils",
    excerpt:
      "Aromatherapy does not need to be complex. This guide starts with three oils, one diffuser, and a few clear intentions.",
    readingTime: "7 min read",
    author: "Maya",
    status: "Published",
    image: "linear-gradient(135deg, #ddd7ec 0%, #fbfaf7 52%, #a8bfa3 100%)"
  },
  {
    slug: "choose-your-first-wellness-bundle",
    title: "How to Choose Your First Wellness Bundle",
    category: "Wellness Bundles",
    excerpt:
      "The best bundle starts with one honest question: what part of your day do you most want to feel different? Start there.",
    readingTime: "3 min read",
    author: "Elise",
    status: "Published",
    image: "linear-gradient(135deg, #c9d6cb 0%, #f5efe7 54%, #b99b5f 100%)"
  },
  {
    slug: "skincare-ritual-morning-vs-evening",
    title: "Morning vs Evening: Building a Skincare Ritual",
    category: "Skincare",
    excerpt:
      "AM routines protect; PM routines repair. Understanding this rhythm changes how you choose and layer your botanicals.",
    readingTime: "5 min read",
    author: "Sofia",
    status: "Scheduled",
    image: "linear-gradient(135deg, #ecc7bc 0%, #fff9f0 50%, #d8c7ae 100%)"
  }
];

export const campaigns: Campaign[] = [
  {
    slug: "winter-reset",
    title: "Winter Reset",
    status: "Ready",
    market: "UK + EU",
    readiness: 88,
    launchDate: "2026-06-03",
    heroCopy: "Quiet rituals for brighter cold-weather skin.",
    focusProducts: ["Luna Mineral Bath Soak", "Terra Body Polish"],
    missingRequirements: ["French banner alt text", "Final UTM QA"]
  },
  {
    slug: "morning-light",
    title: "Morning Light",
    status: "Draft",
    market: "US",
    readiness: 64,
    launchDate: "2026-06-18",
    heroCopy: "A softer start, built around luminous daily care.",
    focusProducts: ["Aurea Vitamin C Serum", "Solace Aromatherapy Mist"],
    missingRequirements: ["Hero image approval", "US stock threshold", "Email landing URL", "German translations"]
  }
];

campaigns.push(
  {
    slug: "summer-wellness-edit",
    title: "Summer Wellness Edit",
    status: "Ready",
    market: "EU + IT + ES",
    readiness: 82,
    launchDate: "2026-06-01",
    heroCopy: "Sun-warmed rituals for lighter routines and golden evenings.",
    focusProducts: ["Golden Hour Body Oil", "Citrus Focus Blend", "Solace Aromatherapy Mist"],
    missingRequirements: ["Italian banner approval", "Spanish meta description"]
  },
  {
    slug: "sleep-better-week",
    title: "Sleep Better Week",
    status: "Live",
    market: "UK + DE",
    readiness: 96,
    launchDate: "2026-05-20",
    heroCopy: "A week of sleep rituals, soft scent, and evening care.",
    focusProducts: ["Sleep Ritual Bundle", "Deep Rest Pillow Spray", "Lavender Calm Essential Oil"],
    missingRequirements: []
  },
  {
    slug: "self-care-weekend",
    title: "Self-Care Weekend",
    status: "Draft",
    market: "Global",
    readiness: 51,
    launchDate: "2026-07-05",
    heroCopy: "Simple weekend rituals for resetting body, skin, and space.",
    focusProducts: ["Terra Body Polish", "Botanical Hand Cream", "Luna Mineral Bath Soak"],
    missingRequirements: ["Hero image", "Collection assignment", "Lithuanian translations", "Final approval"]
  }
);

export const banners: Banner[] = [
  {
    id: "bn-01",
    placement: "Homepage announcement",
    message: "Complimentary linen wrap on rituals over GBP 80",
    status: "Live",
    market: "UK",
    startsAt: "2026-05-21",
    endsAt: "2026-06-05",
    destination: "/products",
    imageAlt: "Folded linen wrap beside ceramic wellness products.",
    visual: "linear-gradient(135deg, #e6efdf 0%, #ffffff 52%, #d9c39b 100%)"
  },
  {
    id: "bn-02",
    placement: "Product listing strip",
    message: "Winter Reset launches 3 June",
    status: "Scheduled",
    market: "EU",
    startsAt: "2026-06-01",
    endsAt: "2026-06-17",
    destination: "/campaigns/winter-reset",
    imageAlt: "",
    visual: "linear-gradient(135deg, #f4d6c7 0%, #fbfaf7 45%, #c9d9c0 100%)"
  },
  {
    id: "bn-03",
    placement: "Cart reminder",
    message: "Aurea serum gift ends Friday",
    status: "Paused",
    market: "US",
    startsAt: "2026-05-05",
    endsAt: "2026-05-17",
    destination: "/products/aurea-vitamin-c-serum",
    imageAlt: "Amber serum bottle catching soft morning light.",
    visual: "linear-gradient(135deg, #f6cfb5 0%, #fff8f0 55%, #b8cdb2 100%)"
  }
];

banners.push(
  {
    id: "bn-04",
    placement: "Homepage hero",
    message: "Sleep Better Week is live",
    status: "Live",
    market: "DE",
    startsAt: "2026-05-20",
    endsAt: "2026-05-30",
    destination: "/campaigns/sleep-better-week",
    imageAlt: "Pillow spray and lavender oil arranged on folded bedding.",
    visual: "linear-gradient(135deg, #d7d9ed 0%, #fbfaf7 54%, #a8bfa3 100%)"
  },
  {
    id: "bn-05",
    placement: "Collection page",
    message: "Summer Wellness Edit opens soon",
    status: "Scheduled",
    market: "IT",
    startsAt: "2026-06-01",
    endsAt: "2026-06-30",
    destination: "/campaigns/summer-wellness-edit",
    imageAlt: "",
    visual: "linear-gradient(135deg, #ead09a 0%, #fff9f0 54%, #cfa58a 100%)"
  },
  {
    id: "bn-06",
    placement: "Product page",
    message: "Pair with Lavender Calm Essential Oil",
    status: "Live",
    market: "UK",
    startsAt: "2026-05-10",
    endsAt: "2026-06-10",
    destination: "/products/lavender-calm-essential-oil",
    imageAlt: "Lavender essential oil with bath soak and linen.",
    visual: "linear-gradient(135deg, #ddd7ec 0%, #fbfaf7 48%, #d8c7ae 100%)"
  },
  {
    id: "bn-07",
    placement: "Campaign landing page",
    message: "Final weekend for complimentary wrap",
    status: "Paused",
    market: "FR",
    startsAt: "2026-05-01",
    endsAt: "2026-05-12",
    destination: "/campaigns/winter-reset",
    imageAlt: "Gift wrap and wellness products on a stone surface.",
    visual: "linear-gradient(135deg, #e6efdf 0%, #fff9f0 48%, #b99b5f 100%)"
  },
  {
    id: "bn-08",
    placement: "Cart page",
    message: "Add a botanical hand cream for daily comfort",
    status: "Scheduled",
    market: "US",
    startsAt: "2026-06-05",
    endsAt: "2026-06-25",
    destination: "/products/botanical-hand-cream",
    imageAlt: "Botanical hand cream beside oat stems.",
    visual: "linear-gradient(135deg, #fff9f0 0%, #ead8c8 52%, #a8bfa3 100%)"
  }
);

export const audits: Audit[] = [
  {
    id: "au-01",
    area: "Homepage content freshness",
    score: 94,
    status: "Healthy",
    note: "Hero, banner, and featured collection reviewed today."
  },
  {
    id: "au-02",
    area: "Product metadata",
    score: 82,
    status: "Review",
    note: "Two products need alt text and search summaries before launch."
  },
  {
    id: "au-03",
    area: "Campaign links",
    score: 76,
    status: "Action needed",
    note: "Morning Light email CTA still points to draft URL."
  }
];

export const auditIssues: AuditIssue[] = [
  {
    id: "ai-01",
    area: "Product metadata",
    issue: "Aurea Vitamin C Serum needs primary image alt text before next publish.",
    priority: "High",
    status: "Open",
    owner: "Web admin",
    due: "2026-05-24"
  },
  {
    id: "ai-02",
    area: "Campaign links",
    issue: "Morning Light email CTA points to draft URL.",
    priority: "High",
    status: "In progress",
    owner: "Campaigns",
    due: "2026-05-25"
  },
  {
    id: "ai-03",
    area: "Banners",
    issue: "Cart reminder banner ended on 17 May and should be archived.",
    priority: "Medium",
    status: "Open",
    owner: "Content",
    due: "2026-05-23"
  },
  {
    id: "ai-04",
    area: "Localization",
    issue: "German collection page has 12 strings pending reviewer approval.",
    priority: "Low",
    status: "Fixed",
    owner: "Localization",
    due: "2026-05-22"
  }
];

auditIssues.push(
  {
    id: "ai-05",
    area: "Accessibility",
    issue: "Summer Wellness banner image is missing Lithuanian alt text.",
    priority: "Critical",
    status: "Open",
    owner: "Web admin",
    due: "2026-05-24"
  },
  {
    id: "ai-06",
    area: "SEO",
    issue: "Rose Glow Facial Oil meta description is below recommended length.",
    priority: "Medium",
    status: "In progress",
    owner: "Content",
    due: "2026-05-26"
  },
  {
    id: "ai-07",
    area: "Mobile layout",
    issue: "Campaign cards wrap awkwardly on narrow tablet width.",
    priority: "High",
    status: "Waiting for approval",
    owner: "Front-end",
    due: "2026-05-27"
  },
  {
    id: "ai-08",
    area: "Broken link",
    issue: "Self-Care Weekend draft CTA links to an unpublished collection.",
    priority: "High",
    status: "Open",
    owner: "Campaigns",
    due: "2026-05-28"
  },
  {
    id: "ai-09",
    area: "Expired content",
    issue: "French complimentary wrap banner should be removed from campaign page.",
    priority: "Medium",
    status: "Open",
    owner: "Content",
    due: "2026-05-23"
  },
  {
    id: "ai-10",
    area: "Duplicate content",
    issue: "Sleep Essentials and Deep Rest product snippets repeat the same first sentence.",
    priority: "Low",
    status: "Closed",
    owner: "SEO",
    due: "2026-05-22"
  }
);

export const translations: Translation[] = [
  { locale: "en-GB", market: "United Kingdom", language: "English", completeness: 100, pending: 0, reviewer: "Maya" },
  { locale: "fr-FR", market: "France", language: "French", completeness: 92, pending: 7, reviewer: "Elise" },
  { locale: "de-DE", market: "Germany", language: "German", completeness: 87, pending: 12, reviewer: "Jonas" },
  { locale: "es-ES", market: "Spain", language: "Spanish", completeness: 74, pending: 18, reviewer: "Lucia" },
  { locale: "it-IT", market: "Italy", language: "Italian", completeness: 81, pending: 11, reviewer: "Sofia" },
  { locale: "lt-LT", market: "Lithuania", language: "Lithuanian", completeness: 58, pending: 26, reviewer: "Ieva" }
];

export const contentTranslations: ContentTranslation[] = [
  {
    id: "ct-en-01",
    section: "Homepage hero",
    source: "Quiet rituals for brighter cold-weather skin.",
    language: "English",
    locale: "en-GB",
    status: "Complete",
    translated: "Quiet rituals for brighter cold-weather skin.",
    owner: "Maya",
    updatedAt: "2026-05-23"
  },
  {
    id: "ct-fr-01",
    section: "Homepage hero",
    source: "Quiet rituals for brighter cold-weather skin.",
    language: "French",
    locale: "fr-FR",
    status: "Review",
    translated: "Des rituels calmes pour une peau plus lumineuse par temps froid.",
    owner: "Elise",
    updatedAt: "2026-05-22"
  },
  {
    id: "ct-de-01",
    section: "Product listing banner",
    source: "Winter Reset launches 3 June",
    language: "German",
    locale: "de-DE",
    status: "Review",
    translated: "Winter Reset startet am 3. Juni",
    owner: "Jonas",
    updatedAt: "2026-05-21"
  },
  {
    id: "ct-es-01",
    section: "Campaign CTA",
    source: "Shop focus products",
    language: "Spanish",
    locale: "es-ES",
    status: "Missing",
    translated: "",
    owner: "Lucia",
    updatedAt: "2026-05-19"
  },
  {
    id: "ct-it-01",
    section: "Product detail ritual",
    source: "Finish with warm oil",
    language: "Italian",
    locale: "it-IT",
    status: "Complete",
    translated: "Concludi con un olio caldo",
    owner: "Sofia",
    updatedAt: "2026-05-20"
  },
  {
    id: "ct-lt-01",
    section: "Checkout banner",
    source: "Complimentary linen wrap on rituals over GBP 80",
    language: "Lithuanian",
    locale: "lt-LT",
    status: "Missing",
    translated: "",
    owner: "Ieva",
    updatedAt: "2026-05-18"
  }
];

export const activityLogs: ActivityLog[] = [
  {
    id: "act-01",
    actor: "Maya",
    action: "published banner",
    target: "Homepage announcement",
    time: "12 min ago",
    category: "Banners",
    detail: "Set UK homepage announcement live after accessibility review."
  },
  {
    id: "act-02",
    actor: "Noah",
    action: "updated stock threshold",
    target: "Aurea Vitamin C Serum",
    time: "38 min ago",
    category: "Products",
    detail: "Raised low-stock warning from 40 to 80 units for campaign demand."
  },
  {
    id: "act-03",
    actor: "Elise",
    action: "reviewed translations",
    target: "Winter Reset FR",
    time: "1 hr ago",
    category: "Translations",
    detail: "Approved hero copy and returned two banner strings for edits."
  },
  {
    id: "act-04",
    actor: "System",
    action: "flagged audit item",
    target: "Campaign links",
    time: "2 hrs ago",
    category: "Audit",
    detail: "Detected one CTA pointing to a draft campaign URL."
  }
];

activityLogs.push(
  {
    id: "act-05",
    actor: "Skai",
    action: "changed product status",
    target: "Lavender Calm Essential Oil",
    time: "3 hrs ago",
    category: "Products",
    detail: "Moved product from Draft to Published after image and SEO checks."
  },
  {
    id: "act-06",
    actor: "Maya",
    action: "scheduled campaign",
    target: "Summer Wellness Edit",
    time: "4 hrs ago",
    category: "Campaigns",
    detail: "Set launch date and added Italian and Spanish market requirements."
  },
  {
    id: "act-07",
    actor: "Jonas",
    action: "updated translation",
    target: "German product listing banner",
    time: "5 hrs ago",
    category: "Translations",
    detail: "Submitted translated campaign banner copy for review."
  },
  {
    id: "act-08",
    actor: "System",
    action: "detected expired banner",
    target: "Cart reminder",
    time: "6 hrs ago",
    category: "Banners",
    detail: "Paused banner end date is older than the current schedule date."
  },
  {
    id: "act-09",
    actor: "Noah",
    action: "added collection",
    target: "Sleep Essentials",
    time: "7 hrs ago",
    category: "Products",
    detail: "Added three featured products and completed collection SEO summary."
  },
  {
    id: "act-10",
    actor: "Lucia",
    action: "marked translation missing",
    target: "Spanish campaign CTA",
    time: "8 hrs ago",
    category: "Translations",
    detail: "Flagged CTA text as missing before Summer Wellness QA."
  },
  {
    id: "act-11",
    actor: "Sofia",
    action: "approved translation",
    target: "Italian ritual copy",
    time: "9 hrs ago",
    category: "Translations",
    detail: "Approved product detail ritual text for market launch."
  },
  {
    id: "act-12",
    actor: "Skai",
    action: "fixed audit issue",
    target: "Duplicate content",
    time: "10 hrs ago",
    category: "Audit",
    detail: "Updated repeated product snippets on Sleep Essentials collection."
  },
  {
    id: "act-13",
    actor: "Maya",
    action: "edited homepage module",
    target: "Best sellers",
    time: "Yesterday",
    category: "Campaigns",
    detail: "Reordered best sellers to support Sleep Better Week."
  },
  {
    id: "act-14",
    actor: "System",
    action: "flagged low stock",
    target: "Sleep Ritual Bundle",
    time: "Yesterday",
    category: "Products",
    detail: "Stock dropped below campaign threshold for UK market."
  },
  {
    id: "act-15",
    actor: "Ieva",
    action: "created translation task",
    target: "Lithuanian checkout banner",
    time: "Yesterday",
    category: "Translations",
    detail: "Assigned missing checkout promotional copy for review."
  },
  {
    id: "act-16",
    actor: "Noah",
    action: "updated banner link",
    target: "Homepage hero",
    time: "Yesterday",
    category: "Banners",
    detail: "Changed CTA destination from products to Sleep Better Week campaign."
  },
  {
    id: "act-17",
    actor: "Skai",
    action: "ran mobile QA",
    target: "Campaign landing page",
    time: "2 days ago",
    category: "Audit",
    detail: "Logged tablet wrapping issue for campaign card layout."
  },
  {
    id: "act-18",
    actor: "Elise",
    action: "returned copy for edits",
    target: "French campaign banner",
    time: "2 days ago",
    category: "Translations",
    detail: "Requested a softer CTA translation before approval."
  },
  {
    id: "act-19",
    actor: "Maya",
    action: "created banner",
    target: "Collection page promotion",
    time: "2 days ago",
    category: "Banners",
    detail: "Built scheduled Summer Wellness collection banner."
  },
  {
    id: "act-20",
    actor: "System",
    action: "completed nightly audit",
    target: "AuraMarket storefront",
    time: "2 days ago",
    category: "System",
    detail: "Checked tracked routes for broken links and missing metadata."
  }
);

export const contentCalendar: CalendarItem[] = [
  {
    id: "cal-01",
    date: "2026-05-24",
    title: "Aurea serum alt text QA",
    channel: "Product",
    status: "Blocked",
    owner: "Web admin",
    note: "Cannot publish EU feature module until image alt text is complete."
  },
  {
    id: "cal-02",
    date: "2026-05-27",
    title: "Winter Reset homepage takeover",
    channel: "Homepage",
    status: "Ready",
    owner: "Content",
    note: "Hero copy, product links, and stock checks are ready."
  },
  {
    id: "cal-03",
    date: "2026-06-01",
    title: "Product listing banner switch",
    channel: "Banner",
    status: "Draft",
    owner: "Campaigns",
    note: "Waiting on French image alt text and final UTM QA."
  },
  {
    id: "cal-04",
    date: "2026-06-03",
    title: "Winter Reset launch audit",
    channel: "Audit",
    status: "Ready",
    owner: "Web admin",
    note: "Run post-publish checks across homepage, listing, and campaign route."
  },
  {
    id: "cal-05",
    date: "2026-06-18",
    title: "Morning Light campaign email",
    channel: "Email",
    status: "Draft",
    owner: "Marketing",
    note: "Landing page copy and US stock threshold still need approval."
  }
];

export const permissionRoles: PermissionRole[] = [
  {
    role: "Web Administrator",
    description: "Owns publishing, audits, banners, products, and launch readiness.",
    members: 2,
    permissions: { products: true, campaigns: true, banners: true, translations: true, audits: true, settings: true }
  },
  {
    role: "Content Editor",
    description: "Updates copy, product descriptions, campaign pages, and translations.",
    members: 4,
    permissions: { products: true, campaigns: true, banners: true, translations: true, audits: false, settings: false }
  },
  {
    role: "Campaign Reviewer",
    description: "Reviews campaign readiness and signs off launch requirements.",
    members: 3,
    permissions: { products: false, campaigns: true, banners: true, translations: false, audits: true, settings: false }
  }
];

export const markets: Market[] = [
  { code: "UK", name: "United Kingdom", currency: "GBP", health: 96, status: "Live" },
  { code: "EU", name: "European Union", currency: "EUR", health: 88, status: "Live" },
  { code: "US", name: "United States", currency: "USD", health: 72, status: "Preparing" },
  { code: "LT", name: "Lithuania", currency: "EUR", health: 64, status: "Preparing" },
  { code: "IT", name: "Italy", currency: "EUR", health: 81, status: "Live" }
];

export const seoRecords: SeoRecord[] = [
  {
    path: "/",
    title: "AuraMarket | Premium Wellness Rituals",
    metaDescription: "Shop calm botanical wellness rituals and explore multilingual marketplace administration workflows.",
    score: 94,
    issue: "Healthy homepage metadata.",
    owner: "Web admin",
    status: "Healthy"
  },
  {
    path: "/products/aurea-vitamin-c-serum",
    title: "Aurea Vitamin C Serum | AuraMarket",
    metaDescription: "Brightening daily serum with vitamin C and green tea ferment.",
    score: 74,
    issue: "Meta description should be more specific before campaign feature.",
    owner: "Content",
    status: "Review"
  },
  {
    path: "/campaigns/summer-wellness-edit",
    title: "Summer Wellness Edit | AuraMarket",
    metaDescription: "",
    score: 58,
    issue: "Spanish meta description missing and title needs market variant.",
    owner: "Campaigns",
    status: "Action needed"
  },
  {
    path: "/journal/build-a-relaxing-evening-routine",
    title: "How to Build a Relaxing Evening Routine",
    metaDescription: "A considered guide to building a calming evening routine with bath, scent, and breath.",
    score: 91,
    issue: "Editorial SEO ready.",
    owner: "Editorial",
    status: "Healthy"
  }
];

export const mediaAssets: MediaAsset[] = [
  {
    id: "media-01",
    name: "Wellness hero still life",
    type: "Campaign",
    altText: "Editorial still life of wellness products with linen and botanicals.",
    size: "1.9 MB",
    usedIn: "Homepage hero",
    status: "Ready",
    visual: "linear-gradient(135deg, #dfead8 0%, #fbfaf7 52%, #cab794 100%)"
  },
  {
    id: "media-02",
    name: "Summer Wellness banner",
    type: "Banner",
    altText: "",
    size: "840 KB",
    usedIn: "Collection page promotion",
    status: "Missing alt text",
    visual: "linear-gradient(135deg, #ead09a 0%, #fff9f0 54%, #cfa58a 100%)"
  },
  {
    id: "media-03",
    name: "Rose Glow product image",
    type: "Product",
    altText: "",
    size: "2.8 MB",
    usedIn: "Product detail",
    status: "Oversized",
    visual: "linear-gradient(135deg, #ecc7bc 0%, #fff9f0 50%, #d8c7ae 100%)"
  },
  {
    id: "media-04",
    name: "Workspace editorial image",
    type: "Editorial",
    altText: "Calm home workspace with aromatherapy mist and botanical notes.",
    size: "760 KB",
    usedIn: "Journal article",
    status: "Ready",
    visual: "linear-gradient(135deg, #d6e5e0 0%, #fbfaf7 52%, #e8ccb5 100%)"
  }
];

export const promotions: Promotion[] = [
  {
    id: "promo-01",
    name: "Complimentary linen wrap",
    code: "LINEN80",
    discount: "Gift over GBP 80",
    status: "Live",
    startsAt: "2026-05-21",
    endsAt: "2026-06-05",
    market: "UK",
    requirement: "Applies to ritual orders over GBP 80."
  },
  {
    id: "promo-02",
    name: "Summer Wellness launch",
    code: "SUMMER15",
    discount: "15% off",
    status: "Scheduled",
    startsAt: "2026-06-01",
    endsAt: "2026-06-10",
    market: "EU",
    requirement: "Requires approved Italian and Spanish campaign banners."
  },
  {
    id: "promo-03",
    name: "Aurea serum gift",
    code: "GLOWGIFT",
    discount: "Free mini serum",
    status: "Expired",
    startsAt: "2026-05-05",
    endsAt: "2026-05-17",
    market: "US",
    requirement: "Expired promotion should be archived."
  }
];

export const homepageBlocks: HomepageBlock[] = [
  {
    id: "home-01",
    name: "Hero - Spring Wellness Rituals",
    type: "Hero",
    status: "Live",
    owner: "Content",
    note: "Primary hero image and CTA are live."
  },
  {
    id: "home-02",
    name: "Best Sellers",
    type: "Product rail",
    status: "Ready",
    owner: "Merchandising",
    note: "Products reordered for Sleep Better Week."
  },
  {
    id: "home-03",
    name: "Winter Reset campaign",
    type: "Campaign",
    status: "Live",
    owner: "Campaigns",
    note: "Campaign links verified."
  },
  {
    id: "home-04",
    name: "Wellness Journal preview",
    type: "Editorial",
    status: "Ready",
    owner: "Editorial",
    note: "Three published articles selected."
  },
  {
    id: "home-05",
    name: "AuraMarket Circle signup",
    type: "Newsletter",
    status: "Live",
    owner: "CRM",
    note: "Form copy approved."
  }
];

export const adminNotifications: AdminNotification[] = [
  {
    id: "note-01",
    title: "Critical alt text missing",
    body: "Summer Wellness banner needs Lithuanian alt text before launch review.",
    type: "Audit",
    priority: "High",
    time: "8 min ago",
    read: false
  },
  {
    id: "note-02",
    title: "Translation review due",
    body: "Spanish campaign CTA is still missing for Summer Wellness Edit.",
    type: "Translation",
    priority: "High",
    time: "22 min ago",
    read: false
  },
  {
    id: "note-03",
    title: "Promotion expired",
    body: "Aurea serum gift ended on 17 May and should be archived.",
    type: "Campaign",
    priority: "Medium",
    time: "1 hr ago",
    read: true
  },
  {
    id: "note-04",
    title: "Low stock threshold",
    body: "Sleep Ritual Bundle is below the campaign threshold.",
    type: "Stock",
    priority: "Medium",
    time: "Yesterday",
    read: false
  }
];

export const launchChecklist: LaunchChecklistItem[] = [
  { id: "lc-01", label: "Campaign hero approved", owner: "Content", complete: true },
  { id: "lc-02", label: "Featured products stocked", owner: "Merchandising", complete: true },
  { id: "lc-03", label: "Banner uploaded and alt text added", owner: "Web admin", complete: true },
  { id: "lc-04", label: "Landing page built and tested", owner: "Front-end", complete: true },
  { id: "lc-05", label: "CTA links tested", owner: "Web admin", complete: true },
  { id: "lc-06", label: "Desktop layout reviewed", owner: "Web admin", complete: true },
  { id: "lc-07", label: "Mobile layout reviewed", owner: "Web admin", complete: false },
  { id: "lc-08", label: "SEO title and meta description added", owner: "Content", complete: false },
  { id: "lc-09", label: "Translations reviewed", owner: "Localization", complete: false },
  { id: "lc-10", label: "Final stakeholder approval received", owner: "Campaign Reviewer", complete: false }
];

export type Category = {
  slug: string;
  name: string;
  description: string;
  productCount: number;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "essential-oils",
    name: "Essential Oils",
    description: "Pure botanical extracts for diffusion, massage, and bath rituals.",
    productCount: 18,
    image: "linear-gradient(135deg, #ddd7ec 0%, #fbfaf7 52%, #a8bfa3 100%)"
  },
  {
    slug: "skincare",
    name: "Skincare",
    description: "Facial oils, serums, and daily botanicals for calm, luminous skin.",
    productCount: 24,
    image: "linear-gradient(135deg, #ecc7bc 0%, #fff9f0 50%, #d8c7ae 100%)"
  },
  {
    slug: "sleep-relaxation",
    name: "Sleep & Relaxation",
    description: "Pillow sprays, bath soaks, and evening rituals for deep rest.",
    productCount: 14,
    image: "linear-gradient(135deg, #d7d9ed 0%, #fbfaf7 52%, #a8bfa3 100%)"
  },
  {
    slug: "energy-focus",
    name: "Energy & Focus",
    description: "Bright citrus and rosemary blends to sharpen mornings and clear space.",
    productCount: 9,
    image: "linear-gradient(135deg, #f6d196 0%, #fff9f0 54%, #b5c9ad 100%)"
  },
  {
    slug: "home-fragrance",
    name: "Home Fragrance",
    description: "Room mists and diffuser blends for a considered home atmosphere.",
    productCount: 11,
    image: "linear-gradient(135deg, #d6e5e0 0%, #fbfaf7 52%, #e8ccb5 100%)"
  },
  {
    slug: "wellness-bundles",
    name: "Wellness Bundles",
    description: "Curated sets for gifting, rituals, and seasonal self-care.",
    productCount: 8,
    image: "linear-gradient(135deg, #c9d6cb 0%, #f5efe7 54%, #b99b5f 100%)"
  }
];

export const dashboardStats = [
  {
    label: "Site health",
    value: "91%",
    detail: "3 admin checks need review",
    icon: ShieldCheck
  },
  {
    label: "Live products",
    value: "124",
    detail: "4 featured in current edits",
    icon: PackageCheck
  },
  {
    label: "Campaign readiness",
    value: "88%",
    detail: "Winter Reset almost launch-ready",
    icon: Megaphone
  },
  {
    label: "Translation coverage",
    value: "82%",
    detail: "62 strings pending across six languages",
    icon: Globe2
  }
];

export const adminNavigation = [
  { label: "Overview", href: "/admin", icon: BarChart3 },
  { label: "Products", href: "/admin/products", icon: Leaf },
  { label: "Inventory", href: "/admin/inventory", icon: PackageCheck },
  { label: "Collections", href: "/admin/collections", icon: Layers3 },
  { label: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
  { label: "Banners", href: "/admin/banners", icon: Images },
  { label: "Homepage", href: "/admin/homepage", icon: PanelTop },
  { label: "SEO", href: "/admin/seo", icon: FileSearch },
  { label: "Media", href: "/admin/media", icon: Images },
  { label: "Promotions", href: "/admin/promotions", icon: Percent },
  { label: "Content", href: "/admin/content", icon: Globe2 },
  { label: "Calendar", href: "/admin/calendar", icon: Activity },
  { label: "Audits", href: "/admin/audits", icon: BadgeCheck },
  { label: "Launch", href: "/admin/launch", icon: CheckSquare },
  { label: "Activity", href: "/admin/activity", icon: Activity },
  { label: "Permissions", href: "/admin/permissions", icon: Shield },
  { label: "Notifications", href: "/admin/notifications", icon: Bell },
  { label: "Markets", href: "/admin/markets", icon: Globe2 }
];
