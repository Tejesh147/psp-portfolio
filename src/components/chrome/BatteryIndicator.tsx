import { useEffect, useState } from "react";
import styles from "./battery.module.css";

export default function BatteryIndicator() {
  const [pct, setPct] = useState(80);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPct((p) => Math.max(0, p - 1));
    }, 60_000);
    return () => clearInterval(id);
  }, []);

  const cls = [styles.fill, pct <= 5 ? styles.low : pct <= 20 ? styles.warm : ""].join(" ");

  return (
    <span className={styles.battery} aria-hidden="true">
      <span className={styles.icon}><span className={cls} style={{ width: `${pct}%` }} /></span>
      <span className={styles.pct}>{pct}%</span>
    </span>
  );
}
