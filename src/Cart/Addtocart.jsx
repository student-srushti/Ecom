import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxiosApi from "../CustomHook/useAxiosApi";

function Addtocart() {
  let [cart, setCart] = useState([]);
  let [refresh, setrefresh] = useState([]);
  let returnData = useAxiosApi("http://localhost:5000/products");
  console.log(returnData, "returnData");

  function getFilterdata() {
    let filterData = returnData.filter((val) => {
      return val.addToCart == true;
    });
    setCart(filterData);
  }

  useEffect(() => {
    getFilterdata();
  }, [returnData]);
  console.log(cart, "cart");

  function rmData(val) {
    console.log(val, "val");
    val.addToCart = false;
    updateData(val.id, val);
  }

  function updateData(id, newVal) {
    axios.put(`http://localhost:5000/products/${id}`, newVal).then((resp) => {
      console.log(resp.data, "removed data ");
      getFilterdata();
    });
  }

  return (
    <>
      {/* <h1>Cart</h1> */}
      {cart?.map((val) => {
        return (
          <>
          
            <div className="flex justify-center items-center">
            <div className="text-xl border-2 h-[450px] w-[500px] mb-10 mt-5">
            <img src={val.images[1]} alt="img" className="w-full h-[250px]" />
            <h1 className="text-3xl text-purple-800 ml-8">{val.name}</h1>
            <h1 className="ml-8">{val.quantity}</h1>
            <h1 className="ml-8">Price : {val.price}</h1>
            <button
            className="border-2  ml-8 bg-amber-600 text-white h-12 w-44"
              onClick={() => {
                rmData(val);
              }}
            >
              Remove from Cart
            </button>
            </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Addtocart;
