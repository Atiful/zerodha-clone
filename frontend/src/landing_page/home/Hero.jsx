import "../../css/home.css"


function Hero(){
    return (
        <>
        <div className="container ms-md-2 mb-3">
            <div className="row mt-3" id = "frontImg">
                <img src="/frontImg.png" alt="homeHeroImage"/>
            </div>

            <div className="row text-center mt-5">
            <h1>Invest in everything</h1>
            <p className="text-center">Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>

             <a href="https://investwise-dashboard.onrender.com/SignUp" className="hero btn btn-primary mt-3 p-2 fs-5">Sign up now</a>
            </div>
        </div>
    
       </>
    )

}


export default Hero;