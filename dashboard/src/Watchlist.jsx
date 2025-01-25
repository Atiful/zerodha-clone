
import * as React from 'react';
import { useState , useContext , useEffect} from "react";
import Tooltip from '@mui/material/Tooltip';
import {GeneralContext} from './GeneralContext';
import { ApifeatchAllWatchList } from './Helper/api';
import { HelperHandleSearchBar } from './Helper/helper'; 
import Loader from './HelperComponent/Loader';
import { DounutChart } from './DounutChart';
import userContext from './contextAPI/userContext';

function Watchlist() {
    const [watchlistdata , setwatchListdata] = useState([]);
    const [searchStock , setsearchStock] = useState("");
    const [filteredwatchlist , setfilteredwatchlist] = useState([]);
    const [checksearchActive , setchecksearchActive] = useState(false);
    const [loader , setLoader] = useState(true);
    // const donutChartRef = React.useRef(null);

    const handleSearchBar = (e) => {
         HelperHandleSearchBar(e , setsearchStock , setchecksearchActive , setfilteredwatchlist);
    }

     useEffect(() =>  {
            ApifeatchAllWatchList(setwatchListdata);
            setLoader(false);
        } , []);


     const Watchlistdata = checksearchActive ? filteredwatchlist : watchlistdata;

const labels = Watchlistdata.map((curr) => curr.name);

     const GraphData = {
        labels,
        datasets: [
          {
            label: 'WatchList',
            data: Watchlistdata.map((curr) => curr.price),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

    return (
        <div className="watchlist">
            {loader && <Loader></Loader>}
            <div className="indices-container">
                <div className="nifty">
                    <p className="index red">NIFTY 50</p>
                    <p className="index-points red">{100.2}</p>
                    <p className="percent"></p>
                </div>
                <div className="sensex">
                    <p className="index green">SENSEX</p>
                    <p className="index-points green">{100.2}</p>
                    <p className="percent"></p>
                </div>
            </div>

            <div className="search-container">
               <input
                 onChange={handleSearchBar}
                 type="text"
                 name="searchStock"
                 value = {searchStock}
                 id="search"
                 placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
                 className="search"
                />
             <span className="counts">{Watchlistdata.length}</span>
             </div>

             <ul className="list">
                {Watchlistdata.map((stock , index) => {
                    return (
                        <WatchlistItem stock = {stock} key = {index}>
                        </WatchlistItem>
                    )
                })}
                <div id = 'donutChart'>
                <DounutChart data = {GraphData}></DounutChart>
                </div>
                
             </ul>
        </div>

    );
}

const WatchlistItem = ({stock}) => {
    const [showWatchListAction , setshowWatchListAction] = useState(false);

    const handleMouseEnter = (e) =>{
        setshowWatchListAction(true);
    }

    const handleMouseLeave = (e) =>{
        setshowWatchListAction(false);
    }

    return (
        <li className="d-flex justify-content-between px-3" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="item">
                <p className = {stock.isDown ? "down" : "up"} >{stock.name}</p>
            </div>

            <div className="listItem">
                <p className = {stock.isDown ? "down" : "up"}>{stock.percent}</p>
                <p className = {stock.isDown ? "down" : "up"}>{stock.isDown ? <i className="fa-solid fa-arrow-down"></i> : <i className="fa-solid fa-arrow-up"></i>}</p>
                <p className = {stock.isDown ? "down" : "up"}>{stock.price.toFixed(2)}</p>
            </div>
            {showWatchListAction && <WatchlistAction stock = {stock}></WatchlistAction>}
        </li>
    )
};

const WatchlistAction = ({stock})=> {

   const generalContext = useContext(GeneralContext);
   const {user} = useContext(userContext);
   const handlebuyclick = () => {
    generalContext.openBuyWindow(stock);
   }

   const handleSellclick = () => {
    generalContext.openSellWindow(stock);
   }

  

    return <span  className='actions'>
           
           {user && 
            <Tooltip title = "buy" placement='top'>
                <button onClick = {handlebuyclick} className='btn btn-sm btn-primary m-1' data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">buy</button>
            </Tooltip> }

           {user && 
            <Tooltip title = "sell" placement='top'>
                <button className='btn btn-sm btn-danger m-1' onClick={handleSellclick} data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">sell</button>
            </Tooltip> }

            <Tooltip title = "Ananlytics" placement='top'>
            {/* onClick={handleAnalyticsClick} */}
            <a href="#donutChart">
              <button  className='btn btn-sm btn-light m-1'><i className="fa-solid fa-chart-simple"></i></button>
            </a>
              
            </Tooltip>
            <Tooltip title = "more" placement='top'>
            <button className='btn btn-sm btn-dark m-1'>More</button>
            </Tooltip>
    </span>
};


export default Watchlist;
