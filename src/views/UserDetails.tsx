import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { INITIAL_STATE, UserState } from '../interfaces/state.interface';
import { User } from '../interfaces/user.interface';
import { loadUsers } from '../store/actions/user.action';
import SvgIcon from '../SvgIcon';

type Props = {}

export const UserDetails: React.FC<Props> = () => {
    const users = useSelector((state: UserState) => state.userModule.users)
    const [user, setUser] = useState<User | null>(null)
    let navigate = useNavigate()


    const params = useParams()
    useEffect(() => {
        if (!users.length) return
        const selectedUser = users.filter(user => user._id === params.id)[0]
        if (!selectedUser) navigate("/")
        setUser(selectedUser)
    }, [params.id, users])




    return (
        <section className="user-details">
            <img src={user?.coverImg} alt="" className="cover-img" />
            <section className="user-profile  page">
                <div className="card-header card">
                    <img className="user-img" src={user?.profileImg} alt="user image" />
                    <div className="user-info-container">
                        <div className="user-statistics">
                            <span className="user-name">{user?.firstName} {user?.lastName}</span>
                            <div className="user-info">
                                <span className="user-followers"><span className="emphasized">30k</span> Following </span>
                                <span className="user-followers"><span className="emphasized">230k</span> Followers</span>
                            </div>
                            <div className="btn-container">
                                <button className="btn-follow desktop-btn">
                                    <SvgIcon iconName="follow" wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                                    <span>Follow</span>
                                </button>
                            </div>
                        </div>
                        <p className="about">
                            {user?.about}
                        </p>
                        <button className="btn-follow mobile-btn">
                            <SvgIcon iconName="follow" wrapperStyle="follow" svgProp={{ stroke: "white", fill: "white" }} />
                            <span>Follow</span>
                        </button>
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
