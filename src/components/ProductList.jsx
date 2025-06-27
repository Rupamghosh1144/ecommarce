import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [input, setInput] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

  async function getProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
    setFilterProducts(data);
  }

  //useEffect
  //useEffect(cb,dependency)
  useEffect(function () {
    getProducts();
    console.log(products);
  }, []);

  function onInputChange(e) {
    setInput(e.target.value);
    const filteringproducts = products.filter((product) =>
      product.title.toLowerCase().includes(input.toLowerCase())
    );
    setFilterProducts(filteringproducts);
  }

  return (
    <div>
      <input
        className="border-amber-200 border-2 bg-blue-200 font-semibold py-2 px-4 rounded-full  center shadow-md "
        placeholder="search products"
        onChange={onInputChange}
      />

      <ul className="flex flex-wrap ">
        {filterProducts.map((product) => (
          <Link to={`${product.id}` } key={product.id}>
            <li key={product.id} className="shadow-lg m-4 rounded-2xl  h-84 w-84 p-5">
              <img src={product.image} alt={product.title} className="h-50" />
              <h1 className="text-green-300">{product.title}</h1>
              <p className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md items-center justify-center text-center">Price: ${product.price}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
