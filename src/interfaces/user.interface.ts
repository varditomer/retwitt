export interface User extends UserCredentials{
    _id: string,
    createdAt: number,
    about: string,
    profileImg: string,
    coverImg: string,
    follows: string[],
    followers: string[],
    savedTweets: string[],
    isGuest: boolean
}

export interface UserCredentials {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
}
