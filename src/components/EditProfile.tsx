import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
import { useFormRegister } from "../hooks/useFormRegister"
import { INITIAL_STATE } from "../interfaces/state.interface"
import { User } from "../interfaces/user.interface"
import { uploadImg } from "../services/img-upload.service"
import { userService } from "../services/user.service"
import { updateUser } from "../store/actions/user.action"
import SvgIcon from "../SvgIcon"
import { Modal } from "./Modal"
import { NameAcronym } from "./NameAcronym"

type Props = {
    user: User,
    toggleModal: () => void
}

export const EditProfile: React.FC<Props> = ({ user, toggleModal }) => {

    const dispatch = useDispatch<ThunkDispatch<INITIAL_STATE, any, AnyAction>>()

    const { register, resetForm, fields } = useFormRegister(user, () => { })

    const [profileImg, setProfileImg] = useState(user.profileImg)
    const [coverImg, setCoverImg] = useState(user.coverImg)

    const coverImgInput = useRef<HTMLInputElement>(null)
    const profileImgInput = useRef<HTMLInputElement>(null)

    const onEdit = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        toggleModal()
        if (!fields) return
        if (profileImg) fields.profileImg = profileImg
        if (coverImg) fields.coverImg = coverImg
        let userToUpdate = structuredClone(user)
        userToUpdate = {
            ...fields,
            ...user,
        }
        try {
            await dispatch(updateUser(fields))
        } catch (err) {
            console.log(`can't update profile`)
        }
    }

    const handleFileChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!ev.target.files) return
        const file = ev.target.files[0]
        const res = await uploadImg(file)
        resetFileInput()
        const imgUrl = res.secure_url
        ev.target.name === 'coverImg' ? setCoverImg(imgUrl) : setProfileImg(imgUrl)
    }

    const resetFileInput = () => {
        // 👇️ reset input value
        if (!coverImgInput.current) return
        coverImgInput.current.value = '';
    }

    if (!user) return <div>Loading...</div>
    return (
        <Modal modalClass="edit-profile-modal">

            <div className="header">
                <div className="left-area">
                    <div className="cancel-container" onClick={toggleModal}>
                        <SvgIcon iconName='cancel_small' wrapperStyle="cancel" svgProp={{ stroke: "#333333", fill: "#333333" }} />
                    </div>
                    <h2>Edit profile</h2>
                </div>
                <button type="submit" form="profileForm" className="btn-save">
                    Save
                </button>
            </div>

            <div className="cover-img-edit-container">
                {coverImg ?
                    <img src={coverImg} alt="" className="cover-img-edit" />
                    :
                    <div className="cover-img-edit not-set">
                        <SvgIcon iconName='twitter_logo' wrapperStyle="twitter" svgProp={{ stroke: "white", fill: "white" }} />
                        Coming soon...
                    </div>
                }
                <div className="input-container">
                    <input type="file" onChange={handleFileChange} name='coverImg' ref={coverImgInput} />
                    <SvgIcon iconName='add_photo' wrapperStyle="add-photo-container" svgProp={{ stroke: "white", fill: "white" }} />
                </div>
            </div>

            <div className="profile-img-edit-container">
                {profileImg ?
                    <img className="profile-img-edit" src={profileImg} alt="user image" />
                    :
                    <NameAcronym firstName={user.firstName} lastName={user.lastName} userId={user._id} className="profile-img-edit" />
                }
                <div className="input-container">
                    <input type="file" onChange={handleFileChange} name='profileImg' ref={profileImgInput} />
                    <SvgIcon iconName='add_photo' wrapperStyle="add-photo-container" svgProp={{ stroke: "white", fill: "white" }} />
                </div>
            </div>


            <form id="profileForm" onSubmit={onEdit} className="edit-profile-form">

                <label className='modal-subtitle profile' htmlFor="firstName">First name:
                    <input {...register('firstName')} placeholder="Enter first name" />
                </label>
                <label className='modal-subtitle profile' htmlFor="lastName">Last name:
                    <input {...register('lastName')} placeholder="Enter last name" />
                </label>
                <label className='modal-subtitle profile' htmlFor="about">About:
                    <input {...register('about')} placeholder="Enter profile about" />
                </label>
                {/* <label className='modal-subtitle' htmlFor="profileImg">Profile Img URL:
                    <input {...register('profileImg')} placeholder="Enter profile img url" />
                </label>
                <label className='modal-subtitle' htmlFor="coverImg">Cover Img URL:
                    <input {...register('coverImg')} placeholder="Enter cover img url" />
                </label> */}
            </form>
        </Modal>
    )
}