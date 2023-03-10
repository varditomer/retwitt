// React / Redux
import { useState } from "react"
// Interfaces
import { Hashtag } from "../../interfaces/tweet.interface"
// Components
import { SvgIcon } from "../app-general_cmps/SvgIcon"


type Props = {
    hashtags: Hashtag[]
}

export const TrendList: React.FC<Props> = ({ hashtags }) => {
    const [expandMore, setExpandMore] = useState(false)

    const toggleExpandMore = () => {
        setExpandMore(prev => !prev)
    }

    return (
        <section className="trend-list card">
            <div className={`card-title ${expandMore? 'expand': ''}`}>
                <h2>Trends for you</h2>
                <SvgIcon iconName='expand_more_without_fill' wrapperStyle="expand-more" svgProp={{ stroke: "black", fill: "black" }} handleClick={toggleExpandMore} />
            </div>
            <ul role='list'>
                {hashtags?.map((hashtagObj: Hashtag) => <li key={hashtagObj.key}>
                    <span className="trend-title">#{hashtagObj.key}</span>
                    <span className="trend-tweets-count">{hashtagObj.occurrences} Tweets</span>
                </li>
                )}
            </ul>
        </section>
    )

}
