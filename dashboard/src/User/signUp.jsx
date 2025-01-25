import { useState } from "react";
import "../App.css";
import { handleSignUpForm , generateRandomNumber} from "../Helper/helper";
import {handleApiSignUpForm , apiGoogleAuth , apiSendMail} from "../Helper/api.js"
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import userContext from "../contextAPI/userContext.js";
import Otp from "../Otp.jsx";

function SignUp() {
    const navigate = useNavigate();
    let [formData , setFormData] = useState({username : "" , email : "" , password : ""});
    let [error , setError] = useState({username : "" , email : "", password : "" , submit : true , error : ""});
    let [isLoading , setIsLoading] = useState(false);
    const {user , isLogin , setUser , setIsLogin} = useContext(userContext);
    const [isValidate , setIsValidate] = useState(false);
    const [otp , setOtp] = useState([]);
    let [otpchecking , setotpchecking] = useState(false);


    let handleGoogleLogin = async (e) => {
           await apiGoogleAuth();
        }

    let handleFormData = (e) => {
        let {name , value} = e.target;
          setFormData((prevData) => {
            return {...prevData , [name] : value};
          });

          handleSignUpForm(name , value , setError);
    }



    let handleValidateButton = async () => {
      setIsLoading(true);
      // generate a otp
     let random =  generateRandomNumber();
     setOtp([random]);
     await apiSendMail(random , formData.email , formData.username);
      setIsValidate(true);
       setIsLoading(false);
    }


    let handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
  
        const response = await handleApiSignUpForm(formData);
        let error = response?.response?.data?.error ? true : false;
        if(!error && response.data.success){
          setUser((prev) => {
            return {...response.data.registerUser};
          });
          setIsLogin(true);
          navigate("/");
      }
        else{
          setIsLoading(false);
           setError((prev) => {
            return {...prev , error : response.response.data.error};
           });
        }
    }






    return ( 
        <>
        {isLoading && <div className="loader"></div>}
        <div className="form-signUp mt-3">
        <h1 className="my-3">Welcome Back</h1>

        {error.error && <div className="alert alert-danger" role="alert">
          <p>{(error.error).slice(0 , 80)}</p>
</div>}




        <form action="/user/signInInfo" onSubmit={handleSubmit} method = "post">

       <div className="form-group row">
          <label htmlFor="username">Enter Username  {error.username && <p className="red-error">{error.username}</p>}</label>
        <input id = "username" className="form-control" type="text" 
        placeholder="enter name" 
        onChange={handleFormData} 
        name = "username"
        value = {formData.username} required/>
       </div>
       


<div className="form-group row">
    
    <label htmlFor="password">Enter Password {error.password && <p className="red-error">{error.password}</p>} </label>
        <input type="password" 
        id = "password"
        className="form-control"
        placeholder="enter passowrd" 
        onChange={handleFormData}
        name = "password" 
        value = {formData.password} required/>
</div>

<div className="form-group row">
        <label htmlFor="email">Email address {error.email && <p className="red-error">{error.email}</p>} </label>
        <input type="text" 
        id = "email"
        className="form-control"
        placeholder="enter gmail" 
        onChange={handleFormData} 
        name = "email"
        value = {formData.email} required/>
        
        <button onClick={handleValidateButton} type = "button" className="btn btn-sm btn-warning mt-2" disabled={error.submit}>validate <span> {otpchecking ? '\u2705' : '\u274C'}</span></button>

        {isValidate && <Otp email = {formData.email} otpGenerated = {otp} otpCheck = {setotpchecking} optCheckValue = {otpchecking}></Otp>}
         
        
</div>

<p className="my-2">Already a User ? <NavLink to = "/Signin" style = {{color : "blue"}}>Sign In</NavLink></p>

          <button  className = "btn btn-primary" type="submit" disabled={!otpchecking}>
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

export default SignUp;