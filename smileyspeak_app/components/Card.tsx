"use client";
import Image from 'next/legacy/image'
import React from 'react'

import toast from 'react-hot-toast';

interface CardProps {
    card_id: string;
    username: string;
    email: string;
    profilePic: string;
    comment: string;
    likes: number;
    tags: string[];
};

const Card = ({ card_id, username, email, profilePic, comment, likes, tags }: CardProps) => {
    const [likeCount, setlikeCount] = React.useState(likes);

    const handleLikeClick = async () => {
        try {
            const response = await fetch("/api/comments/like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, card_id }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            setlikeCount(data.likeCount);
            toast.success(data.message)

        } catch (error: any) {
            if (error.message === "Not authenticated") {
                return toast.error("Please log in to like a comment");
            }
            toast.error("An error occurred. Please try again.");
        }
    }

    return (
        <div className="w-[320px] flex flex-col gap-4 h-auto bg-white rounded-[5px] border-[1px] border-black py-4 px-6">
            <div className="flex justify-between">
                <div className="flex items-center gap-1">
                    <Image
                        src={profilePic}
                        alt="DragonSlayer Profile Pic"
                        width={48}
                        height={48}
                        className="rounded-full"
                    />
                    <div className="flex flex-col">
                        <span className="text-[18px] font-bold">{username}</span>
                        <a href={`mailto:${email}`} className="text-[14px] opacity-50">{email}</a>
                    </div>
                </div>
                <Image
                    src="/images/copyParagraph.png"
                    alt="Copy Paragraph"
                    width={24}
                    height={24}
                    className="cursor-pointer w-auto h-auto object-contain"
                    onClick={() => {
                        navigator.clipboard.writeText(comment);
                        toast.success("Copied to clipboard")
                    }}
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-[20px] break-words">{comment}</p>
            </div>
            <div className="flex flex-col gap-2 mt-auto">
                <div className="flex gap-1">
                    <Image
                        src="/images/heart.png"
                        alt="Like icon"
                        width={24}
                        height={24}
                        className="cursor-pointer"
                        onClick={handleLikeClick}
                    />
                    <span className="text-[16px]">{likeCount}</span>
                </div>
                <div className="flex gap-2">
                    {tags.map((tag) => {
                        if (tag.length === 0) return null;
                        return (
                            <span key={`${card_id}-${tag}`} className="text-[16px] text-[#0400B1]">#{tag.replace(" ", "")}</span>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default Card