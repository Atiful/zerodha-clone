import { useContext, useEffect, useState } from "react";
import { ApisearchbarHolding } from "../Helper/api";
import userContext from "../contextAPI/userContext";


function Search({setFilterdata , searchbarActivate , apply}){
    
    let {user} = useContext(userContext);
    const [search , setsearch] = useState('');

    // useEffect(() => {
        
    // })

    const handlesearch = (e) => {
        const newSearch = e.target.value;
        if(newSearch){
         ApisearchbarHolding(newSearch , setFilterdata , apply , user);
         searchbarActivate(true);
        }
        else{
            searchbarActivate(false);
        }
        setsearch(e.target.value);
    }

    return (
    <div className="form-group search-holding mx-2 mt-1">
    <input type="text" value = {search} onChange={handlesearch} className="form-control" id="inputtext" placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"/>
  </div>
    )
}

export default Search;