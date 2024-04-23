"use client";
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import Button from '@/components/Button'
import toast from 'react-hot-toast'
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const CreateComment = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const [comment, setComment] = useState({
        commentext: '',
        tags: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setComment({
            ...comment,
            [e.target.name]: e.target.value
        });
        console.log(comment);
    }

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (comment.tags.split(",").length > 3) {
                return toast.error("You can only have 3 tags");
            }
            const response = await fetch("api/comments/createComment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(comment)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

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
            <div className="flex flex-col gap-4 md:gap-8 items-center">
                <div className="flex flex-col">
                    <label htmlFor="comment">Comment</label>
                    <textarea id="comment" name="comment"
                        className="md:w-[300px] lg:w-[400px] h-[100px] md:h-[150px] rounded-[5px] box-shadow focus:outline-none p-4"
                        placeholder="Remember when I said I'd never try yoga?..." maxLength={250}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="tags">Tags (max 3)</label>
                    <input type="text" id="tags" name="tags"
                        className="md:w-[300px] lg:w-[400px] h-[35px] md:h-[50px] rounded-[5px] box-shadow focus:outline-none p-4"
                        placeholder="Funny, YogaLaughs, haha"
                        onChange={handleChange}
                    />
                </div>
                <Button text="Create Comment" />
            </div>
        </form>
    )
}

export default CreateComment