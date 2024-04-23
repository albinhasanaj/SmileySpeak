export const menuVariants = {
    open: {
        x: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.75
        }
    },
    closed: {
        x: "100%",
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.75
        }
    }
};