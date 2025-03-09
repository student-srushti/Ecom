import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./product/Product";
import Description from "./Description/Description";
import CreateStore from "./Context/CreateStore";
import ProviderFunction from "./Context/ProviderFunction";
import Nav from "./Navigationbar.jsx/Nav";
import Addtocart from './Cart/Addtocart'

function App() {
  return (
    <>
      <BrowserRouter>
        <ProviderFunction>
          <Nav/>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/cart" element={<Addtocart />} />
            <Route path="/productdesc/:id" element={<Description />} />
          </Routes>
        </ProviderFunction>
      </BrowserRouter>
    </>
  );
}

export default App;
