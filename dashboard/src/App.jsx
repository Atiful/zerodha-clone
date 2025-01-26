import Nav from "./Nav";
import "./App.css";
import Dashboard from "./Dashboard";
import Holdings from "./Holdings";
import Positions from "./Postions";
import Appps from "./Appps";
import Funds from "./Otp";
import Watchlist from "./Watchlist";
import Orders from "./Orders";
import PageNotFound from "./PageNotFound";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {GeneralContextProvider} from "./GeneralContext";
import ErrorBoundary from "./Error/ErrorBoundry";
import SignIn from "./signIn";
import SignUp from "./signUp";
import UserContextProvider from "./contextAPI/userContextProvider";
function App() {
  return ( 
    <>
    <UserContextProvider>
    <div className="check">
      <div className="watchlist-app">
        <GeneralContextProvider>
            <Watchlist></Watchlist>
        </GeneralContextProvider>
      </div>
      <div className="menu">
      <BrowserRouter>
    <Nav></Nav>
    <ErrorBoundary>
    <Routes>
        <Route path = "/" element = {<Dashboard></Dashboard>}></Route>
        <Route path = "/Holdings" element = {<Holdings></Holdings>}></Route>
        <Route path = "/Appps" element = {<Appps></Appps>}></Route>
        <Route path = "/Orders" element = {<Orders></Orders>}></Route>
        <Route path = "/Positions" element = {<Positions></Positions>}></Route>
        <Route path = "/Watchlist" element = {<ErrorBoundary><GeneralContextProvider><Watchlist></Watchlist></GeneralContextProvider></ErrorBoundary>}></Route>
        <Route path = "/Otp" element = {<Funds></Funds>}></Route>
        <Route path = "/signUp" element = {<SignUp></SignUp>}></Route>
        <Route path = "/signIn" element = {<SignIn></SignIn>}></Route>
        <Route  path = "*" element = {<PageNotFound></PageNotFound>}></Route>
    </Routes>
    </ErrorBoundary>
    </BrowserRouter>
    </div>
    </div>
    </UserContextProvider>
    </>
   );
}

export default App;