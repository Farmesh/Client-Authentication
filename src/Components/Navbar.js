import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function Navbar() {
    const navigate = useNavigate();

    function logoutClick() {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/home" className="nav-link btn btn-outline-success mx-2">Home </Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">

                        {localStorage.token === undefined ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link btn btn-outline-info mx-2">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link btn btn-outline-success mx-2">Login</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <button className="btn btn-outline-primary nav-link mx-2" onClick={logoutClick}>LogOut <i className="fas fa-sign-out-alt"></i></button>
                                </li>
                                <li className="nav-item">
                                    <Link to="/edit-profile" className="nav-link btn btn-outline-success mx-2">{localStorage.user} <i className="fas fa-edit"></i></Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/change-password" className="nav-link btn btn-outline-success mx-2">Change Password</Link>
                                </li>
                            </>

                        )}


                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar