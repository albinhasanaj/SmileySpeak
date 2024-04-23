CREATE TABLE Users (
    id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    profilePicture VARCHAR(255) DEFAULT NULL,
    password VARCHAR(255) NOT NULL
);
--@block
SELECT *
FROM Users;
--@block
CREATE TABLE Cards (
    card_id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    content VARCHAR(255) NOT NULL,
    -- max 255 characters can be stored as content
    like_count INT DEFAULT 0,
    hashtag1 VARCHAR(255),
    hashtag2 VARCHAR(255),
    hashtag3 VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);
--@block
SELECT *
FROM Cards;
--@block
CREATE TABLE Likes (
    user_id VARCHAR(36) NOT NULL,
    card_id VARCHAR(36) NOT NULL,
    liked BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (user_id, card_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (card_id) REFERENCES Cards(card_id)
);
--@block
SELECT *
FROM Likes;
--
--
--
--
--
--
--
--
-- CLEAR DB COMMANDS
-- DO NOT RUN IN PRODUCTION
-- BE CAREFUL IN DEVELOPMENT
-- BE CAREFUL IN TESTING
-- JUST BE CAREFUL
--@block
-- DELETE FROM Users;
--@block
-- DELETE FROM Cards;
--@block
-- DELETE FROM Likes;