import { useEffect, useState } from 'react'

import './App.css'
interface Res {
  message: string;
}
function App() {
  const [res, setRes] = useState<Res>({ message: 'Test' })

  useEffect(()=>{
    const fetchData =async ()=>{
      const res = await fetch('http://localhost:4000/');
      if(!res.ok){
        return console.log('Error while connect')
      }
      const data = await res.json();
      console.log(data.message)
      setRes(data)
    }
    fetchData();
  },[])
  return (
    <>
        <p>Data: {res.message}</p>
     
    </>
  )
}

export default App
