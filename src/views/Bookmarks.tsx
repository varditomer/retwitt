import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

type Props = {}

export const Bookmarks: React.FC<Props> = (props) => {
  return (
    <section className="bookmarks page">
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
  )
}