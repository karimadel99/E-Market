import { createContext, useEffect, useState } from "react";

export let userContext=createContext();

export default function UserContextProvider({children}){



    useEffect(()=>{
     if (localStorage.getItem('userToken')) {
        setUserData(localStorage.getItem('userToken'))
     }
    },[])
    let [userData,setUserData]=useState(null)
    
    return <userContext.Provider value={{userData,setUserData}}>
     {children}
    </userContext.Provider>
}