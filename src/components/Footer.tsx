import { NavLinks } from "./NavLinks";

export function Footer() {
    return (
        <footer>
            <div className="copyrights">
                created by &nbsp; <span className="emphasized">Tomer Vardi</span> &nbsp; - © 2023
            </div>
            <NavLinks />
        </footer>
    )
}