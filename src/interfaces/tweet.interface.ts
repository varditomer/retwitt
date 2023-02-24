export interface Reply {
    _id: string,
    createdAt: number,
    createdBy: string,
    content: string,
    imgUrl?: string,
    likes: string[],
}

export interface Tweet {
    _id?: string,
    createdAt?: number,
    createdBy: string,
    isEveryOneCanReply: boolean,
    imgUrl: string,
    content: string,
    retweet: boolean,
    
    hashtags: string[],
    replies: Reply[],
    reTweetedBy: string[],
    savedBy: string[],
    likes: string[],
}