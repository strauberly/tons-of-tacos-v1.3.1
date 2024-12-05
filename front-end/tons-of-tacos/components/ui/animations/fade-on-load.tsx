"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode } from "react";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: [0, 1] },
  exit: { opacity: 0 },
};

const FadeOnLoad = ({ children }: { children: ReactNode }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={animation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default FadeOnLoad;
