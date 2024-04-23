"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";

import Image from "next/image";
import Button from "@/components/Button";

const Settings = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    const [values, setValues] = useState({
        changeusername: "",
        changeemail: "",
        changepassword: "",
        oldpassword: ""
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/changeCredentials", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong!");
            }

            toast.success("Credentials updated successfully!")
            router.push("/");


        } catch (error: any) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated]);


    return (
        <form onSubmit={handleSubmit} className="w-[300px] sm:w-[350px] h-auto md:w-[450px] py-8 md:py-16 lg:w-[600px] rounded-[50px] bg-[#C4C4C4] border-black border-[1px] flex flex-col items-center gap-12 justify-center">
            <div className="size-[64px] lg:size-[128px] relative">
                <Image
                    src="/images/smileylogo.png"
                    alt="SmileySpeak Logo"
                    layout="fill"
                    objectFit="cover"
                    sizes="100%"
                />
            </div>
            <div className="flex flex-col gap-4 md:gap-8 items-center">
                <div className="flex flex-col">
                    <label htmlFor="changeusername">Change username</label>
                    <input type="text" id="changeusername" name="changeusername"
                        className="md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4"
                        placeholder="DragonSlayer"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="changeemail">Change Email Address</label>
                    <input type="changeemail" id="changeemail" name="changeemail"
                        className="md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4"
                        placeholder='DragonSlayer@gmail.com'
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                        <label htmlFor="changepassword">Change Password</label>
                        <input type="password" id="changepassword" name="changepassword"
                            className="md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4"
                            placeholder="********"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="oldpassword">Confirm Old Password</label>
                        <input type="password" id="oldpassword" name="oldpassword"
                            className="md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4"
                            placeholder="********"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <Button text="Submit" redirect={false} />
            </div>
        </form>
    )
}

export default Settings