// React / Redux
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
// Interfaces
import { INITIAL_STATE, UserState } from "../interfaces/state.interface"
// Actions
import { login, setLoggedinUser } from "../store/actions/user.action"
// Components
import { SvgIcon } from "../components/app-general_cmps/SvgIcon"
import { userService } from "../services/user.service"


export const LandingPage: React.FC = () => {
    const { loggedinUser } = useSelector((state: UserState) => state.userModule)
    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

    const navigate = useNavigate()

    useEffect(() => {
        if (loggedinUser) navigate('/home')

    }, [loggedinUser])

    const onStartDemo = async () => {
        const userCreds = userService.getEmptyUserCredentials()
        userCreds.username = import.meta.env.VITE_API_KEY_GUEST_USERNAME
        userCreds.password = import.meta.env.VITE_API_KEY_GUEST_PASSWORD
        try {
            await dispatch(login(userCreds))
            navigate('/home')
        } catch (err) {
            console.log(`Username or password are incorrect`)
        }

    }


    return (
        <section className="landing-page">

            <div className="main-container">

                <div className="left-area">
                    {/* <img src="./src/assets/icons/twitter_logo_animation.gif" alt="" className='retwitt-animation' /> */}
                    <img src="https://res.cloudinary.com/retwitt/image/upload/v1678968004/twitter_logo_animation_zrkylj.gif" alt="" className='retwitt-animation' />
                    <div className="catchphrases-container">
                        <div className="catchphrase">
                            <SvgIcon iconName="search_big" wrapperStyle="catchphrase-icon" svgProp={{ stroke: "#ffffff", fill: "#ffffff" }} />
                            <p>Follow your interests.</p>
                        </div>
                        <div className="catchphrase">
                            <SvgIcon iconName="group_big" wrapperStyle="catchphrase-icon" svgProp={{ stroke: "#ffffff", fill: "#ffffff" }} />
                            <p>Hear what people are talking about.</p>
                        </div>
                        <div className="catchphrase">
                            <SvgIcon iconName="message_big" wrapperStyle="catchphrase-icon" svgProp={{ stroke: "#ffffff", fill: "#ffffff" }} />
                            <p>Join the conversation.</p>
                        </div>
                    </div>
                </div>

                <div className="right-area">
                    <div className="retwitt-logo">
                        {/* <img src="./src/assets/icons/twitter_gif_no_bgc.gif" alt="" className='retwitt-icon' /> */}
                        <img src="https://res.cloudinary.com/retwitt/image/upload/v1678449183/twitter_gif_no_bgc_mn1pqe.gif" alt="" className='retwitt-icon' />
                        <span>ReTwitt</span>
                    </div>
                    <h1 className="call-to-action-title">
                        See what’s happening in the world right now
                    </h1>
                    <div className="action-area">
                        <h2 className="call-to-action-subtitle">
                            Join ReTwitt today.
                        </h2>
                        <button className="btn-landing" onClick={() => navigate('/loginsignup/login')}>Login \ Signup</button>
                        <button className="btn-landing demo" onClick={onStartDemo}>Start Demo</button>
                    </div>
                </div>

            </div>

            <footer className="landing-footer">
                <p className="copyrights">
                    Created by <span className="emphasized">Tomer Vardi</span> © 2023
                </p>
            </footer>

        </section>
    )
}