import { useContext, useEffect, useState } from "react";
import userContext from "./contextAPI/userContext";

function Otp({email , otpGenerated , otpCheck , optCheckValue}) {
    let {user , isLogin} = useContext(userContext);
   let [userOtp , setUserOtp] = useState({first : '' , second : '' , third : '' , fourth : '' , fifth : '' , sixth : ''});
   let [error , setError] = useState(true);
   let [isCorrectOtp , setisCorrectOtp] = useState(true);

   useEffect(() => {
        validateNumber();
      }, [userOtp]);

   let validateNumber = () => {
        if(userOtp.first == '' || userOtp.second  == '' || userOtp.third  == '' || userOtp.fourth == '' || userOtp.fifth == '' || userOtp.sixth == ''){
                setError(true);
        }
        else{
                setError(false);
        }
   }

   let handleValidateOtp = () => {
        let userOtpString = userOtp.first + userOtp.second + userOtp.third + userOtp.fourth + userOtp.fifth + userOtp.sixth;

        otpCheck(userOtpString == otpGenerated[0].join(""));
        setisCorrectOtp(userOtpString == otpGenerated[0].join(""));
   }



   const handleOtpForm  = (e) => {
      let {value , name} = e.target;
      setUserOtp((prev) => {
        return {...prev , [name] : value}
      });
   }
 
  
   

    return (
        <>
        <div>
        {!isCorrectOtp && <p className="red-error">Incorrect Otp. try again</p>}
        </div>
        {!optCheckValue && 
        <div className="container height-100 mt-3 d-flex justify-content-center align-items-center"> <div className="position-relative"> <div className="card p-2 text-center"> <h6>Please enter the one time password <br/> to verify your account</h6> <div> <span>A code has been sent to</span> <small>{email}</small> </div> 
        <div id="otp" className="inputs d-flex flex-row justify-content-center mt-2"> 
                <input className="m-2 text-center form-control rounded" type = "text" id="first"  name = "first" value = {userOtp.first} onChange={handleOtpForm}/> 
                <input className="m-2 text-center form-control rounded" type = "text" id="second"  name = "second" value = {userOtp.second} onChange={handleOtpForm} required/> 
                <input className="m-2 text-center form-control rounded" type = "text" id="third"   name = "third" value = {userOtp.third} onChange={handleOtpForm}  required/> 
                <input className="m-2 text-center form-control rounded" type = "text" id="fourth"  name = "fourth" value = {userOtp.fourth} onChange={handleOtpForm} required/> 
                <input className="m-2 text-center form-control rounded" type = "text" id="fifth"  name = "fifth" value = {userOtp.fifth} onChange={handleOtpForm} required/> 
                <input className="m-2 text-center form-control rounded" type = "text" id="sixth"  name = "sixth" value = {userOtp.sixth} onChange={handleOtpForm} required/>
                 </div> 
                 <div className="mt-4">
                         <a className="btn btn-danger px-4 validate" onClick={handleValidateOtp} disabled = {error}>Validate</a> </div> </div> <div className="card-2"> <div className="content d-flex justify-content-center align-items-center"> </div> </div> </div>
</div> }
        </>
        )
}

export default Otp;