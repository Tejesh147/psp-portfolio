import { useEffect } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

export default function KonamiListener() {
  useEffect(() => {
    let buf: string[] = [];
    function onKey(e: KeyboardEvent) {
      buf.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
      buf = buf.slice(-SEQUENCE.length);
      if (buf.length === SEQUENCE.length && buf.every((k, i) => k === SEQUENCE[i])) {
        window.location.assign("/?replay-boot=1");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}
