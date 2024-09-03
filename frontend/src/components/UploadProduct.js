import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import productCategory from "../helpers/ProductCategory";
import { FaUpload } from "react-icons/fa6";
import UploadImage from "../helpers/UploadImage";
import DisplayLargeImage from "./DisplayLargeImage";
import { MdDelete } from "react-icons/md";
import summaryApi from "../Common";
import { toast } from "react-toastify";
import Context from "../context";



function UploadProduct({ onClose }) {
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openZoomImage, setopenZoomImage] = useState(false);
  const [currentZoomImage, setCurrentZoomImage] = useState("");
   const {getallProducts}=useContext(Context)
  ///////////////////////////////////////////////////////////////
  function handleInput(e) {
    let name = e.target.name;
    let value = e.target.value;
    setProductData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  //////////////////////////////////////////////////////////////////
  async function handleUploadProductImage(e) {
    const files = e.target.files[0];
    console.log("files", files);

    const uploadedOnCloudinary = await UploadImage(files);
    // console.log('uploaded Image',uploadedOnCloudinary.url)

    setProductData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadedOnCloudinary.url],
      };
    });
  }
  ////////////////////////////////////////////////////////////////////////////////
  function ZoomImage(imgUrl) {
    setopenZoomImage(!openZoomImage);
    setCurrentZoomImage(imgUrl);
  }
  /////////////////////////////////////////////////////////////////////////////////

  function handleImageDelete(img) {
    let deleted = productData.productImage.filter((item) => item !== img);
    // console.log(productData.productImage);
    setProductData((prev) => {
      return {
        ...prev,
        productImage: deleted,
      };
    });
  }
  ////////////////////////////////////////////////////////////
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log(productData);

    let requirements = true;
    for (const key in productData) {
      if (productData[key] === "") {
        requirements = false;
      }
    }

    console.log("req", requirements);

    if (requirements) {
      try {
        const response = await fetch(summaryApi.uploadProduct.url, {
          method: summaryApi.uploadProduct.method,
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(productData),
        });

        const data = await response.json();
        console.log("product-Data", data);
        if (data.success) {
          toast.success(data.message);
          getallProducts()
          onClose();
        
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        toast.error(err);
      }
    } else {
      toast.error("all fields must be filled");
    }
  }
  return (
    <>
      <div className="fixed w-full h-full bg-blue-100 bg-opacity-40 top-0 bottom-0 right-0 left-0  flex justify-center items-center">
        <div className="bg-blue-50 p-3 rounded w-full max-w-2xl  h-full max-h-[80%] overflow-hidden">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-2xl ml-[200px]">Upload Product</h2>
            <div className="text-2xl cursor-pointer" onClick={onClose}>
              <IoMdClose />
            </div>
          </div>

          <form
            className="grid p-4 gap-2 overflow-y-scroll h-full max-h-[90%]"
            onSubmit={handleSubmit}
          >
            <label htmlFor="productName" className="font-bold">
              Product Name :
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="enter product name"
              value={productData.productName}
              onChange={handleInput}
              className="p-2 border rounded"
            />

            <label htmlFor="brandName" className="font-bold mt-2">
              Brand Name :
            </label>
            <input
              type="text"
              id="brandName"
              name="brandName"
              placeholder="enter brand name"
              value={productData.brandName}
              onChange={handleInput}
              className="p-2 border rounded"
            />

            <label htmlFor="category" className="font-bold mt-2">
              Category :
            </label>
            <select
              className="p-2 border rounded"
              value={productData.category}
              name="category"
              onChange={handleInput}
            >
              <option value={""}>Select Category</option>
              {productCategory.map((el, index) => {
                return (
                  <option value={el.value} key={index}>
                    {el.label}
                  </option>
                );
              })}
            </select>

            <label htmlFor="productImage" className="font-bold mt-2">
              Product Image :
            </label>
            <label htmlFor="uploadImageInput">
              <div className="p-2 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                <div className="text-slate-500 flex justify-center items-center flex-col">
                  <span className="text-4xl">
                    <FaUpload />
                  </span>
                  <p className="text-xl mt-2">Upload Product Image</p>
                  <input
                    type="file"
                    id="uploadImageInput"
                    className="mt-2 hidden"
                    onChange={handleUploadProductImage}
                  />
                </div>
              </div>
            </label>
            <div>
              {productData?.productImage[0] ? (
                <div className="flex gap-2  cursor-pointer ">
                  {productData.productImage.map((img, index) => {
                    return (
                      <div className="relative">
                        <img
                          src={img}
                          width={60}
                          height={80}
                          className="border max-h-[100px]"
                          onClick={() => ZoomImage(img)}
                        />
                        <div
                          className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1"
                          onClick={() => handleImageDelete(img)}
                        >
                          <MdDelete />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-red-500"> *please upload product Image</p>
              )}
            </div>

            <label htmlFor="price" className="font-bold mt-2">
              Price :
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="enter price name"
              value={productData.price}
              onChange={handleInput}
              className="p-2 border rounded"
            />

            <label htmlFor="sellingPrice" className="font-bold mt-2">
              Selling Price:
            </label>
            <input
              type="number"
              id="sellingPrice"
              name="sellingPrice"
              placeholder="enter selling price"
              value={productData.sellingPrice}
              onChange={handleInput}
              className="p-2 border rounded"
            />

            <label htmlFor="description" className="font-bold mt-2">
              Description:
            </label>
            <textarea
              name="description"
              value={productData.description}
              className=" border rounded  min-h-28 p-2"
              rows={3}
              onChange={handleInput}
              placeholder="enter description"
            />

            <button
              className="bg-black text-white rounded mt-3 p-4 "
              type="submit"
            >
              Upload Product
            </button>
          </form>
        </div>
      </div>

      <div>
        {openZoomImage && (
          <DisplayLargeImage
            imgUrl={currentZoomImage}
            close={() => setopenZoomImage(false)}
          />
        )}
      </div>
    </>
  );
}

export default UploadProduct;
