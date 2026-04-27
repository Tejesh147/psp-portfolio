import { useEffect, useState } from "react";
import styles from "./memory-stick.module.css";

const EVENT = "psp:memory-stick-access";

export function triggerMemoryStickAccess(href: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: { href } }));
}

export default function MemoryStickAccess() {
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => {
    function on(e: Event) {
      const detail = (e as CustomEvent).detail as { href: string };
      setPending(detail.href);
      window.setTimeout(() => {
        window.location.assign(detail.href);
      }, 200);
    }
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);

  if (!pending) return null;
  return (
    <div className={styles.overlay} role="status" aria-live="polite">
      <div className={styles.tag}>ACCESSING MEMORY STICK...</div>
    </div>
  );
}
