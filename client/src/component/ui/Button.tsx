import React from 'react'

interface ButtonProps {
    children: string | React.ReactNode;
    variant?: 'primary'| 'secondary';
    clickHandle?: ()=>void;
}
const Button = ({children , variant='primary', clickHandle}:ButtonProps) => {
    const  BtnVariant = variant === 'secondary'? 'bg-secondary-500 h text-on-secondary hover:bg-secondary-600 ouline-1 focus:outline-secondary-700': 'bg-primary-500 text-on-primary hover:bg-primary-600 ouline-1 focus:outline-primary-700';
  return (
    <button className={`${BtnVariant} py-3 rounded-lg  flex justify-center items-center gap-x-2  `} onClick={clickHandle}>
        {children}</button>
  )
}

export default Button