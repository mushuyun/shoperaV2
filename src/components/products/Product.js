import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsProduct, saveProductReview  } from "./../productManage/crudActions";
import Rating from "../Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "./../productManage/crudConstants";


function Product(props) {
  let history = useHistory();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  
  async function addToCart(productId) {
    
    var e = document.getElementById("itemQty");

    let cart = [];
    if (localStorage.getItem("cart") !== null) {
      cart = JSON.parse(localStorage.getItem("cart"));
    } 
    let alreadyExists = false;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i]["product"]["_id"] === productId) {
        alreadyExists = true;
        cart[i]["qty"] += 1;
        break;
      } 
    }
    if (!alreadyExists) {
      cart.push({"product": product, "qty": parseInt(e.options[e.selectedIndex].value)});
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    history.push("/cart");
    history.go();
  } 

  return <div>
    <div className="back-to-result">
      <Link to="/">Back to home</Link>
    </div>
    {loading ? <div>Loading...</div> :
      error ? <div>{error} </div> :
      <>(
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product" ></img>
            </div>
            <div className="details-info">
              <ul>
                <li className="details-name">
                  <h3>{product.name}</h3>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating value={product.rating}
                    text={product.numReviews + `reviews`}
                    />
                  </a>
                </li>
                <li>
                  Price: <b>${product.price}</b>
                </li>
                <li>
                  Description:
                  <div className="desc">
                    {product.description}
                  </div>
                </li>
              </ul>
            </div>
            <div className="details-action">
        <ul>
          <li>
            Price: {product.price}
          </li>
          <li>
            Status: {product.status}
          </li>
          <li>
            Qty: <select id="itemQty">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </li>
          <li>
              <button className="button primary" id="add" onClick={() => addToCart(product._id)}
              >Add to Cart</button>
          </li>
        </ul>
      </div>
    </div>
    <div className="content-margined">
    <h2>Reviews</h2>
    {!product.reviews.length && <div>There is no review</div>}
    <ul className="review" id="reviews">
      {product.reviews.map((review) => (
        <li key={review._id}>
          <div>{review.name}</div>
          <div>
            <Rating value={review.rating}></Rating>
          </div>
          <div>{review.createdAt.substring(0, 10)}</div>
          <div>{review.comment}</div>
        </li>
      ))}
      <li>
        <h3>Write a customer review</h3>
        {userInfo ? (
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <label htmlFor="rating">Rating</label>
                <select
                  name="rating"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="1">1- Poor</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very Good</option>
                  <option value="5">5- Excelent</option>
                </select>
              </li>
              <li>
                <label htmlFor="comment">Comment</label>
                <textarea
                  name="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </li>
              <li>
                <button type="submit" className="button primary">
                  Submit
                </button>
              </li>
            </ul>
          </form>
        ) : (
          <div>
            Please <Link to="/signin">Sign-in</Link> to write a review.
          </div>
        )}
        </li>
      </ul>
    </div>
    </>
   }
  </div>
}
export default Product;