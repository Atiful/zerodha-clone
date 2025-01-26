import { useState , useContext} from "react";
import "./App.css";
import {apilogin} from "./Helper/api.js"
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import userContext from "./contextAPI/userContext.js";
import { apiGoogleAuth } from "./Helper/api.js";
import Loader from "./HelperComponent/Loader.jsx";

function SignIn() {

  const {user , isLogin , setUser , setIsLogin , updateUser} = useContext(userContext);
    const navigate = useNavigate();
    let [formData , setFormData] = useState({username : "" , password : ""});
    let [error , setError] = useState({submit : false , message : ""});
    let [isLoading , setIsLoading] = useState(false);

    let handleGoogleLogin = async (e) => {
      setIsLoading(true);
       await apiGoogleAuth();
       setIsLoading(false);
    }

    let handleFormData = (e) => {
        let {name , value} = e.target;
          setFormData((prevData) => {
            return {...prevData , [name] : value};
          });
    }


    let handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
  
        const response = await apilogin(formData);
        console.log(response.data.user);
        console.log(response.status);
        if(response?.data?.user){
          setUser((prev) => {
            return {...response?.data?.user};
          })
          setIsLogin(true);
        //  await  updateUser();
          navigate("/");
      }
        else{
          setIsLoading(false);
           setError((prev) => {
            return {...prev , message : "Invalid Credientials or user does not exisit" , submit : false};
           });
        }
    }






    return ( 
        <>
        <div className="form-signUp mt-3">
        <h1 className="my-3">Welcome To InvestWise</h1>

        {error.message && <div className="alert alert-danger" role="alert">
          <p>{error.message}</p>
</div>}

       


        <form action="user/login" onSubmit={handleSubmit} method = "post">

       <div className="form-group row">
          <label htmlFor="username">Enter Username</label>
        <input id = "username" className="form-control" type="text" 
        placeholder="enter name" 
        onChange={handleFormData} 
        name = "username"
        value = {formData.username} required/>
       </div>
       


<div className="form-group row">
    
    <label htmlFor="password">Enter Password</label>
        <input type="password" 
        id = "password"
        className="form-control"
        placeholder="enter passowrd" 
        onChange={handleFormData}
        name = "password" 
        value = {formData.password} required/>
</div>



<p className="my-2">User not Regisered ? <NavLink to = "/signUp" style = {{color : "blue"}}>Sign Up</NavLink></p>

          <button  className = "btn btn-success" type="submit" disabled={error.submit}>
            {isLoading ? <div className="loader"></div> : "submit"}
            </button>
        </form>
        <hr />
        <div className="google-button">
        <button className="btn btn-sm google-login" onClick={handleGoogleLogin}> <img src="images/google-icon.png" alt=""/>Continue With Google</button>
        </div>
        </div>
       

        
        </>
     );
}

export default SignIn;