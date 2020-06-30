
import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProducts } from "./productManage/crudActions";
import Rating from "./Rating";
import "bootstrap/dist/css/bootstrap.css";


function Home(props) {
//loading full product list....
  const productList = useSelector(state => state.productList);
  const { products } = productList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, []);
//sort product by category.....
  const category = props.match.params.id ? props.match.params.id : "";
  useEffect(() => {
    dispatch(listProducts(category));
    return () => {
      //
    };
  }, [category]);

  return <>
  {category &&
    <h2>{category}</h2>}
     <ul className="products"> {
          products.map(product =>
              <li key={product._id}>
                <div className="products">
                  <Link to={"/product/" + product._id}>
                    <img className="product-image" src={product.image} alt="product"/>
                  </Link>
                  <div className="product-name">
                    <Link to={"/product/" + product._id}>{product.name}</Link>  
                  </div>
                  <div className="product-desc">{product.description}</div>
                  <div className="product-brand" >{product.brand}</div>  
                  <div className="product-price">${product.price}</div>
                  <div className="product-rating">
                  <Rating value={product.rating}
                    text={product.numReviews + `reviews`}
                    />
                  </div>
                </div>
              </li>)
          }
        </ul>
    </>
  
}
export default Home;