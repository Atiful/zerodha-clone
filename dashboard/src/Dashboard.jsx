import { useContext, useEffect, useState } from "react";
import userContext from "./contextAPI/userContext";
import { handleformData , HoldingsInfo} from "./Helper/helper";
import { UpdateBalance , Apifetchholdingdata} from "./Helper/api";
import Loader from "./HelperComponent/Loader";
function Dashboard() {
 
 let {user , isLogin , updateUser} = useContext(userContext);
 let [addMoney , setAddMoney] = useState(500);
 let [error , setError] = useState(false);
 let [loader , setLoader] = useState(false);
 let [holdings , setHoldings] = useState({});
 let [holdingDetails , setHoldingDetails] = useState({totalholding : 0 , investment : 0 , profit : 0});
//  let [flash , setFalsh] = useState({success : '' , error : ''});
 useEffect( () => {
    setLoader(true);
     updateUser();
    setLoader(false);
 } , []);




 let handleform = (e) => {
       handleformData(e , setAddMoney , setError);
 }

 let handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    const response = await UpdateBalance(isLogin , user , addMoney);
    await updateUser();
    setLoader(false);
 }

 useEffect(() => {
    const apiHolding = async () => {
        setLoader(true);
     const holding =  await Apifetchholdingdata(user);
     setHoldings(holding);
    }
    apiHolding();
 } , [user]);

 useEffect(() => {
    const details = async () => {
    const info = await  HoldingsInfo(holdings);
    setHoldingDetails((prev) => {
        return {...prev , ...info};
    });
    }
    details();
    setLoader(false);
 } , [holdings]);







    return ( 
        <div className="dashboard container-fluid">
            {loader && <Loader></Loader>}

        <div className = "user-content my-3">
            <div className="profilePic">
            <img  src = "/images/avatar.png"  alt = "profile_pic"/>
            </div>
            <div className="content px-3">
               {isLogin ? <b className="mt-3">Hey <span className="green">{user?.username}&#128079;,</span> welcome back! Here's your dashboard with all the latest updates</b> : <p>user is not login</p>}
            </div>
        </div>
        
        <hr/>

        <div className="equity mt-3">
            <p className="equity my-3"><i className="fa-regular fa-clock"></i> Equity</p>
               
               <div className="margin">

                <div>
                <h2 className = "green">{isLogin ? <span>&#8377;{user?.balance.toLocaleString('en-IN')}</span> : 0}</h2>
                <p> Balance</p>
                </div>

                <div>
                <h2 className={holdingDetails.profit >= 0 ? "green" : "red"}>&#8377;{holdingDetails.profit.toLocaleString('en-IN')} <span className="profitpercent">+5.20%</span></h2>
                <p>P&L</p>
                </div>

                <div className="addFunds">
                    <form className="form-group">
                    {error && <p className = "red-error">The value must be less than &#8377;10000</p>}
                        <input value = {addMoney} id = "fund" onChange={handleform} className="mb-2 form-control" type="number" placeholder="1000" min = "1" max = "1000"  required/>
                        <button value = {addMoney} onClick={handleSubmit} className="btn  btn-success mt-2" disabled = {error}>Add Money</button>
                    </form>
                </div>
            
             </div>
        </div>
        <hr />


        <div className="holdings mt-3 mb-5">
            <p className="holding my-3"><i className="fa-solid fa-wallet"></i> Holdings({holdingDetails.totalholding})</p>
               
               <div className="PL mx-sm-5">
                <div className="pl-content">
                <p>Total Holdings  <span>{holdingDetails.totalholding}</span></p>
                <p>Total Profit  <span>&#8377;{holdingDetails.profit.toLocaleString('en-IN')}</span></p>
                <p>Total investemt  <span> &#8377;{holdingDetails.investment.toLocaleString('en-IN')}</span></p>
                <p>current Balance  <span>&#8377;{user?.balance.toLocaleString('en-IN')}</span></p>
                </div>
               </div>
        </div>
        <hr />




        </div>
        
     );
}

export default Dashboard;