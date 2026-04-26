import { getCollection } from "astro:content";
import type { XmbCategory } from "../components/xmb/useXmbNav";

export async function buildXmbCategories(): Promise<XmbCategory[]> {
  const projects = await getCollection("projects", ({ data }) => !data.draft);
  const personal = await getCollection("personal");

  const projectsSorted = [...projects].sort((a, b) => a.data.order - b.data.order);
  const personalSorted = [...personal].sort((a, b) => a.data.order - b.data.order);

  return [
    {
      id: "info",
      label: "Info",
      iconName: "info",
      items: [
        { id: "about",   label: "About",       href: "/about",   description: "INFO/ABOUT" },
        { id: "system",  label: "System Info", href: "/system",  description: "INFO/SYSTEM" },
        { id: "contact", label: "Contact",     href: "/contact", description: "INFO/CONTACT" },
      ],
    },
    {
      id: "network",
      label: "Network",
      iconName: "network",
      items: [
        { id: "email",    label: "Email",    href: "mailto:tejesh.arujuna@example.com", description: "MAIL://", external: true },
        { id: "github",   label: "GitHub",   href: "https://github.com/Tejesh147",     description: "GH://",   external: true },
        { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/tejesh-arujuna", description: "IN://", external: true },
        { id: "x",        label: "X",        href: "https://x.com/",                    description: "X://",    external: true },
      ],
    },
    {
      id: "files",
      label: "Files",
      iconName: "files",
      items: [
        { id: "resume", label: "Resume.pdf", href: "/resume.pdf", description: "FILES/RESUME", external: true },
      ],
    },
    {
      id: "projects",
      label: "Projects",
      iconName: "projects",
      items: projectsSorted.map((p) => ({
        id: p.id,
        label: p.data.title,
        href: `/projects/${p.id}`,
        description: `PRJ://${String(p.data.order).padStart(3, "0")}`,
      })),
    },
    {
      id: "personal",
      label: "Personal",
      iconName: "personal",
      items: personalSorted.map((p) => ({
        id: p.id,
        label: p.data.title,
        href: `/personal/${p.id}`,
        description: `PERSONAL/${p.data.title.toUpperCase()}`,
      })),
    },
  ];
}
