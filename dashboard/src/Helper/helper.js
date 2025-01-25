import { Apisearchbar } from "./api";

export const HelperformValidation = (name , value , setPriceValidations , setQuantityValidation , stock , marginAllowed) => {
    setPriceValidations(name === "price" && (stock - marginAllowed) > value);
    setQuantityValidation(name === "quantity" && value <= 0);
  }



  export const HelperformValidationSell = (name , value , marginAllowed , setPriceValidations , setQuantityValidation , stockPrice , stockQuantity) => {
    if (name === "price") {
      if (value <= 0 || (stockPrice + marginAllowed) < value) {
          setPriceValidations(true);
      } else {
          setPriceValidations(false);
      }
  }

  // Only validate quantity if the field is 'quantity'
  if (name === "quantity") {
      if (value <= 0 || value > stockQuantity) {
          setQuantityValidation(true);
      } else {
          setQuantityValidation(false);
      }
  }
  }

  export const HelperHandleSearchBar = (e , setsearchStock , setchecksearchActive , setfilteredwatchlist) =>{
    let newSearch = e.target.value;
        setsearchStock(e.target.value);
        if(newSearch){
            Apisearchbar(newSearch , setfilteredwatchlist);
            setchecksearchActive(true);
        }
        else{
            setchecksearchActive(false);
        }
  }

  export const handleSignUpForm =  (name , value , setError) => {
    if(name == "username" && value == ""){
        setError((prev) => {
           return {...prev , username : "username Cannot be empty" , submit : true};
        });
    }
    else if(name == "password" && value.length < 6){
       setError((prev) => {
           return {...prev , password : "password length must be greater than 6 length" , submit : true};
       });
    }
    else if (name === "email" && 
        !(value.includes("@gmail.com") || value.includes("@net.com")) || 
        value === "") {
   setError((prev) => {
       return { ...prev, email: "Email must contain a proper extension", submit: true };
   });
}

    else{
       setError((prev) => {
           return {...prev , [name] : "" , submit : false};
       });
    }
   
}


export const handleformData = (e , setAddMoney ,  setError) => {
    setAddMoney(e.target.value);
    if(e.target.value > 10000){
       setError(true);
    }
    else{
     setError(false);
    }
}

export const HoldingsInfo = (holdings) => {
 let currProfit = 0;
 let currInvest = 0;

  for(let i = 0; i < holdings.length; i++){
    currProfit += holdings[i].netProfit;
    currInvest += holdings[i].average * holdings[i].quantity;
  }

  let info = {
    totalholding : holdings.length,
    investment : currInvest,
    profit : currProfit,
  }

  return info;
}


export const generateRandomNumber = () => {
    let random =[];
    random[0] = Math.floor(Math.random() * 10);
    random[1] = Math.floor(Math.random() * 10);
    random[2] = Math.floor(Math.random() * 10);
    random[3] = Math.floor(Math.random() * 10);
    random[4] = Math.floor(Math.random() * 10);
    random[5] = Math.floor(Math.random() * 10);
    return random;
}