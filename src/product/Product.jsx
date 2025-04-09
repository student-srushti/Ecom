import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import CreateStore from "../Context/CreateStore";
import useAxiosApi from "../CustomHook/useAxiosApi";

function Product() {
  let {data} = useContext(CreateStore)
  // console.log(data,'data')
  let [apiData, setApiData] = useState([])
  let [filterData, setFilterData] = useState([])
  console.log(data,"data inside product");
  let returnData = useAxiosApi("http://localhost:5000/products")
  console.log(returnData,'returnData');

  useEffect(() => {
    setApiData(returnData)
    setFilterData(returnData)
  }, [returnData])

 useEffect(()=>{
  let filterData = apiData.filter((val)=>{
    return val.name.toLowerCase().includes(data.toLowerCase()) || val.id.toLowerCase().includes(data.toLowerCase())
  })
  console.log(filterData,'filterData');
  setFilterData(filterData)
 },[data])

  return (
    <div>
      <div className="boxContainer">
        {filterData?.map((val) => {
          var pp = `productdesc/${val.id}`;
          return (
            <>
              <Link to={pp}>
                <div className="box">
                  <img src={val.images[1]} alt="" />
                  <p className="text-3xl">{val.name}</p>
                </div>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
