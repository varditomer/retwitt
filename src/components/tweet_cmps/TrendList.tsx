import { useState } from "react"
import { hashtag } from "../../interfaces/tweet.interface"
import SvgIcon from "../../SvgIcon"

type Props = {
    hashtags: hashtag[]
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
                {hashtags?.map((hashtagObj: hashtag) => <li key={hashtagObj.key}>
                    <span className="trend-title">#{hashtagObj.key}</span>
                    <span className="trend-tweets-count">{hashtagObj.occurrences} Tweets</span>
                </li>
                )}
            </ul>
        </section>
    )

}
