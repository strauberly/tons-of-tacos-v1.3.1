"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";

const DropDown = ({ children }: { children: ReactNode }) => {
  function getWidth() {
    const { innerWidth } = window;
    return innerWidth;
  }

  const [windowSize, setWindowSize] = useState(getWidth());

  const cartRoof = useRef(cartTop());

  function cartTop() {
    let roof;
    switch (true) {
      case windowSize > 1400:
        roof = "3.525vw";
        break;
      case windowSize < 1400 && windowSize > 800:
        roof = "6vw";
        break;
      case windowSize < 800:
        roof = "8vw";
        break;
    }
    return roof;
  }

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWidth());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      switch (true) {
        case windowSize > 1400:
          cartRoof.current = "3.525vw";
          break;
        case windowSize < 1400 && windowSize > 800:
          cartRoof.current = "6.66vw";
          break;
        case windowSize < 800:
          cartRoof.current = "10vw";
          break;
      }
    };
  }, [windowSize]);

  const animation = {
    initial: { scaleY: 0, originY: cartRoof.current },
    animate: { scaleY: 1 },
    exit: { scaleY: 0 },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={animation}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default DropDown;
