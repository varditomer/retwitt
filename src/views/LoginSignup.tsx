// React:
import { useCallback } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { NavLink } from "react-router-dom"
// Components & Hooks:
import SvgIcon from "../SvgIcon"

export const LoginSignup: React.FC = () => {

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const page = pathname.substring(1, pathname.length).split('/')[1]

    const handleRef = useCallback((elInput: any) => {
        elInput?.focus()
    }, [])

    const navigateTo = (path: string) => {
        navigate(path)
    }

    return (
        <section className='login-signup'>
            <div className="nav-links">
                <ul className="nav-links-list" role='list'>
                    <li>
                        <NavLink to='login'>
                            <span className="filter-title">Login</span>
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink to='signup'>
                            <span className="filter-title">Signup</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <button className="back" onClick={() => navigate('/')}>
                <SvgIcon iconName="back" wrapperStyle="expand_more" svgProp={{ stroke: "white", fill: "white" }} />
            </button>
            <h2 className="call-to-action">
                {(page === 'login') ?
                    <div>
                        Signup or
                        <span className="emphasized"> Login </span>
                        now and become a ReTweeter
                    </div>
                    :
                    <div>
                        <span className="emphasized">Signup </span>
                        or Login now and become a ReTweeter
                    </div>
                }
                <SvgIcon iconName="twitter_logo" wrapperStyle="expand_more" />
            </h2>
            <Outlet context={{
                handleRef,
                navigateTo
            }}
            />

        </section>
    )
}
