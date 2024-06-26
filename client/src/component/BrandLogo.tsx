import React from 'react'
import { BiShapeSquare } from 'react-icons/bi';
import { Link } from 'react-router-dom'
interface BrandLogoProps  {
    size?:  'sm' | 'md' | 'lg';
    styleClass?: string;
}
const BrandLogo:React.FC<BrandLogoProps> = ({size='sm', styleClass}) => {
    const LogoSize = size === 'lg'? 48 : size === 'md'? 32 : 24
  return (
    <Link to="/" className={`flex space-x-2 gap-2 items-center text-xl uppercase outline-0 ${styleClass} `}><BiShapeSquare size={LogoSize} /> Connexs</Link> 
  )
}

export default BrandLogo