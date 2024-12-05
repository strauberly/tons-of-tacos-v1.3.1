"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: [0, 1, 0] },
  exit: { opacity: 0 },
};

const LoadingAnimation = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={animation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingAnimation;
