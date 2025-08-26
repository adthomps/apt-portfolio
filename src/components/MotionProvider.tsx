import React from "react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

type Props = {
  children: React.ReactNode;
};

/**
 * MotionProvider
 * - Provides global Motion configuration
 * - Honors OS reduced motion preference (opacity-only where applicable)
 * - Loads DOM animation features lazily to keep bundle lean
 */
export function MotionProvider({ children }: Props) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}

export default MotionProvider;
