import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./sound-toggle.module.css";

const STORAGE_KEY = "psp:sound-on";
const EVENT_NAME = "psp:nav-blip";
// TODO: drop a real blip.ogg into public/. Until then, the audio request 404s
// silently — the toggle still works as UI; users just get no sound.
const BLIP_URL = "/blip.ogg";

export default function SoundToggle() {
  const [on, setOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setOn(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  useEffect(() => {
    if (!on) return;
    const a = new Audio(BLIP_URL);
    a.volume = 0.4;
    audioRef.current = a;
    function play() { a.currentTime = 0; a.play().catch(() => {}); }
    window.addEventListener(EVENT_NAME, play);
    return () => window.removeEventListener(EVENT_NAME, play);
  }, [on]);

  function toggle() {
    setOn((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }

  return (
    <button
      type="button"
      className={[styles.toggle, on ? styles.on : ""].join(" ")}
      onClick={toggle}
      aria-label={on ? "Disable navigation sound" : "Enable navigation sound"}
      aria-pressed={on}
    >
      {on ? <Volume2 size={14} /> : <VolumeX size={14} />}
    </button>
  );
}
