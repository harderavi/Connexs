import {  useEffect } from "react";

interface useClickOutsideProps {
    ref: React.RefObject<HTMLElement>;
    callback: ()=>void

}
const useClickOutside = ({ref, callback}:useClickOutsideProps) =>{
    useEffect(()=>{
        console.log('Outside')
        const handleClickOutside =(event:Event)=>{
            if(ref.current && !ref.current.contains(event.target as Node)){
                callback()
            }
        }
            document.addEventListener('mousedown', handleClickOutside);

            return () => {
              document.removeEventListener('mousedown', handleClickOutside);
            };
        
     
    },[ref, callback])
}

export default useClickOutside;

