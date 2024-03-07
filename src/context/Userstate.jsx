import React from 'react'
import { createContext } from 'react'
export const usercontext = createContext()


function Userstate({children}) {
  const [getdata, setgetData] = React.useState([]);
 const data = {
    getdata,
    setgetData
  }
  return (
    <usercontext.Provider value={data}>
        {children}
    </usercontext.Provider>

  )
}

export default Userstate