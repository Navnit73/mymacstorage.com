import {
  ChartPie,
  Copy,
  Layers,
  LayoutGrid,
  Search,
  Trash2,
  type LucideIcon,
} from "lucide-react";

export type Feature = {
  name: string;
  description: string;
  icon: LucideIcon;
  /** Image URL or a path under /public. Leave null to show a placeholder. */
  image: string | null;
};

export const features: Feature[] = [
  {
    name: "Overview",
    description: "One scan, and your whole drive on one screen.",
    icon: ChartPie,
    image: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1793287028/overview_lfyfha.jpg",
  },
  {
    name: "Find",
    description: "Find any file as you type, in every folder, including hidden ones.",
    icon: Search,
    image: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1793287428/preview_w9ddeb.jpg",
  },
  {
    name: "Space",
    description: "Your biggest files and folders, listed first.",
    icon: LayoutGrid,
    image: "https://res.cloudinary.com/dipzpwbbk/image/upload/c_crop,x_0,y_5,w_2468,h_1644/v1793287591/space_sfc3mo.jpg",
  },
  {
    name: "Cleanup",
    description: "Caches, build files and old installers, grouped and added up.",
    icon: Trash2,
    image: "https://res.cloudinary.com/dipzpwbbk/image/upload/v1793287712/cleanup_jxvrl2.jpg",
  },
  {
    name: "Duplicates",
    description: "Files that exist twice, matched byte for byte.",
    icon: Copy,
    image: null,
  },
  {
    name: "Applications",
    description: "Every app with its full size, plus the leftovers it leaves behind.",
    icon: Layers,
    image: "https://res.cloudinary.com/dipzpwbbk/image/upload/c_crop,x_0,y_6,w_2478,h_1645/v1793287842/application_gbl72t.jpg",
  },
];
