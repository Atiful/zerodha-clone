import { useContext, useState , NavLink} from "react";
import { GeneralContext } from "./GeneralContext";
import {ApiplaceBuyOrder} from "./Helper/api.js";
import { HelperformValidation } from "./Helper/helper.js";
import userContext from "./contextAPI/userContext.js";

function BuyWindow({stock , mode}){
 
  const [buyform , setBuyform] = useState({quantity : 1 , price : stock.price});
  const  [priceValidation , setPriceValidations] = useState(false);
  const  [quantityvalidation , setQuantityValidation] = useState(false);
  const marginAllowed = stock.price * 0.2;
  const {user} = useContext(userContext);
  const generalContext = useContext(GeneralContext);
  const [loader , setLoader] = useState(false);
  const [balance , setBalance] = useState((buyform.quantity * buyform.price) > user.balance ? true : false);
  
  
  //click event in form
  const handleCancelofBuyform = () => {
      generalContext.closeBuyWindow();
  }
 
  // handle buy of stock
  const handleBuyEvent = async (e) => {
        e.preventDefault();
        setLoader(true);
        await  ApiplaceBuyOrder(stock.name , buyform.quantity , buyform.price , mode , marginAllowed , user);
       setLoader(false);
        handleCancelofBuyform();
  }

  const handlebuyform = (e) => {
      let {name , value} = e.target;
      HelperformValidation(name , value , setPriceValidations , setQuantityValidation , stock.price , marginAllowed);
      if((buyform.quantity * buyform.price) > user.balance){ 
        setBalance(true)
       }
       else{
        setBalance(false);
       }
      setBuyform({...buyform , [name] : value});
  };

  const handleDisableButton = () => {
    if((buyform.quantity * buyform.price) > user.balance){
      return true;
    }
      return priceValidation || quantityvalidation;
  }

    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {loader  && <div className="loader"></div>}
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
           <h5 className="modal-title" id="exampleModalLabel">{stock.name}</h5>
           <button onClick={handleCancelofBuyform} type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
           </div>
          <div className="modal-body">
            <form>
            {balance  && <div>  
                     <p className="red-error">Insufficient balance to complete the purchase. Please add funds to your wallet.</p>
                     <button className="btn btn-sm btn-danger"><a href="/">Add money</a></button>
                  </div>
            }
              <div className="form-group">
              {/* <NavLink to = "/">Add Money</NavLink> */} 
                <label htmlFor="quantity" className="col-form-label">Quantity</label>
                <input type="number" value = {buyform.quantity} name = "quantity" onChange = {handlebuyform} className="form-control"/>
                {quantityvalidation && <span className="validation-buy">Quantity must be greater than 0</span>}
              </div>

              <div className="form-group">
                <label htmlFor="price" className="col-form-label">Price:</label>
                <input type="number"  value = {buyform.price} name = "price" onChange = {handlebuyform} className="form-control"/>
                {priceValidation && <span className="validation-buy">price must be greater than equal to {(stock.price - marginAllowed).toFixed(2)} </span>}
              </div>
               
              <div className="modal-footer">
            <button type="button" onClick={handleCancelofBuyform} className="btn btn-secondary" data-dismiss="modal">Close</button>

            <button type="button" onClick = {handleBuyEvent} data-dismiss="modal" className="btn btn-primary" disabled = {handleDisableButton()}>Buy</button>
          </div>

            </form>
          </div>
          
        </div>
      </div>
    </div>
    )
}

export default BuyWindow;