import { useDispatch } from "react-redux"
import { useOutletContext } from "react-router"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { useFormRegister } from "../../hooks/useFormRegister"
import { INITIAL_STATE, LoginSignupContext } from "../../interfaces/state.interface"
import { userService } from "../../services/user.service"
import { signup } from "../../store/actions/user.action"

export const Signup: React.FC = () => {

    const { handleRef, navigateTo }: LoginSignupContext = useOutletContext()

    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

    const { register, resetForm, fields } = useFormRegister(userService.getEmptyUserCredentials(), () => { })

    const onSignup = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        if (!fields) return
        try {
            await dispatch(signup(fields))
            navigateTo('/home')
        } catch(err) {
            console.log(`can't signup:`, )
        }
    }

    return (
        <form onSubmit={onSignup} className="card">

            <label htmlFor="username">User name:
                <input ref={handleRef} {...register('username')} placeholder="Enter username" />
            </label>
            <label htmlFor="password">Password:
                <input {...register('password')} placeholder="Enter password" type="password" />
            </label>
            <label htmlFor="firstName">First name:
                <input {...register('firstName')} placeholder="Enter first name" />
            </label>
            <label htmlFor="lastName">Last name:
                <input {...register('lastName')} placeholder="Enter last name" />
            </label>
            {/* <label htmlFor="about">About:
                <input {...register('about')} placeholder="Enter profile about" />
            </label>
            <label htmlFor="profileImg">Profile Img URL:
                <input {...register('profileImg')} placeholder="Enter profile img url" />
            </label>
            <label htmlFor="coverImg">Cover Img URL:
                <input {...register('coverImg')} placeholder="Enter cover img url" />
            </label> */}

            <button type="submit" className="btn-submit">Signup</button>
        </form>
    )

}
