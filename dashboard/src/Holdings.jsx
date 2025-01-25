import { useContext, useEffect, useState } from "react";
import { Apifetchholdingdata } from "./Helper/api";
import Search from "./HelperComponent/Search";
import Empty from "./HelperComponent/Empty";
import userContext from "./contextAPI/userContext"
import Loader from "./HelperComponent/Loader";
import { VerticalBar } from "./VerticalBar";
function Holdings() {

 let [allHoldings , setAllHoldings] = useState([]);
 let [FilterHolding , setFilterHolding] = useState([]);
 let [issearchbarActive , setissearchbarActive] = useState(false);
 let {user} = useContext(userContext);
 let [loader , setLoader] = useState(true);
  


 // used for data loading for the first time
  useEffect(  () => {
    const holdingDetails = async () => {
   const allHolding =  await Apifetchholdingdata(user);
   setAllHoldings(allHolding);
    setLoader(false);
    }
    holdingDetails();
} , [user]);

const labels = allHoldings.map((curr) => curr.name);

 const Graphdata = {
  labels,
  datasets: [
    {
      label: 'Stock Quantity',
      data: allHoldings.map((stock) => stock.quantity),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

 
  const holdingData = issearchbarActive ? FilterHolding : allHoldings;


    return ( 
        <>

           {loader && <Loader></Loader>}

           <div className="holding-button container-fluid">
           <button type="button" className="btn btn-dark mt-3 mx-4">
               Holdings <span className="badge badge-light">{holdingData.length}</span>
               <span className="sr-only">unread messages</span>
             </button>
             <a href="#analytics">
               <button className="btn btn-info mt-3 mx-4">View Analytics</button>
             </a>
           </div>
           
             

              

            

          {!loader  && 
        <div className="holdings holdings-new container-fluid">


        
            <div className="order-table my-4">
                <Search setFilterdata = {setFilterHolding} searchbarActivate = {setissearchbarActive} apply = "holding"></Search>

                 {(holdingData.length == 0) && <Empty message = {"Holding is Empty"}></Empty>}

               { (holdingData.length != 0) && 
            <table>
                <thead className="heading-table">
                <tr> 
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Average Value</th>
                <th>curr price</th>
                <th>Total val</th>
                <th>P&L</th>
                <th>Net chg.</th>
                <th>Day chg.</th>
                <th>Last Modified</th>
            </tr>
            </thead>
            <tbody>
           {holdingData.map((stock , index) => {
               const currValue = stock.average * stock.quantity;
               const profclass = stock.isLoss ? "loss" : "profit";
               const dayLoss = stock.isLoss ? "loss" : "profit"
               const orderDate = new Date(stock.createdAt);
                const formattedDate = orderDate.toLocaleDateString();
                const formattedTime = orderDate.toLocaleTimeString();
               return (
                <tr key = {index}> 
                <td>{stock.name}</td>
                <td>{stock.quantity}</td>
                <td>{stock.average.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td>{currValue.toFixed(2)}</td>
                <td className={profclass}>{stock.netProfit.toFixed(2)}</td>
                <td className= "red">{stock.net}</td>
                <td className={dayLoss}>{stock.day}</td>
                <td>{formattedDate} {formattedTime}</td>
            </tr>
               )
           })}
           </tbody>
            </table>
                      }
            </div>
           
            <div className="investemt-details mt-2 mb-5" id = "analytics">

            {allHoldings.length != 0 && <VerticalBar data = {Graphdata}></VerticalBar>}
                {/* <div className="total-investment">
                    <h3>13.4K</h3>
                    <p>total Investment</p>
                </div>

                <div className="current-value">
                    <h3>123.54K</h3>
                    <p>current Value</p>
                </div>

                <div className="total-profitLoss">
                    <h3>22.2K <span className="perentage">+13.2%</span></h3>
                    <p>P&L</p>
                </div> */}
            </div>
        </div> } 
        </>
     );

}

export default Holdings;