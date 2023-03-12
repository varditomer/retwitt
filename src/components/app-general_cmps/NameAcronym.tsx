// React / Redux
import { useNavigate } from "react-router"


type Props = {
    firstName: string,
    lastName: string,
    userId: string,
    className?: string
    handleClick?: ()=> void
}
export const NameAcronym: React.FC<Props> = ({ firstName, lastName, userId, className, handleClick }) => {
    const navigate = useNavigate()
    if (!firstName || !lastName || !userId) return <div>Loading...</div>
    return (
        <span className={`acronym${className ? ' ' + className : ''}`} onClick={() => navigate(`/home/${userId}`)}>{firstName!.charAt(0).toUpperCase() + lastName!.charAt(0).toUpperCase()}</span>
    )

}
