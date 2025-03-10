"use client";

import { Random, Range } from "kdim";
import config from "package.json";
import React from "react";

const BATTERY = "BATTERY";
const PASS = "PASS";
const COGNATES: Record<string, string> = {
  E: "3ΣΞ€Ǝ",
  A: "Λ",
  R: "2₹",
  T: "7",
  U: "Ʉ",
  " ": "_",
  O: "0",
  N: "Ɲ",
} as const;

export default function GlitchTitle() {
  const MIN_DELAY = 400;
  const MAX_DELAY = 2000;
  const GLITCH_CHANCE = 0.1;
  const GLITCH_DELAY = 30;

  const [battery, setBattery] = React.useState<string>(BATTERY);
  const [pass, setPass] = React.useState<string>(PASS);

  function glitchWord(original: string, odds: number[]): string {
    const swaps = Random.sample(odds)!;
    if (swaps === 0) return original;

    const glitched = [...original];
    const opts =
      original.length === 1
        ? [0]
        : Random.permutation(Range.of(original.length));
    for (let i = 0; i < swaps; i++) {
      const random = opts[i]!;
      glitched[random] = Random.sample<string>([
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        ...(COGNATES[original[random]!] ?? original[random])!,
      ])!;
    }

    return glitched.join("");
  }

  React.useEffect(() => {
    (function d() {
      setBattery(glitchWord(BATTERY, [0, 0, 0, 1, 1, 2, 2, 2, 3]));
      if (Math.random() < GLITCH_CHANCE) {
        const delay = Random.natural(MAX_DELAY - MIN_DELAY) + MIN_DELAY;
        const glitched = glitchWord(BATTERY, [2, 3, 4, 4, 5, 5, 5, 6, 6]);
        setTimeout(() => setBattery(BATTERY), delay);
        setTimeout(() => setBattery(glitched), delay + GLITCH_DELAY);
        setTimeout(() => setBattery(BATTERY), delay + GLITCH_DELAY * 2);
        setTimeout(() => setBattery(glitched), delay + GLITCH_DELAY * 3);
        setTimeout(d, delay + GLITCH_DELAY * 4);
      } else {
        setTimeout(d, Random.natural(MAX_DELAY - MIN_DELAY) + MIN_DELAY);
      }
    })();
    (function s() {
      setTimeout(s, Random.natural(MAX_DELAY - MIN_DELAY) + MIN_DELAY);
    })();
    (function m() {
      setPass(glitchWord(PASS, [0, 0, 0, 1, 1, 2, 2]));
      if (Math.random() < GLITCH_CHANCE) {
        const delay = Random.natural(MAX_DELAY - MIN_DELAY) + MIN_DELAY;
        const glitched = glitchWord(BATTERY, [1, 1, 2, 2, 3, 3]);
        setTimeout(() => setBattery(BATTERY), delay);
        setTimeout(() => setBattery(glitched), delay + GLITCH_DELAY);
        setTimeout(() => setBattery(BATTERY), delay + GLITCH_DELAY * 2);
        setTimeout(() => setBattery(glitched), delay + GLITCH_DELAY * 3);
        setTimeout(m, delay + GLITCH_DELAY * 4);
      } else {
        setTimeout(m, Random.natural(MAX_DELAY - MIN_DELAY) + MIN_DELAY);
      }
    })();
  }, []);

  return (
    <div>
      <h1 className="flex items-center text-4xl transition-all sm:text-8xl">
        <span>{battery}</span>
        <span>_</span>
        <span>{pass}</span>
      </h1>
      <p className="ml-[2px] inline-flex bg-green-400 p-1 text-xs text-black sm:ml-2 sm:text-sm">
        v{config.version}
      </p>
    </div>
  );
}
