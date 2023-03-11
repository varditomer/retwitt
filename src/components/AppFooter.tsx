// Components
import { NavLinks } from "./NavLinks"


export const AppFooter: React.FC = () => {
    return (
        <footer className="app-footer">
            <p className="copyrights">
                Created by <span className="emphasized">Tomer Vardi</span> © 2023
            </p>
            <NavLinks />
        </footer>
    )
}