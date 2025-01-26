
import { useContext , useState} from 'react';
import {  NavLink, useNavigate } from 'react-router-dom';
import userContext from './contextAPI/userContext';
import { logoutUser } from './Helper/api';
function Nav() {

    const {user , isLogin , setUser , setIsLogin ,  updateUser} = useContext(userContext);
    const [loader , setLoader]  = useState(false);
    const nagivate = useNavigate();
    const handleLogout = async () => {
        setLoader(true);
        const response  = await logoutUser();
        await  updateUser();
        if(response.data.success){
          setIsLogin(null);
          setIsLogin(false);
          setLoader(false);
        }
        window.location.href = "https://investwise-frontend.onrender.com/";
        setLoader(false);
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-light sticky-top">
            {loader && <div className='loader'></div>}
            <div className='logo'>
            <img src="/images/logoImg.ico" alt="" />
            </div>
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav">

                   {user && 
                    <li className="nav-item">
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? '#8dc6ff' : '#34495e',
                            fontWeight: isActive ? 'bold' : 'normal'
                        })}
                        className="nav-link" to = "/">Dashboard</NavLink>
                    </li> }

                    {user && 
                    <li className="nav-item">
                        <NavLink  style={({ isActive }) => ({
                            color: isActive ? '#8dc6ff' : '#34495e',
                            fontWeight: isActive ? 'bold' : 'normal'
                        })}
                        className="nav-link" to="/Orders">Orders</NavLink>
                    </li> }

                     {user && 
                    <li className="nav-item">
                        <NavLink style={({ isActive }) => ({
                            color: isActive ? '#8dc6ff' : '#34495e',
                            fontWeight: isActive ? 'bold' : 'normal'
                        })}
                        className="nav-link" to = "/Holdings">Holdings</NavLink>
                    </li>  }

                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle username" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {user?.username ? user.username : "Users"} | <i className="fa-solid fa-user"></i>
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                          {!user && <NavLink className="dropdown-item" to = "/signUp">signup</NavLink>}
                          {!user && <NavLink className="dropdown-item" to = "/signIn">LoginIn</NavLink>}
                            
                          {user && <button className='btn btn-sm dropdown-item' onClick={handleLogout}>Logout</button> }
                        </div>
                    </li>

                </ul>
            </div>
        </nav>
    );
}

export default Nav;
