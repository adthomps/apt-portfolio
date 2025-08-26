import * as React from "react";

declare module "motion/react" {
  // Minimal ambient types to satisfy TS without pulling full types
  type MotionExtras = { [key: string]: unknown };
  export const m: {
    [K in keyof JSX.IntrinsicElements]: React.FC<
      JSX.IntrinsicElements[K] & MotionExtras
    >
  };
  export const domAnimation: unknown;
  export const LazyMotion: React.ComponentType<Record<string, unknown>>;
  export const MotionConfig: React.ComponentType<Record<string, unknown>>;
}
