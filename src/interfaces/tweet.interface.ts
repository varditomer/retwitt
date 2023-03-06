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

    isRetweet: boolean,

    hashtags: string[],
    replies: Reply[],
    retweetedBy: [
        {
            retweeterId: string,
            retweetId: string
        }?
    ]
    savedBy: string[],
    likes: string[],
}

export interface Retweet {
    _id?: string,
    createdAt?: number,
    createdBy: string,
    retweetedTweetId: string
    isRetweet: boolean
}

export interface hashtags {
    _id?: string,
    hashtags: hashtag[]
}

export interface hashtag {
    key: string,
    occurrences: number
}