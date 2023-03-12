// React / Redux
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
// Interfaces
import { TweetsFilter } from '../../interfaces/tweet.interface'
// Actions
// Components
import { SvgIcon } from './SvgIcon'

type Props = {
    pathnameTarget: string,
    tweetsFilters: TweetsFilter[],
}

export const TweetsFilters: React.FC<Props> = ({ pathnameTarget, tweetsFilters }) => {

    const location = useLocation()

    const [expandMore, setExpandMore] = useState(false)


    const toggleExpandMore = (ev: React.MouseEvent<HTMLDivElement>) => {
        ev.stopPropagation()
        ev.preventDefault()
        setExpandMore(prev => !prev)
    }

    if (false) return <div>Loading...</div>

    return (
        <div className={`small-area ${expandMore ? 'expand' : ''}`}>
            <section className="tweets-filter card">
                <ul role='list'>
                    {tweetsFilters.map((filter: TweetsFilter, idx) => idx === 0 ?
                        <li className={`first-link ${location.pathname === pathnameTarget ? 'first-link-active' : ''}`}>
                            <div className="border"></div>
                            <NavLink to={`${filter.to}`} className={'first-link'}>
                                <div className="head">
                                    <span className="filter-title">{filter.title}</span>
                                    <SvgIcon iconName='expand_more_without_fill' wrapperStyle="expand-more" svgProp={{ stroke: "black", fill: "black" }} handleClick={toggleExpandMore} />
                                </div>
                            </NavLink>
                        </li>
                        :
                        <li>
                            <div className="border"></div>
                            <NavLink to={`${filter.to}`}>
                                <span className="filter-title">{filter.title}</span>
                            </NavLink>
                        </li>
                    )}
                </ul>
            </section>
        </div>
    )
}