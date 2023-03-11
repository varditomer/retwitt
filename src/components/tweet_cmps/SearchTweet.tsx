// React / Redux
import { useRef } from "react"
// Components
import { SvgIcon } from "../app-general_cmps/SvgIcon"


type Props = {
    searchTweetBy: string
    onChangeSearchTweetBy: Function
}

export const SearchTweet: React.FC<Props> = ({ searchTweetBy, onChangeSearchTweetBy }) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        onChangeSearchTweetBy(ev.target.value)
    }
    const cancelSearch = () => {
        onChangeSearchTweetBy('')
    }

    return (
        <section className="search-tweet card">
            <div className="search-icon-container" onClick={()=>inputRef.current?.focus()}>
                <SvgIcon iconName="search" wrapperStyle="search-icon" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
            </div>
            <input ref={inputRef} onChange={(ev) => handleChange(ev)} value={searchTweetBy} type="text" name="query" placeholder='Search' className="search-input" />
            {searchTweetBy.length ?
                <div className="cancel-search-container" onClick={() => cancelSearch()}>
                    <SvgIcon iconName="cancel" wrapperStyle="cancel-icon" svgProp={{ stroke: "#ffffff", fill: "#1da1f2" }} />
                </div>
                :
                ''
            }
        </section>
    )
}