import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useVelocity, useTransform } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';

export const InkCursor = () => {
    const { cursorVariant } = useAppStore();
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Physics for the "Quill" effect
    // We want it to feel heavy, like a pen full of ink.
    const springConfig = { damping: 25, stiffness: 120, mass: 0.8 };
    const x = useSpring(cursorX, springConfig);
    const y = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, [cursorX, cursorY]);

    const variants = {
        default: {
            height: 16,
            width: 16,
            backgroundColor: "#1a1a1a",
            borderRadius: "50%",
            scale: 1
        },
        hover: {
            height: 40,
            width: 40,
            backgroundColor: "transparent",
            border: "2px solid #1a1a1a",
            borderRadius: "50%",
            scale: 1.1
        },
        drawing: {
            height: 8,
            width: 8,
            backgroundColor: "#ff4d4d",
            scale: 1.5
        }
    };

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        >
            <motion.div
                variants={variants}
                animate={cursorVariant}
                className="relative flex items-center justify-center transition-all duration-300"
            >
                {/* The Ink Splatter (only visible when hovering) */}
                {cursorVariant === 'hover' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 -z-10"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 animate-spin-slow">
                            <path d="M50 0 C60 20 80 30 100 50 C80 70 60 80 50 100 C40 80 20 70 0 50 C20 30 40 20 50 0 Z" fill="currentColor" />
                        </svg>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};
