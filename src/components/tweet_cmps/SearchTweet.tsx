// import EmojiPicker from "emoji-picker-react"
import { useEffect, useState } from "react"
import { User } from "../../interfaces/user.interface"
import SvgIcon from "../../SvgIcon"

type Props = {
    searchTweetBy: string
    onChangeSearchTweetBy: Function
}

export const SearchTweet: React.FC<Props> = ({ searchTweetBy, onChangeSearchTweetBy }) => {

    const [query, setQuery] = useState('')

    useEffect(() => {
        setQuery(JSON.parse(JSON.stringify(searchTweetBy)))
    }, [])

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(ev.target.value)
        onChangeSearchTweetBy(ev.target.value)
    }
    const cancelSearch = () => {
        setQuery('')
        onChangeSearchTweetBy('')
    }


    // if (!query) return <div>Loading...</div>
    return (
        <section className="search-tweet card">
            <SvgIcon iconName="search" wrapperStyle="search-icon" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
            <input onChange={(ev) => handleChange(ev)} value={query} type="text" name="query" placeholder='Search' className="search-input" />
            {query.length ?
                <div className="cancel-search-container" onClick={() => cancelSearch()}>
                    <SvgIcon iconName="cancel" wrapperStyle="cancel-icon" svgProp={{ stroke: "#ffffff", fill: "#1da1f2" }} />
                </div>
                :
                ''
            }
        </section>
    )
}