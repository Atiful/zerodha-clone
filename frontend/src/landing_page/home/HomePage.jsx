import OpenAccount from "../OpenAccount";
import Hero from "./Hero";
import People from "./People"
import Nav from "../Nav";
import Footer from "../Footer";


function HomePage(){
    return (
         <>
         <Hero></Hero>
         <People></People>
         <OpenAccount></OpenAccount>
        </>

    )
}


export default HomePage;