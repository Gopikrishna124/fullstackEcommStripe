import React, { useContext, useState } from 'react'
import Loginlogo from '../Asset/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import summaryApi from '../Common';
import Context from '../context';
import { cartByUserDetails } from '../store/CartSlice';
import { useDispatch } from 'react-redux';


function Login() {
    const [showPassword,setShowPassword]=useState(false)
    const[data,setdata]=useState({
        email:'',
        password:''
    })
  const navigate=useNavigate()
  const {fetchUserdetails}=useContext(Context)
  const {click,setClick,checkAdded}=useContext(Context)
  const dispatch=useDispatch()
 
    // .................................................

    const CollectData=(e)=>{
        const {name,value}=e.target
        setdata((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
       
    }
    // ..........................................................

    const handleSubmit2=async(e)=>{

        e.preventDefault()
       
     
       if(data.email.length <Number(1) || data.password.length<Number(1)){ 
        
         toast.error('email or password should not be empty ') 
       }
       else{

        try{
             
          const response=await fetch(summaryApi.login.url,{
            method: summaryApi.signUp.method,
            credentials:'include',
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          })
          const userdata=await response.json()
       

          if(userdata.success){
            setdata((prev)=>{
              return {
                ...prev,
                email:'',
                password:''
              }
            })
            toast.success('login successful')
            navigate('/')
            fetchUserdetails()
            dispatch(cartByUserDetails())
            checkAdded()
            
            
          }
          else{
            throw userdata.message
          }
          
        }
        catch(err){
            console.log(err)
            toast.error(err)
        } 
      }

 }
   
  return (
    <section id='login'>
        <div className='mx-auto container p-4 mt-3 min-h-[calc(100vh-300px)]'>
          <div className=' p-2 py-7 w-full max-w-xl mx-auto rounded-xl bg-blue-50'>
            <div className='w-20 h-20 mx-auto'>
                <img src={Loginlogo} alt='login-form' className='bg-transparent !important'/>
            </div>
            
            <form className='pt-3' onSubmit={handleSubmit2}>
                <div className=' p-2'>
                    
                    <label className='text-red-500 text-2xl font-medium'>Email : </label>
                    <div className='bg-blue-100 rounded-full my-3 p-2'>
                    <input type='email'
                     placeholder='enter email' 
                     name='email'
                     onChange={CollectData}
                     value={data.email}
                    className='w-full h-full outline-none bg-blue-100 rounded-full p-2'/>
                    </div>
                    
                 
                </div>

                <div className='p-2'>
                    <label className='text-red-500 text-2xl font-medium'>Password : </label>
                   <div className='bg-blue-100  rounded-full flex my-3 p-2'>
                   <input type={showPassword ? "text" :"password"}
                    placeholder='enter password' 
                    name='password'
                    value={data.password}
                    onChange={CollectData}
                    className='w-full h-full outline-none bg-transparent p-2 '/>
                   <div className='cursor-pointer mt-2 mr-2 text-2xl ' onClick={()=>setShowPassword((prev)=>!prev)}>
                     <span>  
                       {
                       showPassword ?(
                        
                        <FaRegEyeSlash />
                        
                        )  :
                         (
        
                            <FaEye/>
                            
                         )
                    }
                    </span>
                
                    </div>
                   </div>

                   <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline text-xl text-red-500 underline'>forgot password ?</Link>
                </div>
          

                <button className='bg-black text-white px-6 py-3 w-full max-w-[180px] rounded-full hover:scale-110 transition-all text-2xl mx-auto block mt-2' type='submit'>Login</button>
            </form>
            <p className='my-5 text-xl ml-3'> Don't have an account ? <Link to={'/sign-up'} className='hover:text-red-500  text-red-500 hover:underline'>Sign Up</Link></p>
          </div>
        </div>
    </section>
  )
}

export default Login