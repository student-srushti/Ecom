import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./description.css";
import { useReducer } from "react";

function Description() {
  let param = useParams();
  let id = param.id;
  console.log(param, "param");
  let [singleData, setsingleData] = useState([]);
  let [img, setImg] = useState("");

  function reducer(state, action) {
    if (action.type == "inc") {
      return state + 1;
    }
    if (action.type == "dcr") {
       return  state > 1 ? state - 1 : 1 
    }
  }
  let [state, dispatch] = useReducer(reducer, 1);

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`).then((resp) => {
      console.log(resp.data, "resp  inside product desc");
      setsingleData([resp.data]);
      setImg([resp.data.images[1]]);
    });
  }, []);

  console.log(singleData, "singleData");

  function addToCart(val){
    console.log(val,"val")
    let newData = {...val, addToCart : true, quantity : 1}
    console.log(newData,'newData')

    updateData(val.id,newData)
  }

  function updateData(id,newData){
    axios.put( `http://localhost:5000/products/${id}`,newData)
    .then((resp)=>{
      console.log(resp.data,"cart data");
    })
  }

  return (
    <>
      {singleData.map((val) => {
        console.log(val.images[1], "ll");
        return (
          <>
            <div className="mainContainer">
              <div className="imgContainer">
                <div className="mainimg">
                  <img src={img} alt="" />
                </div>
                <div className="downimg">
                  <div className="img">
                    <img
                      src={val.images[1]}
                      alt=""
                      onMouseOver={() => {
                        setImg(val.images[1]);
                      }}
                    />
                  </div>
                  <div className="img">
                    <img
                      src={val.images[2]}
                      alt=""
                      onMouseOver={() => {
                        setImg(val.images[2]);
                      }}
                    />
                  </div>
                  <div className="img">
                    <img
                      src={val.images[3]}
                      alt=""
                      onMouseOver={() => {
                        setImg(val.images[3]);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="descContainer">
                <h1>{val.name}</h1>
                <p>{val.description}</p>
                <h3>{val.price * state}</h3>
              
                <button className="btn3" onClick={() => dispatch({ type: "inc" })}>Incre</button>
                {state}
                <button  className="btn4" onClick={() => dispatch({ type: "dcr" })}>Decre</button>
                <div className="btn">
                  <button className="btn1"  onClick={addToCart(val)}>Add to Cart</button>
                  <button className="btn2">Wishlist</button>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Description;
