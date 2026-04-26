import { useCallback, useState } from "react";

export interface XmbItem {
  id: string;
  label: string;
  href: string;
  description?: string;
  external?: boolean;
}

export interface XmbCategory {
  id: string;
  label: string;
  iconName?: string;
  items: XmbItem[];
}

interface Options {
  initialCategoryId: string;
}

export function useXmbNav(categories: XmbCategory[], { initialCategoryId }: Options) {
  const initialIdx = Math.max(0, categories.findIndex((c) => c.id === initialCategoryId));
  const [activeCategoryIndex, setCategoryIndex] = useState(initialIdx);
  const [activeItemIndex, setItemIndex] = useState(0);

  const setActive = useCallback((cat: number, item: number) => {
    setCategoryIndex(Math.min(Math.max(cat, 0), categories.length - 1));
    setItemIndex(Math.min(Math.max(item, 0), Math.max(0, (categories[cat]?.items.length ?? 1) - 1)));
  }, [categories]);

  const handleKey = useCallback((key: string) => {
    if (key === "ArrowRight") {
      setCategoryIndex((c) => {
        const next = Math.min(c + 1, categories.length - 1);
        if (next !== c) setItemIndex(0);
        return next;
      });
    } else if (key === "ArrowLeft") {
      setCategoryIndex((c) => {
        const next = Math.max(c - 1, 0);
        if (next !== c) setItemIndex(0);
        return next;
      });
    } else if (key === "ArrowDown") {
      setItemIndex((i) => Math.min(i + 1, (categories[activeCategoryIndex]?.items.length ?? 1) - 1));
    } else if (key === "ArrowUp") {
      setItemIndex((i) => Math.max(i - 1, 0));
    }
  }, [categories, activeCategoryIndex]);

  const activeCategory = categories[activeCategoryIndex];
  const activeItem = activeCategory?.items[activeItemIndex];
  const activeHref = activeItem?.href ?? "";

  return {
    activeCategoryIndex,
    activeItemIndex,
    activeCategory,
    activeItem,
    activeHref,
    setActive,
    handleKey,
  };
}
