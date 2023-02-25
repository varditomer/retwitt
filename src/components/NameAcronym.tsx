import { useNavigate } from "react-router"
// import { UserCredentials } from "../interfaces/user.interface"

type Props = {
    firstName: string,
    lastName: string,
    userId: string,
    className?: string
}
export const NameAcronym: React.FC<Props> = ({ firstName, lastName, userId, className }) => {
    const navigate = useNavigate()
    if (!firstName || !lastName || !userId) return <div>Loading...</div>
    return (
        <span className={`acronym${className ? ' ' + className : ''}`} onClick={() => navigate(`/home/${userId}/tweets`)}>{firstName!.charAt(0).toUpperCase() + lastName!.charAt(0).toUpperCase()}</span>
    )

}
