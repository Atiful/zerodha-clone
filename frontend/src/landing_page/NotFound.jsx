import { Link } from "react-router-dom";
function NotFound() {
    return ( 
        <div className="container mx-md-2 mb-3 text-center mb-4">

            <div className="row text-center mt-5">
            <h1 className="mb-3">404 Not Found</h1>
            <p className="text-center">sorry , The page is not Found</p>

            <Link to = "/">Go Home</Link>
            </div>
        </div>
     );
}

export default NotFound;