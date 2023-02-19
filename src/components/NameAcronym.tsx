import { useNavigate } from "react-router"
// import { UserCredentials } from "../interfaces/user.interface"

type Props = {
    firstName: string,
    lastName: string,
    userId: string
}
export const NameAcronym: React.FC<Props> = ({ firstName, lastName, userId }) => {
    const navigate = useNavigate()
    if(!firstName||!lastName||!userId) return <div>Loading...</div>
    return (
        <span className="acronym" onClick={() => navigate(`home/${userId}`)}>{firstName!.charAt(0).toUpperCase() + lastName!.charAt(0).toUpperCase()}</span>
    )

}
