"use client";

import { motion } from "framer-motion";
import React, { ReactNode } from "react";

const animation = {
  initial: {},
  animate: {},
  exit: {},
};

const CartQuantityChange = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default CartQuantityChange;
