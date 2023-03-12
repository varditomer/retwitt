// React / Redux
import { NavLink } from 'react-router-dom'
import { TweetsFilter } from '../../interfaces/tweet.interface'
// Interfaces
// Actions
// Components
import { SvgIcon } from './SvgIcon'

type Props = {
    locationPathname: string,
    pathnameTarget: string,
    tweetsFilters: TweetsFilter[],
    toggleExpandMore: ()=> void
}

export const TweetsFilters: React.FC<Props> = ({ locationPathname, pathnameTarget, tweetsFilters, toggleExpandMore }) => {

    if (false) return <div>Loading...</div>

    return (
        <section className="tweets-filter card">
            <ul role='list'>
                {tweetsFilters.map((filter: TweetsFilter, idx) => idx === 0 ?
                    <li className={`first-link ${locationPathname === pathnameTarget ? 'first-link-active' : ''}`}>
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
    )
}