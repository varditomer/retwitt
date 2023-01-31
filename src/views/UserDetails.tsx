import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import SvgIcon from '../SvgIcon';

type Props = {}

export const UserDetails: React.FC<Props> = (props) => {
    return (
        <section className="user-details">
            <img src="..\src\assets\imgs\map_notebook.jpg" alt="" className="cover-img" />
            <section className="user-profile  page">
                <div className="card-header card">
                    <img className="user-img" src='\src\assets\imgs\users\tomer-avatar.png' alt="user image" />
                    <div className="user-info-container">
                        <div className="user-statistics">
                            <span className="user-name">Tomer Vardi</span>
                            <div className="user-info">
                                <span className="user-followers"><span className="emphasized">30k</span> Following </span>
                                <span className="user-followers"><span className="emphasized">230k</span> Followers</span>
                            </div>
                            <button className="btn-follow">
                                <SvgIcon iconName="follow" wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                                <span>Follow</span>
                            </button>
                        </div>
                        <p className="about">
                            Photographer & Filmmaker based in Copenhagen, Denmark ✵ 🇩🇰
                        </p>
                    </div>
                </div>
            </section>

            <section className="main-content page">
                <div className="small-area">
                    <section className="tweets-filter card">
                        <ul role='list'>
                            <li>
                                <div className="border"></div>
                                <NavLink to='tweets'>
                                    <span className="filter-title">Tweets</span>
                                </NavLink>
                            </li>
                            <li>
                                <div className="border"></div>
                                <NavLink to='tweets_replies'>
                                    <span className="filter-title">Tweets & replies</span>
                                </NavLink>
                            </li>
                            <li>
                                <div className="border"></div>
                                <NavLink to='media'>
                                    <span className="filter-title">Media</span>
                                </NavLink>
                            </li>
                            <li>
                                <div className="border"></div>
                                <NavLink to='likes'>
                                    <span className="filter-title">Likes</span>
                                </NavLink>
                            </li>
                        </ul>
                    </section>
                </div>
                <div className="large-area">
                    <Outlet />
                </div>
            </section>
        </section>
    )
}
