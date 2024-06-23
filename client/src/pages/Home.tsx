import { BiShapeSquare } from 'react-icons/bi'

const Home = () => {
  return (
    <div>
         <div className="border border-slate-300 rounded-md p-5  flex flex-col">
        <span className="flex  justify-center"><BiShapeSquare size={32} /></span>
        <p> Welcome to Connexs Application</p>
      </div>
    </div>
  )
}

export default Home