
import { useState , useEffect} from "react";
import { ApifetchpositionData } from "./Helper/api";

function Positions() {


    let [allposition , setAllPosition] = useState([]);
     // used for data loading for the first time
 useEffect(() => {ApifetchpositionData(setAllPosition)} , []);


    return ( 
        <>

        <div className="holdings holdings-new container-fluid">
            <div className="order-table my-4">

            <button type="button" className="btn btn-dark mt-3">
               Positions <span className="badge badge-light">{allposition.length}</span>
             <span className="sr-only">unread messages</span>
          </button>

            <table>
                <thead className="heading-table">
                <tr> 
                <th>Product</th>
                <th>price</th>
                <th>Net</th>
                <th>day</th>
            </tr>
            </thead>
           
           {allposition.map((stock , index) => {
               const dayLoss = stock.isLoss ? "loss" : "profit"
               return (
                <tr key = {index}> 
                <td>{stock.name}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={dayLoss}>{stock.net}</td>
                <td className={dayLoss}>{stock.day}</td>
            </tr>
               )
           })}
            </table>
            </div>
        </div>
        </>
     );
}

export default Positions;