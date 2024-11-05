//In adding new style p also add that in constant file  in  src/@core/constants.ts

export const animationTypes = {
    animate: {
        initial: { opacity: 0, x: -1000 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 300 },
    },
    bounceAnimations: {
        initial: { scale: 0.5, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 1.5, opacity: 0 },
    },
    fadeSlideAnimations: {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
    },
    rotateAnimations: {
        initial: { opacity: 0, rotate: -180 },
        animate: { opacity: 1, rotate: 0 },
        exit: { opacity: 0, rotate: 180 },
    },
    zoomAnimations: {
        initial: { scale: 0, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        exit: { scale: 0, opacity: 0 },
    },
    slideLeftRightAnimations: {
        initial: { opacity: 0, x: -100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 },
    },
    flipAnimations: {
        initial: { opacity: 0, rotateY: -180 },
        animate: { opacity: 1, rotateY: 0 },
        exit: { opacity: 0, rotateY: 180 },
    },
    stretchAnimations: {
        initial: { scaleX: 0, scaleY: 0, opacity: 0 },
        animate: { scaleX: 1, scaleY: 1, opacity: 1 },
        exit: { scaleX: 0, scaleY: 0, opacity: 0 },
    },
    slideInRight: {
        initial: { opacity: 0, x: 100 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -100 },
    },
    slideInUp: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -50 },
    },
    slideInDown: {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
    },
    rotateIn: {
        initial: { opacity: 0, rotate: 180 },
        animate: { opacity: 1, rotate: 0 },
        exit: { opacity: 0, rotate: -180 },
    },
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    shake: {
        initial: { x: 0 },
        animate: { x: [0, 10, -10, 10, -10, 0] },
        exit: { opacity: 0 },
    },
    pulse: {
        initial: { scale: 1 },
        animate: { scale: [1, 1.1, 1] },
        exit: { scale: 0 },
    },
    lightSpeedInRight: {
        initial: { opacity: 0, transform: "translate3d(100%, 0, 0)" },
        animate: { opacity: 1, transform: "translate3d(0, 0, 0)" },
        exit: { opacity: 0, transform: "translate3d(-30%, 0, 0)" },
    },
};
