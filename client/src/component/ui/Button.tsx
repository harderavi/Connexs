import React from 'react'

interface ButtonProps {
    children: string | React.ReactNode;
    variant?: 'primary'| 'secondary';
    clickHandle?: ()=>void;
    disabled?: boolean
}
const Button = ({children , variant='primary', clickHandle, disabled=false}:ButtonProps) => {
    const  BtnVariant = variant === 'secondary'? 'bg-secondary-500 h text-on-secondary hover:bg-secondary-600 ouline-1 focus:outline-secondary-700': 'bg-primary-500 text-on-primary hover:bg-primary-600 ouline-1 focus:outline-primary-700';
    const  disable = disabled? 'opacity-50 cursor-not-allowed   ':'';
  return (
    <button className={`${BtnVariant} ${disable} py-3 rounded-lg    flex justify-center items-center gap-x-2  `} disabled={disabled} onClick={clickHandle}>
        {children}</button>
  )
}

export default Button