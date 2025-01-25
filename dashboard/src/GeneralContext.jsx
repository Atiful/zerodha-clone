import { useState , createContext } from "react";
import BuyWindow from "./BuyWindow";
import SellWindow from "./SellWindow";

const GeneralContext = createContext({
    openBuyWindow: (stock) => {},
    closeBuyWindow: () => {},
    openSellWindow : (stock) => {},
    closeSellWindow : () => {}
});

function GeneralContextProvider(props){
    const [isbuyWindowOpen , setIsbuyWindowOpen] = useState(false);
    const [isSellWindowOpen , setisSellWindowOpen] = useState(false);
    const [stockSelected , setstockSelected] = useState("");

  const handleOpenBuyWindow = (stock) => {
        setIsbuyWindowOpen(true);
        setstockSelected(stock);
      };

    const handleSellWindow = (stock) => {
         setisSellWindowOpen(true);
         setstockSelected(stock);
    };

    const handlecloseSellWindow = () => {
      setisSellWindowOpen(false);
      setstockSelected("");
 };


    
      const handleCloseBuyWindow = () => {
        setIsbuyWindowOpen(false);
        setstockSelected("");
      };


    return (
         <GeneralContext.Provider value = {{
            openBuyWindow : handleOpenBuyWindow,
            closeBuyWindow : handleCloseBuyWindow,
            openSellWindow : handleSellWindow,
            closeSellWindow : handlecloseSellWindow
        }}>
           {props.children}
            {isbuyWindowOpen && <BuyWindow stock = {stockSelected} mode = "BUY"></BuyWindow>}
            {isSellWindowOpen && <SellWindow stock = {stockSelected}  mode = "SELL"></SellWindow>}
       </GeneralContext.Provider>
    )
} 


export  {GeneralContext , GeneralContextProvider};