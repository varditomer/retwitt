import { hashtag } from "../../interfaces/tweet.interface"

type Props = {
    hashtags: hashtag[]
}

export const TrendList: React.FC<Props> = ({ hashtags }) => {

    return (
        <section className="trend-list card">
            <h2 className='card-title'>Trends for you</h2>
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
