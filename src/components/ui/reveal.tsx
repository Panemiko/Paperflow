"use client";

import { motion, MotionProps } from "framer-motion";

interface RevealProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
}

export function Reveal({ children, className, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98], ...props.transition }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
