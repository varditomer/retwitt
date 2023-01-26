import React from 'react'
import SvgIcon from '../SvgIcon';
import { NavLink } from 'react-router-dom';


type Props = {}

export function AppHeader({}: Props) {
  return (
    <header className='main-header'>
                <div className="logo">ReTwitt</div>
                <ul className='nav-list' role='list'>
                    <li>
                        <NavLink className='nav' to='/'>
                            <span>Home</span>
                        </NavLink>
                            <div className="line"></div>
                    </li>
                    <li>
                        <NavLink to='/explore'>
                            <span>Explore</span>
                        </NavLink>
                            <div className="line"></div>
                    </li>
                    <li>
                        <NavLink to='/bookmarks'>
                            <span>Bookmarks</span>
                        </NavLink>
                            <div className="line"></div>
                    </li>
                </ul>
                <div className="user">
                    <img src="" alt="" className="user-img" />
                    <div className='account'>
                        <img src='src\assets\imgs\users\tomer-avatar.png' alt="user image" className="user-img" />
                        <span className="user-name">Tomer Vardi</span>
                        <SvgIcon iconName="expand_more" wrapperStyle="expand_more" svgProp={{ stroke: "black", fill: "black" }} />
                    </div>
                </div>
            </header>
  )
}