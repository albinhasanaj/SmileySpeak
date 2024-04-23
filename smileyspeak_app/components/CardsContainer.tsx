import React from 'react';
import Card from './Card';
import { filterComments, Comment } from '@/utils/filterComments';

export interface CardsContainerProps {
    comments: Comment[];
}

const CardsContainer: React.FC<CardsContainerProps> = ({ comments }) => {

    const filteredComments = filterComments(comments, 'likes');

    return (
        <section className="flex flex-col gap-4 items-center mb-4">
            <div className="flex gap-4">
                <h3 className="text-[20px]">Most Liked Comments</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-12 max-w-[1440px]">
                {filteredComments.map((comment) => (
                    <Card
                        key={comment.card_id}
                        card_id={comment.card_id}
                        username={comment.username}
                        profilePic={comment.profilePicture}
                        email={comment.email}
                        comment={comment.content}
                        likes={comment.like_count}
                        tags={[comment.hashtag1, comment.hashtag2, comment.hashtag3]}
                    />
                ))}
            </div>

        </section>
    )
}

export default CardsContainer