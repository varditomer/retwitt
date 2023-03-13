// React / Redux
import { useDispatch } from "react-redux"
import { useOutletContext } from "react-router"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
// Interfaces
import { INITIAL_STATE, LoginSignupContext } from "../../interfaces/state.interface"
// Actions
import { login } from "../../store/actions/user.action"
// Custom hooks
import { useFormRegister } from "../../hooks/useFormRegister"
// Services
import { userService } from "../../services/user.service"


export const Login: React.FC = () => {

    const { handleRef, navigateTo }: LoginSignupContext = useOutletContext()

    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

    const { register, resetForm, fields } = useFormRegister(userService.getEmptyUserCredentials(), () => { })

    const onLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!fields) return
        try {
            await dispatch(login(fields))
            navigateTo('/home')
        } catch (err) {
            console.log(`Username or password are incorrect`)
        }
    }

    return (
        <form onSubmit={onLogin} className="login-signup-form card">
            <div className='input-item-container'>
                <div className="title-container">
                    <span className="title">User name</span>
                </div>
                <input ref={handleRef} {...register('username')} placeholder="Enter username" />
            </div>
            <div className='input-item-container'>
                <div className="title-container">
                    <span className="title">Password</span>
                </div>
                <input {...register('password')} placeholder="Enter password" type="password" />
            </div>
            <button type="submit" className="btn-submit">Login</button>
        </form>
    )
}
