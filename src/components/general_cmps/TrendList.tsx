
type Props = {}

export const TrendList: React.FC<Props> = () => {

    return (
        <section className="trend-list card">
            <h2 className='card-title'>Trend for you</h2>
            <ul role='list'>
                <li>
                    <span className="trend-title">#programming</span>
                    <span className="trend-tweets-count">213k Tweets</span>
                </li>
                <li>
                    <span className="trend-title">#devchallenges</span>
                    <span className="trend-tweets-count">123k Tweets</span>
                </li>
                <li>
                    <span className="trend-title">#frontend</span>
                    <span className="trend-tweets-count">34k Tweets</span>
                </li>
                <li>
                    <span className="trend-title">#helsinki</span>
                    <span className="trend-tweets-count">11k Tweets</span>
                </li>
                <li>
                    <span className="trend-title">#100DaysOfCode</span>
                    <span className="trend-tweets-count">5k Tweets</span>
                </li>
            </ul>
        </section>
    )

}
