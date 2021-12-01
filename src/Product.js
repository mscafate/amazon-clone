import React, { useEffect } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { auth, db } from "./firebase";

function Product({ id, title, image, price, rating }) {
  const [{ basket }, dispatch] = useStateValue();
  /*
    useEffect(() => {
        dispatch({
            type: 'ADD_TO_MENU',
            item: {
                id: id,
                key: id,
                title: title,
                image: image,
                price: price,
                rating: rating
            }
        })
      }, [])
      */

  const getPrice = (id) => {
    console.log("this is db >>>", db);
    db.collection("products").onSnapshot((snapshot) => {
      snapshot.docs.map((doc) => {
        console.log("this is doc >>", doc);
        if (doc.id === id) {
          console.log(doc.data(price));
          return doc.data(price);
        } else {
          console.log("not found");
        }
      });
    });
  };

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        key: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
