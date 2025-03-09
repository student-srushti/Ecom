import React, { useContext, useEffect, useRef, useState } from "react";
import CreateStore from "../Context/CreateStore";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
 import "./Nav.css"
 import { FaShoppingCart } from 'react-icons/fa';
 import { FaHome } from 'react-icons/fa';

function Nav() {
  let { setData ,data } = useContext(CreateStore);
  let {pathname} = useLocation()
  console.log(pathname,'pathname');
  let [nav, setNav] = useState()
  let ref = useRef()

  useEffect(()=>{
    axios.get("http://localhost:5000/products")
    .then((resp)=>{
      console.log(resp.data,"resp.data nav")
      setNav(resp.data)
    })
  },[])

  function showSearchBox(e){
    if(pathname == "/productdesc/1"){
      setData(e.target.value)
      document.getElementById('pp').style.display = "block"
      // ref.current.style.display = "block"
    }else{
      setData(e.target.value)
      document.getElementById('pp').style.display = "none"
      // ref.current.value.style.display = "none"
    }
  }

  return (
    <>
      <div className="flex gap-2 ml-2 h-[100px] w-full bg-black text-white justify-around text-3xl">
      <ul className="flex">
        <Link to="/"><FaHome className="ml-8 mt-8"/></Link>
        <Link to="/" className="ml-8 mt-8"><li>Home</li></Link>
        
      </ul>
        <input className="block border-2 w-54 h-[50px] m-auto rounded-xl" type="search" ref={ref} onChange={(e) => {showSearchBox(e)}}/>
        {
        data != "" ?
        <div id='pp' className="searchbox" >
        {
            nav.map((val)=>{
              console.log(nav,'nav');
            return(
              <>
                <h1>{val.name}</h1>
              </>
            )
          })
        }
        </div> : ""
        }
        <h2 className="m-auto h-[50px] mt-8">Search for Products</h2>
        <Link to="/cart"><FaShoppingCart className="mr-8 mt-8"/></Link>
      </div>
    </>
  );
}

export default Nav;
