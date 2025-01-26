import { useState , useEffect } from "react";
import userContext from "./userContext";
import { isLoginOrNot } from "../Helper/api";
const UserContextProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
   const [loader , setLoader] = useState(true);
   
    const updateUser = async () => {
        try {
            const response = await isLoginOrNot();
            console.log(response);
            console.log(user);
            console.log(isLogin);
            if (response?.data?.user) {
                setUser((prev) => {
                    return {...response.data.user};
                });
                setIsLogin(true);
            } else {
                setUser(null);
                setIsLogin(false);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            setUser(null);
            setIsLogin(false);
        }  finally{
            setLoader(false);
        }
    }

    useEffect(() => {
        const fetchUserData = async () => {
               await updateUser();
        };
        fetchUserData();
    }, []);

 


    return (
        <userContext.Provider value = {{user , isLogin , setUser , setIsLogin , updateUser , loader}}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider;