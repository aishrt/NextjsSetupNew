"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { animationTypes } from "@/theme/Animate/AnimationTypes";

interface AnimateAuthProps {
  children: React.ReactNode;
  name?: keyof typeof animationTypes;
}

export default function AnimatePage({
  children,
  name,
}: AnimateAuthProps) {
  const animations = animationTypes[name ?? "animate"];

  return (
    <AnimatePresence>
      <motion.div
        initial={animations.initial}
        animate={animations.animate}
        exit={animations.exit}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
