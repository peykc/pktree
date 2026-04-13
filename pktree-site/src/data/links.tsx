import {
  SiGithub,
  SiSteam,
  SiX,
} from "react-icons/si";
import type { ProfileLink } from "../types";

// Custom icon component for PKCollection using the uploaded transparent logo
const PKCollectionIcon = (props: any) => (
  <img 
    src="/pk-logo.png" 
    alt="PKCollection" 
    style={{ width: "1.5rem", height: "1.5rem", objectFit: "contain" }}
    {...props}
  />
);

export const profileLinks: ProfileLink[] = [
  {
    id: "pkcollection",
    label: "PKCollection",
    description: "pkcollection.net",
    href: "https://pkcollection.net",
    icon: PKCollectionIcon,
  },
  {
    id: "github",
    label: "GitHub",
    description: "Code, releases, and project issue trackers",
    href: "https://github.com/peykc",
    icon: SiGithub,
  },
  {
    id: "steam",
    label: "Steam",
    description: "Gaming profile and library",
    href: "https://steamcommunity.com/id/peykc",
    icon: SiSteam,
  },
  {
    id: "x",
    label: "X / Twitter",
    description: "Build logs, shipping notes, and updates",
    href: "https://x.com/peykc",
    icon: SiX,
  },
];
