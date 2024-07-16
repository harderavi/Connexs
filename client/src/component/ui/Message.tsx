import { useEffect, useState } from "react";
import { AiOutlineInfo } from "react-icons/ai";
import { FiCheck } from "react-icons/fi";

interface MessageProps{
    message:string;
    messageType: boolean;
}

const Message:React.FC<MessageProps> = ({message, messageType }) => {
    const [fixedPostion, setFixedPosition] = useState(true)
    useEffect(()=>{
      const timer = setTimeout(()=>{

          setFixedPosition(false)
      },3000)
      return ()=> clearTimeout(timer)
    },[])

  return (
    <div className={`flex text-left   rounded-md   px-2 py-1 w-auto text-sm gap-2 ${messageType? 'text-red-600': 'text-green-600'}  ${ fixedPostion? 'fixed top-14 right-5 bg-white  rounded-md px-4 py-1 shadow-lg' : 'relative'}` }>
      <span className={`w-5 h-5  rounded-full flex items-center justify-center ${messageType?  'bg-red-600' : 'bg-green-50'}`}>
        { messageType?
        <AiOutlineInfo className="text-white"/>:
          <FiCheck className="text-white"/>
        }
          </span>
      {message}
      
      </div>
  )
}

export default Message