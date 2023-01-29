import React from 'react'
import SvgIcon from '../SvgIcon';
import { NavLink, Outlet } from 'react-router-dom';



type Props = {}

export const Explore: React.FC<Props> = (props) => {
  return (
    <section className="explore page">
      <div className="small-area">
        <section className="tweets-filter card">
          <ul role='list'>
            <li>
              <div className="border"></div>
              <NavLink to='top'>
                <span className="filter-title">Top</span>
              </NavLink>
            </li>
            <li>
              <div className="border"></div>
              <NavLink to='latest'>
                <span className="filter-title">Latest</span>
              </NavLink>
            </li>
            <li>
              <div className="border"></div>
              <NavLink to='people'>
                <span className="filter-title">People</span>
              </NavLink>
            </li>
            <li>
              <div className="border"></div>
              <NavLink to='media'>
                <span className="filter-title">Media</span>
              </NavLink>
            </li>
          </ul>
        </section>
      </div>
      <div className="large-area">
        <section className="search-tweet card">
          <SvgIcon iconName="search" wrapperStyle="search-icon" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
          <input type="text" placeholder='Search' className="search-input" />
          <button className="search-btn">Search</button>
        </section>
        <Outlet />
      </div>
    </section>
  )
}