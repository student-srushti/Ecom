import React, { useState } from 'react';
import CreateStore from "./CreateStore";

function ProviderFunction({children}) {
    let [data, setData] = useState("")
  return (
    <>
    {/* <h1>Provider Function</h1> */}
    <CreateStore.Provider value={{data, setData}}> 
        {children}
        </CreateStore.Provider>
    </>
  )
}

export default ProviderFunction

