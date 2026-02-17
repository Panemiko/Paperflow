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
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
