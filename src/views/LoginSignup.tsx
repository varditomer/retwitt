// React:
import { useCallback } from "react"
import { Outlet, useLocation, useNavigate } from "react-router"
import { NavLink } from "react-router-dom"
// Components & Hooks:
import { SvgIcon } from "../components/app-general_cmps/SvgIcon"


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

                <SvgIcon iconName="back" wrapperStyle="back" svgProp={{ stroke: "#828282", fill: "#828282" }} handleClick={() => navigate('/')} />

            </header>

            <section className="main-content">

                <h2 className="call-to-action">
                    {(page === 'login') ?
                        <>Signup or <span className="emphasized"> Login </span> now <span className="one-line">and become a ReTweeter <SvgIcon iconName="twitter_logo" wrapperStyle="" /></span></>
                        :
                        <><span className="emphasized">Signup </span> or Login now <span className="one-line">and become a ReTweeter <SvgIcon iconName="twitter_logo" wrapperStyle="" /></span> </>
                    }
                    {/* {(page === 'login') ?
                        <>
                            Signup or
                            <span className="emphasized"> Login </span>
                            <span className="">
                                now and become a ReTweeter
                                <SvgIcon iconName="twitter_logo" wrapperStyle="expand_more" />
                            </span>
                        </>
                        :
                        <>
                            <span className="emphasized">Signup </span>
                            or Login now and become a ReTweeter
                            <SvgIcon iconName="twitter_logo" wrapperStyle="expand_more" />
                        </>
                    } */}

                </h2>
                <Outlet
                    context={{
                        handleRef,
                        navigateTo
                    }}
                />
            </section>

            <footer className="landing-footer">
                <p className="copyrights">
                    Created by <span className="emphasized">Tomer Vardi</span> © 2023
                </p>
            </footer>

        </section>
    )
}
