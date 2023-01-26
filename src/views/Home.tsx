import React from 'react'
import SvgIcon from '../SvgIcon';

type Props = {}

export const Home: React.FC<Props> = (props) => {
    return (
        <section className="home">
            <section className="main-content">
                <div className="small-area">
                    <section className="add-tweet card">
                        <h2 className='card-title'>Tweet something</h2>
                        <div className="new-tweet">
                            <img src='src\assets\imgs\users\tomer-avatar.png' alt="user image" className="user-img" />
                            <span className="tweet-input">What’s happening?</span>
                        </div>
                        <div className="control-btns">
                            <div className="settings">
                                <SvgIcon iconName="img" wrapperStyle="follow" svgProp={{ stroke: "#2F80ED", fill: "#2F80ED" }} />
                                <SvgIcon iconName="earth" wrapperStyle="follow" svgProp={{ stroke: "#2F80ED", fill: "#2F80ED" }} />
                                <span className="who-can-reply">Everyone can reply</span>
                            </div>
                            <button className="btn-tweet">
                                <span>Tweet</span>
                            </button>
                        </div>
                    </section>
                    <section className="tweets-list">

                        <article className="tweet card">
                            <div className="card-header">
                                <img className="user-img" src='src\assets\imgs\users\refael-avatar.png' alt="user image" />
                                <div className="user-info">
                                    <span className="user-name">Refa Refa</span>
                                    <span className="user-followers">24 August at 20:43</span>
                                </div>
                            </div>
                            <p className="tweet-content">
                                Traveling – it leaves you speechless, then turns you into a storyteller.
                            </p>
                            <img className="tweet-img" src="src\assets\imgs\map_notebook.jpg" alt="" />
                            <section className="expose">
                                <div className="expose-info">
                                    <span>449 Comments</span>
                                    <span>59k Retweets</span>
                                    <span>234 Saved</span>
                                </div>
                                <div className="action-btns">
                                    <button className='action-btn'>
                                        <SvgIcon iconName="comment" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                        <span className="action-type">Comment</span>
                                    </button>
                                    <button className='action-btn'>
                                        <SvgIcon iconName="sync" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                        <span className="action-type">Retweet</span>
                                    </button>
                                    <button className='action-btn'>
                                        <SvgIcon iconName="like" wrapperStyle="" />
                                        <span className="action-type">Like</span>
                                    </button>
                                    <button className='action-btn'>
                                        <SvgIcon iconName="bookmark" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                        <span className="action-type">Save</span>
                                    </button>
                                </div>
                                <div className="add-reply">
                                    <img src='src\assets\imgs\users\tomer-avatar.png' alt="user image" className="user-img" />
                                    <input type="text" placeholder='Tweet your reply' className="tweet-input" />
                                    <SvgIcon iconName="img" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                                </div>
                            </section>

                            <section className="replies">
                                <div className="reply">
                                    <div className="reply-head">
                                        <img className="user-img" src='src\assets\imgs\users\ronen-avatar.png' alt="user image" />
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
                                        <img className="user-img" src='src\assets\imgs\users\tomer-avatar.png' alt="user image" />
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
                                <img className="user-img" src='src\assets\imgs\users\ronen-avatar.png' alt="user image" />
                                <div className="user-info">
                                    <span className="user-name">Ronen Boxer</span>
                                    <span className="user-followers">24 August at 20:43</span>
                                </div>
                            </div>
                            <p className="tweet-content">
                                “We travel, some of us forever, to seek other places, other lives, other souls.” – Anais Nin.
                            </p>
                            <img className="tweet-img" src="src\assets\imgs\canyon_tree.jpg" alt="" />
                            <section className="expose">
                                <div className="expose-info">
                                    <span>449 Comments</span>
                                    <span>59k Retweets</span>
                                    <span>234 Saved</span>
                                </div>
                                <div className="action-btns">
                                    <button className='action-btn'>
                                        <SvgIcon iconName="comment" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                        <span className="action-type">Comment</span>

                                    </button>
                                    <button className='action-btn retweet-active'>
                                        <SvgIcon iconName="sync" wrapperStyle="" svgProp={{ stroke: "#27AE60", fill: "#27AE60" }} />
                                        <span className="action-type">Retweet</span>

                                    </button>
                                    <button className='action-btn like-active'>
                                        <SvgIcon iconName="like" wrapperStyle="" svgProp={{ stroke: "#EB5757", fill: "#EB5757" }} />
                                        <span className="action-type">Like</span>

                                    </button>
                                    <button className='action-btn save-active'>
                                        <SvgIcon iconName="bookmark" wrapperStyle="" svgProp={{ stroke: "#2D9CDB", fill: "#2D9CDB" }} />
                                        <span className="action-type">Save</span>
                                    </button>
                                </div>
                                <div className="add-reply">
                                    <img src='src\assets\imgs\users\tomer-avatar.png' alt="user image" className="user-img" />
                                    <input type="text" placeholder='Tweet your reply' className="tweet-input" />
                                    <SvgIcon iconName="img" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                                </div>
                            </section>

                        </article>
                        <article className="tweet card">
                            <div className="card-header">
                                <img className="user-img" src='src\assets\imgs\users\ronen-avatar.png' alt="user image" />
                                <div className="user-info">
                                    <span className="user-name">Ronen Boxer</span>
                                    <span className="user-followers">24 August at 20:43</span>
                                </div>
                            </div>
                            <p className="tweet-content">
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
                                        <SvgIcon iconName="comment" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                        <span className="action-type">Comment</span>

                                    </button>
                                    <button className='action-btn'>
                                        <SvgIcon iconName="sync" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                        <span className="action-type">Retweet</span>

                                    </button>
                                    <button className='action-btn'>
                                        <SvgIcon iconName="like" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                        <span className="action-type">Like</span>

                                    </button>
                                    <button className='action-btn'>
                                        <SvgIcon iconName="bookmark" wrapperStyle="" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                        <span className="action-type">Save</span>
                                    </button>
                                </div>
                                <div className="add-reply">
                                    <img src='src\assets\imgs\users\tomer-avatar.png' alt="user image" className="user-img" />
                                    <input type="text" placeholder='Tweet your reply' className="tweet-input" />
                                    <SvgIcon iconName="img" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
                                </div>
                            </section>

                        </article>
                    </section>

                </div>
                <div className="small-area">
                    <section className="trends-list card">
                        <h2 className='card-title'>Trend for you</h2>
                        <ul role='list'>
                            <li>
                                <span className="trend-title">#programming</span>
                                <span className="trend-tweets-count">213k Tweets</span>
                            </li>
                            <li>
                                <span className="trend-title">#devchallenges</span>
                                <span className="trend-tweets-count">123k Tweets</span>
                            </li>
                            <li>
                                <span className="trend-title">#frontend</span>
                                <span className="trend-tweets-count">34k Tweets</span>
                            </li>
                            <li>
                                <span className="trend-title">#helsinki</span>
                                <span className="trend-tweets-count">11k Tweets</span>
                            </li>
                            <li>
                                <span className="trend-title">#100DaysOfCode</span>
                                <span className="trend-tweets-count">5k Tweets</span>
                            </li>
                        </ul>
                    </section>
                    <section className="who-to-follow card">
                        <h2 className='card-title'>Who to follow</h2>
                        <ul role='list' className="users-to-follow">
                            <li className='person-card'>
                                <div className="card-header ">
                                    <img className="user-img" src='src\assets\imgs\users\ronen-avatar.png' alt="user image" />
                                    <div className="user-info">
                                        <span className="user-name">Ronen Boxer</span>
                                        <span className="user-followers">230k followers</span>
                                    </div>
                                    <button className="btn-follow">
                                        <SvgIcon iconName="follow" wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                                        <span>Follow</span>
                                    </button>

                                </div>
                                <p className="headline">
                                    Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰
                                </p>
                                <img className="cover-img" src='src\assets\imgs\backpacker-cliff.jpg' alt="user image" />
                            </li>
                            <li className='person-card'>
                                <div className="card-header">
                                    <img className="user-img" src='src\assets\imgs\users\refael-avatar.png' alt="user image" />
                                    <div className="user-info">
                                        <span className="user-name">Refa Refa</span>
                                        <span className="user-followers">120k followers</span>
                                    </div>
                                    <button className="btn-follow">
                                        <SvgIcon iconName="follow" wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                                        <span>Follow</span>
                                    </button>
                                </div>
                                <p className="headline">
                                    Follow me on IG: @arstyy
                                </p>
                                <img className="cover-img" src='src\assets\imgs\cliff_jumping.png' alt="user image" />
                            </li>
                        </ul>
                    </section>
                </div>



            </section>
        </section>
    )
}