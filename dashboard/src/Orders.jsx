import { useContext, useEffect, useState } from "react";
import Empty from "./HelperComponent/Empty";
import { ApifindAllorderList } from "./Helper/api";
import Search from "./HelperComponent/Search"
import userContext from "./contextAPI/userContext";
import Loader from "./HelperComponent/Loader";

function Orders() {
    let [orderList , setorderList] = useState([]);
    let [isEmptyOpen , setisEmptyopen] = useState(false);
    let [loader , setLoader] = useState(false);
    let {user} = useContext(userContext);

    const [orderfilterData , setorderfilterdata] = useState([]);
    const [ordersearchbarActivate , setordersearchbarActive] = useState(false);

    useEffect(() => {
      const details = async () => {
        setLoader(true);
       await  ApifindAllorderList(setorderList , user);
       setLoader(false);
      } 
      details();
    } , [user]);

    useEffect(() => {
        setisEmptyopen(!orderList || !orderList.length);
    } , [orderList]);

    const orders = ordersearchbarActivate ? orderfilterData : orderList;

    return ( 
          <>
          {loader && <Loader></Loader>}
          {orderList.length == 0 && <Empty message = {"Orders"}></Empty>}
          {!isEmptyOpen && <OrderComponent orders = {orders} setorderFilterdata = {setorderfilterdata} searchorderbarActivate = {setordersearchbarActive} ></OrderComponent>}
          </>
     );
}

const OrderComponent = ({orders , setorderFilterdata , searchorderbarActivate}) => {

    return (
        <>
         <div className="holdings holdings-new container-fluid">
            <div className="order-table my-4">
            <button type="button" className="btn btn-dark mt-3 mb-3">
               Orders <span className="badge badge-light">{orders.length}</span>
             <span className="sr-only">unread messages</span>
          </button>

          {/* search bar */}
          <Search setFilterdata = {setorderFilterdata}  searchbarActivate = {searchorderbarActivate} apply = {"order"}></Search>
          {orders.length == 0 && <Empty message = {"Orders"}></Empty>}
          {orders.length != 0  &&
            <table>
                <thead className="heading-table">
                <tr> 
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>sold Price</th>
                <th>Net Profit</th>
                <th>Mode</th>
                <th>Transation</th>
            </tr>
            </thead>

            <tbody>
           {orders.map((order , index) => {

                   const orderDate = new Date(order.createdAt);
                   const formattedDate = orderDate.toLocaleDateString();
                   const formattedTime = orderDate.toLocaleTimeString();
               const dayLoss = order.netProfit >= 0 ? "profit" : "loss";
               const modeColor = (order.mode == "sell" || order.mode == "SELL") ? "green" : "red";
               return (
                <tr key = {index}> 
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>{order.price ? order.price.toFixed(2) : 0}</td>
                <td>{order.mode.toLowerCase() === "sell" ? order.soldPrice : "-"}</td>
                <td className={dayLoss}>{order.mode.toLowerCase() === "sell" ? order.netProfit ?  order.netProfit.toFixed(2) : 0  : "-"}</td>
                <td className={modeColor}>{order.mode}</td>
                <td>{formattedDate} {formattedTime}</td>
            </tr>
               )
           })}
           </tbody>
            </table> }
            </div>
        </div>
        </>
    )
}


export default Orders;