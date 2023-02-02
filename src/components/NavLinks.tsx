import React from 'react'
import SvgIcon from '../SvgIcon';
import { NavLink } from 'react-router-dom';


export function NavLinks() {
    return (
        <ul className='nav-list' role='list'>
            <li>
                <NavLink className='nav' to='/'>
                    <SvgIcon iconName="home" wrapperStyle="icon" svgProp={{ stroke: "#828282", fill: "#828282" }} />
                    <span>Home</span>
                </NavLink>
                <div className="border"></div>
            </li>
            <li>
                <NavLink to='/explore/top'>
                    <SvgIcon iconName="explore" wrapperStyle="icon" svgProp={{ stroke: "#828282", fill: "#828282" }} />
                    <span>Explore</span>
                </NavLink>
                <div className="border"></div>
            </li>
            <li>
                <NavLink to='/bookmark/tweets'>
                    <SvgIcon iconName="bookmark_filled" wrapperStyle="icon" svgProp={{ stroke: "#828282", fill: "#828282" }} />
                    <span>Bookmarks</span>
                </NavLink>
                <div className="border"></div>
            </li>
        </ul>
    )
}