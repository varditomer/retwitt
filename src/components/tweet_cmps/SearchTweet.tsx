// import EmojiPicker from "emoji-picker-react"
import { useRef } from "react"
import { User } from "../../interfaces/user.interface"
import SvgIcon from "../../SvgIcon"

type Props = {
    searchTweetBy: string
    onChangeSearchTweetBy: Function
}

export const SearchTweet: React.FC<Props> = ({ searchTweetBy, onChangeSearchTweetBy }) => {
    const input = useRef<HTMLInputElement>(null)

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        onChangeSearchTweetBy(ev.target.value)
    }
    const cancelSearch = () => {
        onChangeSearchTweetBy('')
    }
    const focusInput = () => {
        if (!input.current) return
        input.current.focus()
    }

    return (
        <section className="search-tweet card">
            <div className="search-icon-container" onClick={()=>focusInput()}>
                <SvgIcon iconName="search" wrapperStyle="search-icon" svgProp={{ stroke: "#BDBDBD", fill: "#BDBDBD" }} />
            </div>
            <input ref={input} onChange={(ev) => handleChange(ev)} value={searchTweetBy} type="text" name="query" placeholder='Search' className="search-input" />
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