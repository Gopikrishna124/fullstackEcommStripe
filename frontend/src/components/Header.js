import React, { useEffect, useLayoutEffect, useState } from "react";
import Logo from "./Logo.js";
import { MdManageSearch } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../Common/index.js";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userDetailsSlice.js";
import ROLE from "../Common/role.js";
import { useContext } from "react";
import Context from "../context/index.js";
import { cartByUserDetails, selectCartByUser } from "../store/CartSlice.js";

function Header() {
  const usersdata = useSelector((state) => state?.userDetails?.user);

  const cartByUserData = useSelector(selectCartByUser);

  let TotalItems = 0;

  cartByUserData?.map(
    (item) => (TotalItems = TotalItems + Number(item.quantity))
  );

  console.log(TotalItems);
  // console.log('userdata',usersdata)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminpop, setadminpop] = useState(true);
  const {click,setClick,checkAdded,search,setSearch}=useContext(Context) 
 const location=useLocation()


  async function handleLogout() {
    try {
      const response = await fetch(summaryApi.logout.url, {
        method: summaryApi.method,
        credentials: "include",
      });

      const data = await response.json();
      console.log("data", data);
      if (data.success) {
        toast.success(data?.message);
        dispatch(setUserDetails(""));
        navigate("/login");
       setClick({})
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      toast.error(err);
    }
  }
  //////////////////////////////////////////////////
  const handleSearch=(e)=>{
    console.log('e',e.target.value)
    const {value}=e.target
    setSearch(e.target.value)
    if(value){
     navigate(`/search?q=${value}`)
     
    }
     
  }
  function resetSearch(){
     setSearch('')
  }
  if(!location.search){
  resetSearch()
  }
  

  return (
    <header className="h-28 shadow-md md:fixed md:w-full z-50 bg-blue-50">
      <div className="h-full md:container mx-auto flex items-center px-4 justify-between">
        <div>
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-lg border rounded-full focus-within:shadow pl-3 border-blue-200 ">
          <input
            type="text"
            placeholder="Search any Product...."
            className="w-full outline-none bg-transparent text-black placeholder-black"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[70px] bg-black flex items-center justify-center rounded-r-full">
            <MdManageSearch className="w-10 h-8 text-white" />
          </div>
        </div>

        <div className="flex items-center  gap-3 md:gap-7">
          {usersdata._id && (
            <div className="relative  flex justify-center">
              <div className="text-3xl cursor-pointer ">
                {usersdata?.profilePic ? (
                  <div className="flex ">
                    {usersdata.role === ROLE.ADMIN && (
                      <div className="hidden md:flex">
                        <Link
                          className="bg-black text-sm  flex justify-center items-center mx-auto text-white rounded-full px-4 py-2 mt-3 mr-7"
                          to={"/admin-panel/All-products"}
                          onClick={() => setadminpop(!adminpop)}
                        >
                          Admin DashBoard
                        </Link>
                      </div>
                    )}
                    <img
                      src={usersdata?.profilePic}
                      className="hidden md:w-14 md:block h-14 rounded-full"
                      alt={usersdata.name}
                    />
                  </div>
                ) : (
                  <FaUser className="hidden md:block text-black text-3xl" />
                  
                )}
               
              </div>
              
            </div>
          )}
          <Link to={'/cart'} className=" text-2xl md:text-4xl cursor-pointer mt-1 relative mr-2 md:mr-0">
         
            <span>
              <FaCartArrowDown className="text-black" />
            </span>
           
            <div className="bg-red-600 w-5 h-5 md:w-6 md:h-7  text-white border rounded-full flex items-center justify-center  absolute -top-3 left-5">
              <p className="text-sm ">{usersdata._id ? TotalItems : 0}</p>
            </div>
          </Link>
          {
            usersdata.role !== ROLE.ADMIN  && usersdata._id &&
          <Link to='/order' className="bg-black text-sm md:text-xl px-2 py-1 md:px-5 md:py-2 rounded-full  md:justify-center text-white">Orders</Link>
           }
            <div>
            {usersdata ? (
              <Link
                className="bg-black  text-sm md:text-xl px-2 py-1 md:px-5 md:py-2 rounded-full  justify-center text-white"
                onClick={handleLogout}
              >
                Logout
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="bg-black  text-sm md:text-xl px-2 py-1 md:px-5 md:py-2 rounded-full justify-center text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
