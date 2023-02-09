export interface Reply {
    _id: string,
    createdAt: number,
    createdBy: string,
    content: string,
    imgUrl: string,
    likes: string[],

}

export interface Tweet {
    _id?: string,
    createdAt: number,
    createdBy: string,
    imgUrl: string,
    public: boolean,
    retweet: boolean,
    hashtags: string[],
    content: string,
    replies: Reply[],
    reTweeted: string[],
    savedBy: string[],
    likes: string[],
}