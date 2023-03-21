// React / Redux
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { AnyAction } from "redux"
import { ThunkDispatch } from "redux-thunk"
// Interfaces
import { INITIAL_STATE } from "../../interfaces/state.interface"
import { User } from "../../interfaces/user.interface"
// Actions
import { setLoggedinUser, updateUser } from "../../store/actions/user.action"
// Custom hooks
import { useFormRegister } from "../../hooks/useFormRegister"
// Services
import { uploadImg } from "../../services/img-upload.service"
// Components
import { SvgIcon } from "./SvgIcon"
import { Modal } from "./Modal"
import { NameAcronym } from "./NameAcronym"


type Props = {
    user: User,
    toggleModal: () => void,
    modalRef: React.RefObject<HTMLDivElement>,
}

export const EditProfile: React.FC<Props> = ({ user, toggleModal, modalRef }) => {

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
            dispatch(setLoggedinUser(fields))
            dispatch(updateUser(fields))
        } catch (err) {
        }
    }

    const handleFileChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        if (!ev.target.files) return
        const file = ev.target.files[0]
        const res = await uploadImg(file)
        resetFileInput()
        const imgUrl = res.secure_url
        let convertedImgUrl = imgUrl.split('upload')
        convertedImgUrl.splice(1, 0, 'upload')
        convertedImgUrl = convertedImgUrl.join('')
        ev.target.name === 'coverImg' ? setCoverImg(convertedImgUrl) : setProfileImg(convertedImgUrl)
    }

    const resetFileInput = () => {
        // 👇️ reset input value
        if (!coverImgInput.current) return
        coverImgInput.current.value = ''
    }

    if (!user) return <div>Loading...</div>
    return (
        <Modal modalClass="edit-profile-modal" modalRef={modalRef}>

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
                <div className="input-container cover">
                    <input type="file" onChange={handleFileChange} name='coverImg' ref={coverImgInput} />
                    <SvgIcon iconName='add_photo' wrapperStyle="add-photo-container" svgProp={{ stroke: "white", fill: "white" }} />
                </div>

                <div className="profile-img-edit-container">
                    {profileImg ?
                        <img className="profile-img-edit" src={profileImg} alt="user image" />
                        :
                        <NameAcronym firstName={user.firstName} lastName={user.lastName} userId={user._id} className="profile-img-edit" />
                    }
                    <div className="input-container profile">
                        <input type="file" onChange={handleFileChange} name='profileImg' ref={profileImgInput} />
                        <SvgIcon iconName='add_photo_small' wrapperStyle="add-photo-container" svgProp={{ stroke: "white", fill: "white" }} />
                    </div>
                </div>

            </div>

            <form id="profileForm" onSubmit={onEdit} className="edit-profile-form">

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
                <div className='input-item-container'>
                    <div className="title-container">
                        <span className="title">About</span>
                        <div className={`counter ${(fields['about'].length) >= 145 ? 'out-of-space' : ''}`}>
                            <span className="emphasized">
                                {fields['about'].length} {' '}
                            </span>
                            <span className={(fields['about'].length) === 150 ? 'emphasized' : ''}>
                                / 150
                            </span>
                        </div>
                    </div>
                    <input {...register('about')} placeholder="Enter profile about" maxLength={150} />
                </div>
            </form>
        </Modal>
    )
}