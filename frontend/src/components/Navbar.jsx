import { NavLink } from "react-router-dom";

//Navbar global

function Navbar(){
    return(
        <nav className="navbar">
            <div className="navbar-logo">
                <svg
                    width="150"
                    height="42"
                    viewBox="0 0 150 42"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >

                    <path
                    d="M31 12C27.8 8.8 23.6 7 19 7C9.6 7 3 13.8 3 21C3 28.2 9.6 35 19 35C23.6 35 27.8 33.2 31 30"
                    stroke="#00688f"
                    strokeWidth="5"
                    strokeLinecap="round"
                    />



                    <text
                    x="42"
                    y="27"
                    fontFamily="Arial, sans-serif"
                    fontSize="20"
                    fontWeight="700"
                    fill="white"
                    >
                    andiFlow
                    </text>
                </svg>
            </div>
            <div className="navbar-links">
                <NavLink to="/" className="nav-link">
                    <span>Candidatures</span>
                </NavLink>

                <NavLink to="/dashboard" className="nav-link">
                    <span>Dashboard</span>
                </NavLink>
            </div>
        </nav>
    ); 
}
export default Navbar;