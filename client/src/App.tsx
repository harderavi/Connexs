import { useEffect, useState } from 'react'

import './App.css'
interface Res {
  username: string;
}
function App() {
  const [res, setRes] = useState<Res[]>([])

  useEffect(()=>{
    const fetchData =async ()=>{
      const res = await fetch('http://localhost:4000/users');
      if(!res.ok){
        return console.log('Error while connect')
      }
      const data = await res.json();
      console.log(data)
      setRes(data)
    }
    fetchData();
  },[])
  return (
    <>
        Data2 : {
         

            res.map((user,index )=>(
              <p key={index}> {user.username}</p>
            ))
          
        }
     
     
    </>
  )
}

export default App
