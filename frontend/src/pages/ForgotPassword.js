

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import Loginlogo from "../Asset/signin.gif";
import ImageToBase64 from "../helpers/ImageToBase64";
import summaryApi from "../Common";
import { toast } from "react-toastify";
import UploadImage from "../helpers/UploadImage";

function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setshowconfirmPassword] = useState(false);
 const navigate=useNavigate()

  const [data, setdata] = useState({
    email: "",
    password: "",
  
    confirmPassword: "",
   
  });

  const [err, seterr] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  // console.log(err);
  // ...............................................

  const CollectData = (e) => {
    const { name, value } = e.target;


    setdata((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    })
    
    console.log('pass',data)

}
  // ..............................................

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    
     
    

  data.password.length<Number(8) ?
        seterr((prev)=>{
          
          return{
            ...prev,
            password:'password must be atleast 8 characters'
          } 
        }) :
        
      
        seterr((prev)=>{
          
          return{
            ...prev,
            password:''
          }
          
        })
    

    data.password !== data.confirmPassword ?
      seterr((prev) => {
        return {
          ...prev,
          confirmPassword: "confirm password is not matching",
        };
      }) :
      seterr((prev)=>{
          
        return{
          ...prev,
          confirmPassword:''
        }
        
      })
    

    if (data.password.length >= Number(8) &&data.password === data.confirmPassword) 
      
      {

   try{
      const response = await fetch(summaryApi.ForgotPassword.url, {
        method: summaryApi.ForgotPassword.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
   
    const userdata = await response.json();
    console.log(userdata)
    if(userdata.success){
    seterr((prev) => {
      return {
        ...prev,
       
        password: "",
        email: "",
        confirmPassword: "",
      };
    });

    setdata((prev) => {
      return {
        ...prev,
      
        password: "",
        email: "",
        confirmPassword: "",
      };
    });
    // toast.success(userdata.message)
    toast.success ('password updated successfully')
    navigate('/login')
    console.log(userdata)

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

  // ................................................

 

  return (
    <section id="signup">
      <div className="mx-auto container p-4 mt-3">
        <div className=" p-2 py-7 w-full max-w-xl mx-auto rounded-xl bg-blue-50">
          

          <form className="pt-3" onSubmit={handleSubmit}>
           
            <div className=" p-1">
              <label className="text-red-500 text-2xl font-medium">
                Email :{" "}
              </label>
              <div className="bg-blue-100 rounded-full my-3 p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  onChange={CollectData}
                  value={data.email}
                  required
                  className="w-full h-full outline-none bg-blue-100 rounded-full p-2"
                />
              </div>
            </div>

            <div className="p-1">
              <label className="text-red-500 text-2xl font-medium">
               New Password :{" "}
              </label>
              <div className="bg-blue-100  rounded-full flex my-3 p-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  name="password"
                  value={data.password}
                  onChange={CollectData}
                  required
                  className="w-full h-full outline-none bg-transparent p-2 "
                />
                <div
                  className="cursor-pointer mt-2 mr-2 text-2xl "
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaRegEyeSlash /> : <FaEye />}</span>
                </div>
             
              </div>
              <p className="text-red-500 mb-1 ml-2 ">{err.password && err.password}</p>
            </div>

            <div className="p-1">
              <label className="text-red-500 text-2xl font-medium">
                {" "}
                Confirm New Password :{" "}
              </label>
              <div className="bg-blue-100  rounded-full flex my-3 p-2">
                <input
                  type={showconfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={CollectData}
                  required
                  className="w-full h-full outline-none bg-transparent p-2 "
                />
                <div
                  className="cursor-pointer mt-2 mr-2 text-2xl "
                  onClick={() => setshowconfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showconfirmPassword ? <FaRegEyeSlash /> : <FaEye />}
                  </span>
                 
                </div>
              </div>
              <p className="text-red-500 mb-1 ml-2">
                    {err.confirmPassword && err.confirmPassword}
                  </p>

              {/* <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline text-xl text-red-500 underline'>forgot password ?</Link> */}
            </div>
{/*            
            <p className="text-red-500 mb-1 ml-2 text-xl">{apierror}</p> */}
            <button
              className="bg-black text-white px-6 py-3 w-full max-w-[280px] rounded-full hover:scale-110 transition-all text-2xl mx-auto block mt-2"
              type="submit"
            >
              ChangePassword
            </button>
          </form>
          <p className="my-5 text-xl ml-3">
            {" "}
            already an existing user ?{" "}
            <Link
              to={"/login"}
              className="hover:text-red-500  text-red-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword