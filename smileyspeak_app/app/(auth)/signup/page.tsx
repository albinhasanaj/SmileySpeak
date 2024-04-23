"use client";
import Button from '@/components/Button'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

type SignUpProps = {
    username: string;
    email: string;
    password: string;
};

const SignUp = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/');
        }
    }, [isAuthenticated, router]);

    const [values, setValues] = useState<SignUpProps>({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setIsAuthenticated(true);
            toast.success(data.message);
            router.push('/');
        } catch (error: any) {
            toast.error(error.message);
        }
    };

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
            <div className="flex flex-col gap-8 items-center">
                <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username"
                        className="md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4"
                        placeholder="DragonSlayer"
                        onChange={handleChange}
                        autoComplete="username"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email"
                        className="md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4"
                        placeholder="dragonslayer123@gmail.com"
                        onChange={handleChange}
                        autoComplete="email"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"
                        className="md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4"
                        placeholder='********'
                        onChange={handleChange}
                        autoComplete="current-password"
                    />
                </div>
                <Button text="Sign Up" />
            </div>
            <Link href="/login"
                className="text-[16px] md:text-[24px] text-[#0400B1]">Already have an account?</Link>
        </form>
    )
}

export default SignUp

// check if user is authenticated using getServerSideProps