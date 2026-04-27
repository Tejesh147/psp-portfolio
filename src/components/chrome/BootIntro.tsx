import { useEffect, useState } from "react";
import styles from "./boot-intro.module.css";

const STORAGE_KEY = "psp:boot-played";

export default function BootIntro() {
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    const replay = new URLSearchParams(window.location.search).get("replay-boot") === "1";
    const played = localStorage.getItem(STORAGE_KEY) === "1";
    setShow(replay || !played);
    if (replay || !played) localStorage.setItem(STORAGE_KEY, "1");
  }, []);

  useEffect(() => {
    if (!show) return;
    function skip() { setShow(false); }
    const t = setTimeout(skip, 2000);
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("click",  skip, { once: true });
    window.addEventListener("scroll", skip, { once: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skip);
      window.removeEventListener("scroll", skip);
    };
  }, [show]);

  if (!show) return null;
  return (
    <div className={styles.overlay} role="presentation">
      <div className={styles.wordmark}>PERSONAL STATION PORTABLE™</div>
    </div>
  );
}
