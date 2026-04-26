import { useEffect, useMemo } from "react";
import { useXmbNav, type XmbCategory } from "./useXmbNav";
import styles from "./xmb.module.css";

interface Props {
  categories: XmbCategory[];
  initialCategoryId?: string;
}

export default function XmbShell({ categories, initialCategoryId = "projects" }: Props) {
  const nav = useXmbNav(categories, { initialCategoryId });

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        nav.handleKey(e.key);
      } else if (e.key === "Enter") {
        if (nav.activeHref) window.location.assign(nav.activeHref);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nav]);

  const xCenter = useMemo(() => {
    const offset = nav.activeCategoryIndex * (80 + 80);
    return `calc(50% - 40px - ${offset}px)`;
  }, [nav.activeCategoryIndex]);

  return (
    <div className={styles.shell} role="navigation" aria-label="Main">
      <div className={styles.categories} style={{ transform: `translateX(${xCenter})` }}>
        {categories.map((cat, i) => {
          const dist = Math.abs(i - nav.activeCategoryIndex);
          const cls = [
            styles.category,
            i === nav.activeCategoryIndex ? styles.active : dist === 1 ? styles.adjacent : styles.inactive,
          ].join(" ");
          return (
            <button
              key={cat.id}
              type="button"
              className={cls}
              aria-current={i === nav.activeCategoryIndex ? "true" : undefined}
              onClick={() => nav.setActive(i, 0)}
            >
              <span className={styles.catIcon}>{/* icon slot — Task 19 */}</span>
              <span className={styles.catLabel}>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.subitems} aria-label={`${nav.activeCategory?.label ?? ""} items`}>
        {nav.activeCategory?.items.map((item, i) => {
          const isActive = i === nav.activeItemIndex;
          const className = [styles.subitem, isActive ? styles.active : ""].join(" ");
          return (
            <a
              key={item.id}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={className}
              onMouseEnter={() => nav.setActive(nav.activeCategoryIndex, i)}
              aria-current={isActive ? "true" : undefined}
            >
              <span>
                <span className={styles.subTitle}>{item.label}</span>
                {item.description && <div className={styles.subDesc}>{item.description}</div>}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
