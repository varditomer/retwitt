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
            <header className="login-signup-header">
                <ul className='nav-list' role='list'>
                    <li>
                        <NavLink to='login'>
                                <span className="filter-title">Login</span>
                            </NavLink>
                        <div className="border"></div>
                    </li>
                    <li>
                         <NavLink to='signup'>
                                <span className="filter-title">Signup</span>
                            </NavLink>
                        <div className="border"></div>
                    </li>
                </ul>

                {/* <div className="nav-links">
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
                </div> */}
                {/* <button className="back" onClick={() => navigate('/')}> */}
                    <SvgIcon iconName="back" wrapperStyle="back" svgProp={{ stroke: "#828282", fill: "#828282" }} handleClick={() => navigate('/')}/>
                {/* </button> */}
            </header>
            <section className="main-content">

                <h2 className="call-to-action">
                    {(page === 'login') ?
                        <>
                            Signup or
                            <span className="emphasized"> Login </span>
                            now and become a ReTweeter
                            <SvgIcon iconName="twitter_logo" wrapperStyle="expand_more" />
                        </>
                        :
                        <>
                            <span className="emphasized">Signup </span>
                            or Login now and become a ReTweeter
                            <SvgIcon iconName="twitter_logo" wrapperStyle="expand_more" />
                        </>
                    }

                </h2>
                <Outlet
                    context={{
                        handleRef,
                        navigateTo
                    }}
                />
            </section>

        </section>
    )
}
