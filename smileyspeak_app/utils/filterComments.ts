export interface Comment {
    card_id: string;
    username: string;
    email: string;
    content: string;
    profilePicture: string;
    like_count: number;
    hashtag1: string;
    hashtag2: string;
    hashtag3: string;
};

export function filterComments(comments: Comment[], sort: 'likes'): Comment[] {
    if (sort === "likes") {
        // Sort comments by like count in descending order
        return [...comments].sort((a, b) => b.like_count - a.like_count);
    }
    return comments;
}