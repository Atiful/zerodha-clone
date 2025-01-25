
function PageNotFound({error}){

        return (
            <div className="container text-center" style={{ marginTop: '100px' }}>
                <h1 className="display-1">{error ? "" : "404"}</h1>
                <h2 className="display-4">{error ? <p className = "error">{error}</p> : "Page Not Found"}</h2>
                <p className="lead">
                    {!error && " Sorry, the page you are looking for does not exist."}
                   
                </p>
                <a href="/" className="btn btn-primary mt-2">Go to Home</a>
            </div>
        );
}

export default PageNotFound;