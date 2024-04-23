"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const NavLi = ({ text }: { text: string }) => {
    const router = useRouter();
    const { setIsAuthenticated } = useAuth();
    const handleClick = async () => {
        if (text == "Log Out") {
            try {
                const response = await fetch("/api/auth/logout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("An error occurred");
                }

                toast.success("Logged out");
                setIsAuthenticated(false);
                return router.push("/");
            } catch (error) {
                return toast.error("An error occurred");
            }
        }
        router.push(text.toLowerCase() === "home" ? "/" : `/${text.toLowerCase().replace(" ", "")}`)
    }
    return (
        <li
            onClick={handleClick}
            className="cursor-pointer">
            {text}
        </li>
    )
}

export default NavLi