import { useDispatch } from "react-redux";
import { toggleTheme } from "../store/slices/themeSlice";
import { signoutSuccess} from "../store/slices/authSlice";
import { useEffect } from "react";
const Home = () => {

  const dispatch = useDispatch();
useEffect(()=>{
},[])



  return (
    <div className="">
      
      <button className="" onClick={() => dispatch(signoutSuccess())}>Signout</button>
      <button className="" onClick={() => dispatch(toggleTheme())}></button>
      <div className="">
        <h2 className="text-primary dark:text-primary-light">
          Primary Section
        </h2>
        <div className="flex gap-5">
          <div className="p-8 bg-surface-dark flex gap-6">
            <input className="border-0 border-primary-200 px-10 py-2 bg-surface-light   rounded-lg" />
            <input className="border-0 border-primary-200 px-10 py-2 bg-surface   rounded-lg" />
          </div>
          <button className="bg-primary text-on-primary p-2 rounded border border-primary">
            Primary Action
          </button>
          <button className="bg-secondary text-on-secondary p-2 rounded border border-secondary mt-2">
            Secondary Action
          </button>
          <button className="bg-tertiary text-on-tertiary p-2 rounded border border-tertiary mt-2">
            Tertiary Action
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
