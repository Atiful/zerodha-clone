import { useState , useContext, useEffect} from "react";
import { GeneralContext } from "./GeneralContext";
import { ApifetchSingleHolding, ApiPlaceSellOrder } from "./Helper/api";
import { HelperformValidationSell } from "./Helper/helper";
import userContext from "./contextAPI/userContext";

function SellWindow({stock , mode}){
   const [sellForm , setsellForm] = useState({quantity : 1 , price : stock.price});
   const  [priceValidation , setPriceValidations] = useState(false);
  const  [quantityvalidation , setQuantityValidation] = useState(false);
  const [stockQuantity , setstockQuantity] = useState(0);
  const marginAllowed = stock.price * 0.2;
  const {user} = useContext(userContext);
  const [loader , setLoader] = useState(false);

  const generalContext = useContext(GeneralContext);

  // cancel the close sell window
  const handleCloseSellwindow = () => {
    generalContext.closeSellWindow();
  }

  // collecting the info of the stcoks details
  useEffect(() => {
    ApifetchSingleHolding(stock.name , setstockQuantity , user._id);
  } , []);


    const handleSellButton = async () => {
      setLoader(true);
     await  ApiPlaceSellOrder(stock.name , sellForm.quantity , sellForm.price , mode , marginAllowed , user);
      setLoader(false);
          handleCloseSellwindow();
    }

    const handleDisableButton = () => {
      return priceValidation || quantityvalidation;
     }

   const handlesellform = (e) => {
     const {name , value} = e.target;
     HelperformValidationSell(name , value , marginAllowed , setPriceValidations , setQuantityValidation , stock.price , stockQuantity);
     setsellForm({...sellForm , [name] : value});
   }

    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {loader && <div className="loader"></div>}
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
           <h5 className="modal-title" id="exampleModalLabel">{stock.name}</h5>
           <button onClick={handleCloseSellwindow} type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
           </div>
          <div className="modal-body">
            <form>

              <div className="form-group">
                <label htmlFor="quantity" className="col-form-label">Quantity : {stockQuantity} {stockQuantity == 0 && <p className="stock-not-avaibale">The stock is not avaibale in your Hodling</p>}</label>
                <input onChange = {handlesellform} value = {sellForm.quantity} type="number" name = "quantity" className="form-control" id="quantity"/>
                {quantityvalidation && <span className="validation-buy">Quantity must be greater than 0 and less that {stockQuantity}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="price" className="col-form-label">Price:</label>
                <input onChange = {handlesellform} type="number" value = {sellForm.price} name = "price" className="form-control" id="price"/>
                {priceValidation && <span className="validation-buy">price must be greater than 0 and less than {(stock.price + marginAllowed).toFixed(2)}</span>}
                
              </div>
               
              <div className="modal-footer">
            <button onClick = {handleCloseSellwindow} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" onClick = {handleSellButton} data-dismiss="modal" className="btn btn-danger" disabled = {handleDisableButton()}>Sell</button>
          </div>

            </form>
          </div>
          
        </div>
      </div>
    </div>
    )
}

export default SellWindow;