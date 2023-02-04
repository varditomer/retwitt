import SvgIcon from "../../SvgIcon";

export function Tweets() {
    return (
        <section className="tweets-list">
            <div className="css-1dbjc4n r-1kihuf0 r-1jgb5lz r-764hgp r-jzhu7e r-1dye5f7 r-13qz1uu" data-testid="emptyState">
                <div className="css-1dbjc4n r-h8hv3c r-1wzrnnt">
                    <div className="css-1dbjc4n r-1adg3ll r-1udh08x">
                        <div className="r-1adg3ll r-13qz1uu" style={{ paddingBottom: '50%' }}></div>
                        <div className="r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-ipm5af r-13qz1uu">
                            <div aria-label="" className="css-1dbjc4n r-1p0dtai r-1mlwlqe r-1d2f490 r-1udh08x r-u8s1d r-zchlnj r-ipm5af r-417010" data-testid="empty_state_illustration">
                                <div className="css-1dbjc4n r-1niwhzg r-vvn4in r-u6sd8q r-4gszlv r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw" style={{ backgroundImage: "url(https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png)" }}>
                                </div>
                                <img alt="" draggable="true" src="https://abs.twimg.com/responsive-web/client-web/book-in-bird-cage-400x200.v1.366bcfc9.png" className="css-9pa8cd" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="css-1dbjc4n">
                    <div dir="ltr" className="css-901oao r-18jsvk2 r-37j5jr r-1yjpyg1 r-1vr29t4 r-ueyrd6 r-5oul0u r-bcqeeo r-fdjqy7 r-qvutc0" data-testid="empty_state_header_text">
                        <span className="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Save Tweets for later</span>
                    </div>
                    <div dir="ltr" className="css-901oao r-14j79pv r-37j5jr r-a023e6 r-16dba41 r-rjixqe r-1nxhmzv r-bcqeeo r-fdjqy7 r-qvutc0" data-testid="empty_state_body_text">
                        <span className="css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0">Don’t let the good ones fly away! Bookmark Tweets to easily find them again in the future.</span>
                    </div>
                </div>
            </div>
            {/* <article className="tweet card">
                        <div className="card-header">
                            <img className="user-img" src='..\src\assets\imgs\users\refael-avatar.png' alt="user image" />
                            <div className="user-info">
                                <span className="user-name">Refa Refa</span>
                                <span className="user-followers">24 August at 20:43</span>
                            </div>
                        </div>
                        <p className="tweet-txt">
                            Traveling – it leaves you speechless, then turns you into a storyteller.
                        </p>
                        <img className="tweet-img" src="..\src\assets\imgs\map_notebook.jpg" alt="" />
                        
                        <div className="expose-info">
                            <span>449 Comments</span>
                            <span>59k Retweets</span>
                            <span>234 Saved</span>
                        </div>

                        <div className="action-btns">
                            <button className='action-btn'>
                                <SvgIcon iconName="reply" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                <span className="action-type">Comment</span>
                            </button>
                            <button className='action-btn retweet'>
                                <SvgIcon iconName="sync" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                <span className="action-type">Retweet</span>
                            </button>
                            <button className='action-btn like'>
                                <SvgIcon iconName="like" wrapperStyle="" />
                                <span className="action-type">Like</span>
                            </button>
                            <button className='action-btn bookmark'>
                                <SvgIcon iconName="bookmark" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                <span className="action-type">Save</span>
                            </button>
                        </div>

                        <div className="add-reply">
                            <img src='..\src\assets\imgs\users\tomer-avatar.png' alt="user image" className="user-img" />
                            <input type="text" placeholder='Tweet your reply' className="reply-input" />
                            <SvgIcon iconName="img" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                        </div>

                        <section className="replys">
                            <div className="reply">
                                <div className="reply-head">
                                    <img className="user-img" src='..\src\assets\imgs\users\ronen-avatar.png' alt="user image" />
                                    <div className="reply-body">
                                        <div className="user-info">
                                            <span className="user-name">Ronen Boxer</span>
                                            <span className="user-followers">24 August at 20:43</span>
                                        </div>
                                        <p className="reply-content">
                                            I’ve seen awe-inspiring things that I thought I’d never be able to explain to another person.
                                        </p>
                                    </div>
                                </div>
                                <div className="reply-action">
                                    <div className="like">
                                        <SvgIcon iconName="like" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                                        <span>like</span>
                                    </div>
                                    <span className="likes-count">12k Likes</span>
                                </div>
                            </div>
                            <div className="reply">
                                <div className="reply-head">
                                    <img className="user-img" src='..\src\assets\imgs\users\tomer-avatar.png' alt="user image" />
                                    <div className="reply-body">
                                        <div className="user-info">
                                            <span className="user-name">Tomer Vardi</span>
                                            <span className="user-followers">24 August at 20:43</span>
                                        </div>
                                        <p className="reply-content">
                                            I’ve felt this pull many times, like while road tripping through Morocco. Seeking out the vastness of the desert, and looking inward at the same time.
                                        </p>
                                    </div>
                                </div>
                                <div className="reply-action">
                                    <div className="like">
                                        <SvgIcon iconName="like" wrapperStyle="add-photo" svgProp={{ stroke: "#EB5757", fill: "#EB5757" }} />
                                        <span className='like-active'>liked</span>
                                    </div>
                                    <span className="likes-count">12k Likes</span>
                                </div>
                            </div>

                        </section>

                    </article>
                    <article className="tweet card">
                        <div className="card-header">
                            <img className="user-img" src='..\src\assets\imgs\users\ronen-avatar.png' alt="user image" />
                            <div className="user-info">
                                <span className="user-name">Ronen Boxer</span>
                                <span className="user-followers">24 August at 20:43</span>
                            </div>
                        </div>
                        <p className="tweet-txt">
                            “We travel, some of us forever, to seek other places, other lives, other souls.” – Anais Nin.
                        </p>
                        <img className="tweet-img" src="..\src\assets\imgs\canyon_tree.jpg" alt="" />
                        <section className="expose">
                            <div className="expose-info">
                                <span>449 Comments</span>
                                <span>59k Retweets</span>
                                <span>234 Saved</span>
                            </div>
                            <div className="action-btns">
                                <button className='action-btn'>
                                    <SvgIcon iconName="reply" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                    <span className="action-type">Comment</span>
                                </button>
                                <button className='action-btn retweet active'>
                                    <SvgIcon iconName="sync" wrapperStyle="" svgProp={{ stroke: "#27AE60", fill: "#27AE60" }} />
                                    <span className="action-type">Retweet</span>
                                </button>
                                <button className='action-btn like active'>
                                    <SvgIcon iconName="like" wrapperStyle="" svgProp={{ stroke: "#EB5757", fill: "#EB5757" }} />
                                    <span className="action-type">Like</span>
                                </button>
                                <button className='action-btn bookmark active'>
                                    <SvgIcon iconName="bookmark" wrapperStyle="" svgProp={{ stroke: "#2D9CDB", fill: "#2D9CDB" }} />
                                    <span className="action-type">Save</span>
                                </button>
                            </div>
                            <div className="add-reply">
                                <img src='..\src\assets\imgs\users\tomer-avatar.png' alt="user image" className="user-img" />
                                <input type="text" placeholder='Tweet your reply' className="tweet-input" />
                                <SvgIcon iconName="img" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                            </div>
                        </section>

                    </article>
                    <article className="tweet card">
                        <div className="card-header">
                            <img className="user-img" src='..\src\assets\imgs\users\ronen-avatar.png' alt="user image" />
                            <div className="user-info">
                                <span className="user-name">Ronen Boxer</span>
                                <span className="user-followers">24 August at 20:43</span>
                            </div>
                        </div>
                        <p className="tweet-txt">
                            “The gladdest moment in human life, methinks, is a departure into unknown lands.” – Sir Richard Burton
                        </p>
                        <section className="expose">
                            <div className="expose-info">
                                <span>449 Comments</span>
                                <span>59k Retweets</span>
                                <span>234 Saved</span>
                            </div>
                            <div className="action-btns">
                                <button className='action-btn'>
                                    <SvgIcon iconName="reply" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                    <span className="action-type">Comment</span>

                                </button>
                                <button className='action-btn retweet'>
                                    <SvgIcon iconName="sync" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                    <span className="action-type">Retweet</span>

                                </button>
                                <button className='action-btn like'>
                                    <SvgIcon iconName="like" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                    <span className="action-type">Like</span>

                                </button>
                                <button className='action-btn bookmark'>
                                    <SvgIcon iconName="bookmark" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                    <span className="action-type">Save</span>
                                </button>
                            </div>
                            <div className="add-reply">
                                <img src='..\src\assets\imgs\users\tomer-avatar.png' alt="user image" className="user-img" />
                                <input type="text" placeholder='Tweet your reply' className="tweet-input" />
                                <SvgIcon iconName="img" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                            </div>
                        </section>

                    </article> */}
        </section>
    )
}