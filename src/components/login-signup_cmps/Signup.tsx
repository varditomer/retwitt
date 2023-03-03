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
        } catch (err) {
            console.log(`can't signup:`,)
        }
    }

    return (
        <form autoComplete="new-password" onSubmit={onSignup} className="login-signup-form card">

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
            <div className='input-item-container'>
                <div className="title-container">
                    <span className="title">First name</span>
                    <div className={`counter ${(fields['firstName'].length) >= 35 ? 'out-of-space' : ''}`}>
                        <span className="emphasized">
                            {fields['firstName'].length} {' '}
                        </span>
                        <span className={(fields['firstName'].length) === 40 ? 'emphasized' : ''}>
                            / 40
                        </span>
                    </div>
                </div>
                <input {...register('firstName')} placeholder="Enter first name" maxLength={40} />
            </div>
            <div className='input-item-container'>
                <div className="title-container">
                    <span className="title">Last name</span>
                    <div className={`counter ${(fields['lastName'].length) >= 35 ? 'out-of-space' : ''}`}>
                        <span className="emphasized">
                            {fields['lastName'].length} {' '}
                        </span>
                        <span className={(fields['lastName'].length) === 40 ? 'emphasized' : ''}>
                            / 40
                        </span>
                    </div>
                </div>
                <input {...register('lastName')} placeholder="Enter last name" maxLength={40} />
            </div>
            <button type="submit" className="btn-submit">Signup</button>
        </form>
    )

}
