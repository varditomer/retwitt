// React / Redux
import { useNavigate } from "react-router"


type Props = {
    firstName: string,
    lastName: string,
    userId: string,
    className?: string
    navigateToUser?: boolean
}
export const NameAcronym: React.FC<Props> = ({ firstName, lastName, userId, className, navigateToUser=true }) => {
    const navigate = useNavigate()
    if (!firstName || !lastName || !userId) return <div>Loading...</div>
    return (
        <span className={`acronym${className ? ' ' + className : ''}`} onClick={navigateToUser?(() => navigate(`/home/${userId}`)):()=>null}>{firstName!.charAt(0).toUpperCase() + lastName!.charAt(0).toUpperCase()}</span>
    )

}
