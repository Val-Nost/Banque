import { Outlet, Link } from "react-router-dom";

const Menu = () => {
    return (
        <>
            <nav className="topnav">
                <li className="active">
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/liste-client">Client</Link>
                </li>
                <li>
                    <Link to="/liste-compte">Compte</Link>
                </li>
            </nav>

            <Outlet />
        </>
    )
};

export default Menu;