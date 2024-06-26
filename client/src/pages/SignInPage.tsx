import { BsEye, BsEyeSlash, BsGoogle } from 'react-icons/bs'
import Button from '../component/ui/Button'
import InputText from '../component/ui/InputText'
import { useState } from 'react'
import BrandLogo from '../component/BrandLogo'
import { BiLoader } from 'react-icons/bi'

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [loader, setLoader] = useState(false)
  const handleSignin = () =>{
    setLoader(true)
    setMessage('Signin successfull');

  }
  return (
    <div className='h-screen bg-surface-light flex justify-center items-center ' >
    <div className=' max-w-md w-full flex flex-col gap-y-6' >
      <div>
        <BrandLogo/>
        <h2 className='text-3xl text-left'>Welcome Back !</h2>
        </div>
        <InputText name='email'  label='email' type='text' />
        <div>
          <div className='relative'>
        <InputText name='Password' type={showPassword? 'text':'password'} label='Password' />
          <span className='absolute  top-2 right-2 cursor-pointer p-2' onClick={()=> setShowPassword(!showPassword)}>
          { showPassword?  <BsEyeSlash size={20} className='text-primary-300'/>:<BsEye size={20} className='text-primary-300'/> } 
            </span>
        </div>
        <p className='mt-1 text-right'>Forgot Password?</p>
        </div>
        <Button variant="primary" clickHandle={handleSignin} >
          {loader && <BiLoader className='animate-spin '/>}
        Signin</Button>
        {
          message && <p>{message}</p>
        }
        <div className='border-b border-primary-100/50 flex justify-center'><span className='translate-y-[15px] bg-surface-light px-3 py-1 rounded-full'>or</span></div>
        <Button variant="secondary" ><BsGoogle/> Continue with Google</Button>
    </div>
    </div>
  )
}

export default Signin