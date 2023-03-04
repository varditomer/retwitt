import { NavLinks } from "./NavLinks";

export const AppFooter: React.FC = () => {
    return (
        <footer className="app-footer">
            <div className="copyrights">
                created by &nbsp; <span className="emphasized">Tomer Vardi</span> &nbsp; - © 2023
            </div>
            <NavLinks />
        </footer>
    )
}