import React from "react";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { LuUsers2 } from "react-icons/lu";

function AdminPanel() {
  const usersdata = useSelector((state) => state?.userDetails?.user);
  return (
    <div className="min-h-[calc(100vh-170px)]  flex">
      <aside className="bg-blue-50 min-w-[360px] customShadow max-h-[600px]">
        <div className=" bg-blue-50 h-44 flex justify-center items-center flex-col ">
          <div className="text-4xl cursor-pointer flex justify-center">
            {usersdata?.profilePic ? (
              <img
                src={usersdata?.profilePic}
                className="w-24 h-24 rounded-full"
                alt={usersdata.name}
              />
            ) : (
              <FaUser className="text-black" />
            )}
          </div>
          <p className="capitalize text-xl font-semibold">{usersdata?.name}</p>
          <p className="capitalize text-md font-semibold">{usersdata?.role}</p>

        </div>

        <div>
            <nav className="grid p-4">
                <Link to={'all-users'} className="px-2 py-1 text-2xl hover:bg-blue-100 flex border-b-2 border-black">
                {/* <span className="mr-5  text-3xl text-black"><LuUsers2/></span>    */}
               <button className="bg-black text-white px-4 py-1 text-center rounded-md">All users </button>  
               
            </Link>
                <Link to={'All-products'}  className="px-2 py-1 text-2xl hover:bg-blue-100 mt-3  border-b-2 border-black">
                <button className="bg-black text-white px-4 py-1 text-center rounded-md">All Products</button>
                </Link>
                  
                <Link to={'All-orders'}  className="px-2 py-1 text-2xl hover:bg-blue-100 mt-3">
                <button className="bg-black text-white px-4 py-1 text-center rounded-md">All orders</button>
                </Link>

            </nav>
        </div>
      </aside>
      <main className="w-full h-full p-2">
        <Outlet/>
      </main>
    </div>
  );
}

export default AdminPanel;
