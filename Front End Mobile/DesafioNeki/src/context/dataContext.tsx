import jwt_decode from "jwt-decode";
import React, { useState, createContext } from "react";

export const DataContext = createContext({});


export const DataProvider = ({children}) =>{
    const [dataUser, setDataUser] = useState();
    
    

    const packageUserData = (jwtToken: string) =>{
        const decodedToken = jwt_decode(jwtToken);
    

        const user = JSON.parse(decodedToken.usuario);

    setDataUser({
        id: user?.userId,
        userLogin: user?.userLogin,
        token: jwtToken,
    })}

    return(
        <DataContext.Provider value={{
            dataUser,
            packageUserData
        }}>
            {children}
            </DataContext.Provider>
    );
    
}