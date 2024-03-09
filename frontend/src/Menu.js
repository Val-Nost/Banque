import { Outlet, Link } from "react-router-dom";

const Menu = () => {
    return (
        <>
            <nav className="topnav">
                <li className={window.location.pathname === "/" ? "active" : ''}>
                    <Link to="/">Home</Link>
                </li>
                <li className={window.location.pathname === "/liste-client" ? "active" : ''}>
                    <Link to="/liste-client">Client</Link>
                </li>
                <li className={window.location.pathname === "/liste-compte" ? "active" : ''}>
                    <Link to="/liste-compte">Compte</Link>
                </li>
                <li className={window.location.pathname === "/virement-inter-client" ? "active" : ''}>
                    <Link to="/virement-inter-client">Virement clients</Link>
                </li>
            </nav>

            <Outlet />
        </>
    )
};

export default Menu;