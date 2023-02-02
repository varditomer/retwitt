import { MiniUser } from "./user.interface";

export interface Like {
    _id: string,
    createdAt: string,
    createdBy: string,
}

export interface Reply {
    _id: string,
    createdAt: string,
    createdBy: MiniUser,
    content: string,
    imgUrl: string,
    likes: string[],

}

export interface Tweet {
    _id: string,
    createdAt: string,
    createdBy: MiniUser,
    imgUrl: string,
    public: boolean,
    retweet: boolean,
    hashtags: string[],
    content: string,
    replies: Reply[],
    reTweeted: string[],
    saved: string[],
    likes: Like[],
}