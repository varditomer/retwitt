export interface User {
    _id: string,
    createdAt: string,
    firstName: string,
    lastName: string,
    userName: string,
    about: string,
    profileImg: string,
    coverImg: string,
    following: string[],
    followers: string[],
    tweets: string[],
    savedTweets: string[]
}

export interface MiniUser {
    _id: string,
    firstName: string,
    lastName: string,
    profileImg: string,
}