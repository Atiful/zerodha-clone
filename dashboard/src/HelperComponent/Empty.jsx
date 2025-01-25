
import {NavLink} from "react-router-dom"

function Empty({message}) {

    return ( 
        <div className="orders container-fluid d-flex mt-3">
            <div>
            <img src="book.jpg" alt="book image"/>
            </div>
               <p className="text-muted">You haven't Placed any {message}</p>
               <button className="btn first-color my-3"><NavLink to = "/Watchlist">Get Started</NavLink></button>
        </div>
     );
}

export default Empty;