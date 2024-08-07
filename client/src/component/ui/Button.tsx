import React from 'react'

interface ButtonProps {
    children: string | React.ReactNode;
    variant?: 'primary'| 'secondary';
    clickHandle?: ()=>void;
    disabled?: boolean,
    className?:string,
    type?: 'button' | 'submit'
}
const Button = ({children , variant='primary', clickHandle, disabled=false, className, type='button'}:ButtonProps) => {
    const  BtnVariant = variant === 'secondary'? 'bg-secondary-500 h text-on-secondary hover:bg-secondary-600 ouline-1 focus:outline-secondary-700': 'bg-primary-500 text-on-primary hover:bg-primary-600 ouline-1 focus:outline-primary-700';
    const  disable = disabled? 'opacity-50 cursor-not-allowed   ':'';
  return (
    <button className={`${BtnVariant} ${disable} py-3 rounded-lg w-full    flex justify-center items-center gap-x-2 ${className}  `} disabled={disabled} onClick={clickHandle} type={type}>
        {children}</button>
  )
}

export default Button