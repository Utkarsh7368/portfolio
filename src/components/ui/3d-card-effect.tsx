"use client";

import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  // Use Motion Values and Springs for silky smooth performance
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    
    // Calculate rotation: center of card is 0,0
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    
    const xPct = (mouseX / width - 0.5) * 60; // Max 30deg rotate
    const yPct = (mouseY / height - 0.5) * -60; // Max 30deg rotate

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-10 flex items-center justify-center",
          containerClassName
        )}
        style={{
          perspective: "600px",
        }}
      >
        <motion.div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className={cn(
            "flex items-center justify-center relative transition-shadow duration-300",
            className
          )}
        >
          {children}
        </motion.div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}) => {
  const [isMouseEntered] = useMouseEnter();

  // Use framer-motion for the pop-up effect instead of CSS transitions
  // This ensures syncing with the container's spring motion
  return (
    <motion.div
      animate={{
        translateX: isMouseEntered ? translateX : 0,
        translateY: isMouseEntered ? translateY : 0,
        translateZ: isMouseEntered ? translateZ : 0,
        rotateX: isMouseEntered ? rotateX : 0,
        rotateY: isMouseEntered ? rotateY : 0,
        rotateZ: isMouseEntered ? rotateZ : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 20,
      }}
      className={cn("w-fit", className)}
      {...rest}
    >
      {Tag !== "div" ? <Tag>{children}</Tag> : children}
    </motion.div>
  );
};

// Create a hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};
