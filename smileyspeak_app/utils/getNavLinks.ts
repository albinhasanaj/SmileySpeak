export const getNavLinks = (pathname: any, isAuthenticated: boolean) => {
    if (!isAuthenticated) {
        if (pathname?.includes("/login")) return ["Home", "Sign Up"];
        if (pathname?.includes("/signup")) return ["Home", "Log In"];
        return ["Sign Up", "Log In"];
    }

    if (pathname?.includes("/createcomment")) return ["Home", "Settings"];
    if (pathname?.includes("/settings")) return ["Home", "Log Out"];
    return ["Create Comment", "Settings"];
};
