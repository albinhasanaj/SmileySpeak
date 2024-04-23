"use client";
import { useState, useEffect, lazy, Suspense, ChangeEvent } from "react";
import { MoonLoader } from "react-spinners";
const CardsContainer = lazy(() => import('@/components/CardsContainer'));
import toast from "react-hot-toast";

const Home = () => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Tracks the loading state
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchComments = async () => {
            setIsLoading(true);
            try {
                const url = search
                    ? `/api/comments/getComments?search=${encodeURIComponent(search)}`
                    : "/api/comments/getComments";

                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    setComments(data);
                } else {
                    throw new Error("Failed to fetch comments");
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch comments, please try again later");
            } finally {
                setIsLoading(false);
            }
        };

        fetchComments();
    }, [search]);



    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-center text-[48px] md:text-[64px] lg:text-[96px]">Discover & Share <span className="block h1__span__gradient">Fun & Joyful comments</span></h1>
                <p className="text-center text-[20px] md:text-[26px] lg:text-[40px] opacity-50">SmileySpeak is a free to use website to find the best<br />comments on planet earth!</p>
            </div>
            <div className="w-full flex flex-col gap-2 items-center">
                <label htmlFor="search" className="lg:text-[20px]">Search for a tag or a username</label>
                <input type="text" name="search" id="search" placeholder="#funny"
                    className="w-2/3 md:w-[500px] lg:w-[700px] p-4 box-shadow rounded-[5px] focus:outline-none"
                    value={search}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                />
            </div>
            <Suspense fallback={<MoonLoader />}
            >
                {isLoading ? (
                    // Loader will be shown when comments are being fetched
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MoonLoader />
                    </div>
                ) : comments.length === 0 ? (
                    // No comments message only shown after loading is finished
                    <h2 className="text-center text-[24px]">{"No comments :("}</h2>
                ) : (
                    // Render the CardsContainer if comments are present
                    <CardsContainer comments={comments} />
                )}
            </Suspense>
        </>
    );
};

export default Home;
