import React from 'react'
import { TweetList } from '../components/tweet_cmps/TweetList';
import SvgIcon from '../SvgIcon';


export const Home: React.FC = () => {
    return (
        <section className="home page">

            <section className="large-area">
                <article className="add-tweet card">
                    <h2 className='card-title'>Tweet something</h2>
                    <div className="card-header new-tweet">
                        <img src='src\assets\imgs\users\tomer-avatar.png' alt="user image" className="user-img" />
                        <span className="tweet-input">What’s happening?</span>
                    </div>
                    <div className="control-btns">
                        <div className="settings">
                            <SvgIcon iconName="img" wrapperStyle="img-icon" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                            <div className="public-settings">
                                <div className="public-settings-signs-wrapper">
                                    <SvgIcon iconName="earth" wrapperStyle="public-settings-icon" svgProp={{ stroke: "#4F4F4F", fill: "#4F4F4F" }} />
                                    <span className='public-settings-txt'>Everyone can reply</span>
                                </div>
                                <article className="public-settings-modal modal" hidden>
                                    <h2 className='modal-title'>Who can reply?</h2>
                                    <h3 className='modal-subtitle'>Choose who can reply to this Tweet.</h3>
                                    <div className="modal-item">
                                        <SvgIcon iconName="earth" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                        <span className="card-item-txt">Everyone</span>
                                    </div>
                                    <div className="modal-item">
                                        <SvgIcon iconName="people" wrapperStyle="card-item-icon" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                                        <span className="card-item-txt">People you follow</span>
                                    </div>
                                </article>
                            </div>
                        </div>

                        <button className="btn-tweet">
                            <span>Tweet</span>
                        </button>
                    </div>
                </article>

                <TweetList />

            </section>
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
                            <div className="card-header">
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
                            <p className="about">
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
                            <p className="about">
                                Follow me on IG: @arstyy
                            </p>
                            <img className="cover-img" src='src\assets\imgs\cliff_jumping.png' alt="user image" />
                        </li>
                    </ul>
                </section>
            </div>
        </section>
    )
}