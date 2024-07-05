import { createContext, useState, useEffect } from "react"
import axios from "axios"


export const StoreContext = createContext({
  url: "",
})

const StoreContextProvider = (props: any) => {
  const url = "http://localhost:3001";



  const contextValue = {
    url,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
}

export default StoreContextProvider;

