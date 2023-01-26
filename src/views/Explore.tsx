import React from 'react'
import SvgIcon from '../SvgIcon';
import { NavLink, Outlet } from 'react-router-dom';



type Props = {}

export const Explore: React.FC<Props> = (props) => {
  return (
    <section className="explore">
      <section className="main-content">
        <div className="small-area">
          <section className="trends-list card">
            <ul role='list'>
              <li>
                <NavLink to='top'>
                  <div className="border"></div>
                  <span className="trend-title">Top</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='latest'>
                  <div className="border"></div>
                  <span className="trend-title">Latest</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='people'>
                  <div className="border"></div>
                  <span className="trend-title">People</span>
                </NavLink>
              </li>
              <li>
                <NavLink to='media'>
                  <div className="border"></div>
                  <span className="trend-title">Media</span>
                </NavLink>
              </li>
            </ul>
          </section>
        </div>
        <div className="large-area">
          <section className="search-tweet card">
            <SvgIcon iconName="search" wrapperStyle="add-photo" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
            <input type="text" placeholder='Search' className="search-input" />
            <button className="search-btn">Search</button>
          </section>
          <Outlet />
          

        </div>




      </section>
    </section>
  )
}