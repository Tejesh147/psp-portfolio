import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useXmbNav } from "../../src/components/xmb/useXmbNav";

const FIXTURE = [
  { id: "info", label: "Info", items: [{ id: "about", label: "About", href: "/about" }, { id: "contact", label: "Contact", href: "/contact" }] },
  { id: "network", label: "Network", items: [{ id: "github", label: "GitHub", href: "https://github.com/x" }] },
  { id: "projects", label: "Projects", items: [{ id: "p1", label: "P1", href: "/projects/p1" }, { id: "p2", label: "P2", href: "/projects/p2" }] },
];

describe("useXmbNav", () => {
  it("starts focused on the requested initial category and item 0", () => {
    const { result } = renderHook(() => useXmbNav(FIXTURE, { initialCategoryId: "projects" }));
    expect(result.current.activeCategoryIndex).toBe(2);
    expect(result.current.activeItemIndex).toBe(0);
  });

  it("ArrowRight moves to the next category and resets item index", () => {
    const { result } = renderHook(() => useXmbNav(FIXTURE, { initialCategoryId: "info" }));
    act(() => result.current.handleKey("ArrowRight"));
    expect(result.current.activeCategoryIndex).toBe(1);
    expect(result.current.activeItemIndex).toBe(0);
  });

  it("ArrowLeft moves to the previous category", () => {
    const { result } = renderHook(() => useXmbNav(FIXTURE, { initialCategoryId: "projects" }));
    act(() => result.current.handleKey("ArrowLeft"));
    expect(result.current.activeCategoryIndex).toBe(1);
  });

  it("ArrowRight at the last category does nothing", () => {
    const { result } = renderHook(() => useXmbNav(FIXTURE, { initialCategoryId: "projects" }));
    act(() => result.current.handleKey("ArrowRight"));
    expect(result.current.activeCategoryIndex).toBe(2);
  });

  it("ArrowDown moves down within the active category's items", () => {
    const { result } = renderHook(() => useXmbNav(FIXTURE, { initialCategoryId: "info" }));
    act(() => result.current.handleKey("ArrowDown"));
    expect(result.current.activeItemIndex).toBe(1);
  });

  it("ArrowUp at the top item does nothing (no wrap)", () => {
    const { result } = renderHook(() => useXmbNav(FIXTURE, { initialCategoryId: "info" }));
    act(() => result.current.handleKey("ArrowUp"));
    expect(result.current.activeItemIndex).toBe(0);
  });

  it("setActive(category, item) jumps directly", () => {
    const { result } = renderHook(() => useXmbNav(FIXTURE, { initialCategoryId: "info" }));
    act(() => result.current.setActive(2, 1));
    expect(result.current.activeCategoryIndex).toBe(2);
    expect(result.current.activeItemIndex).toBe(1);
  });

  it("activeHref returns the href of the focused item", () => {
    const { result } = renderHook(() => useXmbNav(FIXTURE, { initialCategoryId: "projects" }));
    act(() => result.current.handleKey("ArrowDown"));
    expect(result.current.activeHref).toBe("/projects/p2");
  });
});
