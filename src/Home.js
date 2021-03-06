import React, { useState, useEffect } from "react";
import "./Home.css";
import Product from "./Product";
import { useStateValue } from "./StateProvider";
import { db } from "./firebase";

function Home() {
  const [{ basket, user, search, menu }, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);
  /*
  useEffect(async () => {
    await db.collection("products").onSnapshot((snapshot) => {
      const product = snapshot.docs.map((doc) => {
        console.log("products >>>>", doc.id);
        setProducts(doc.data());
        return {
          id: doc.id,
          data: doc.data(),
        };
      });
    });
  }, []);
  useEffect(async () => {
    console.log("list of products >>>", products);
  }, [products]);
*/
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
        <div className="home__row">
          <Product
            id="0001"
            key={1}
            title="The Lean Startup"
            price={29.99}
            image="https://play-lh.googleusercontent.com/VUJ-ENDVVS_8IhabKfewbXZ6f4_t0a4AbZZ2GURq55gTfZEWeBcxFkYQQ6sCQ-UWuI8adABab7SYQg=s400-rw"
            rating={5}
          />
          {console.log("Home menu: ", menu)}
          <Product
            id="0002"
            key={2}
            title="Kenwood kMix Stand Mixer"
            price={39.99}
            rating={4}
            image="https://kitchenaid-h.assetsadobe.com/is/image/content/dam/global/kitchenaid/countertop-appliance/portable/images/hero-KP26M1XSL.tif"
          />
        </div>

        <div className="home__row">
          <Product
            id="0003"
            key={3}
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
            price={199.99}
            rating={3}
            image="https://m.media-amazon.com/images/I/71916r38cNL._AC_SX679_.jpg"
          />
          <Product
            id="0004"
            key={4}
            title="Amazon Echo (3rd generation) Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={5}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1HElBD_Och8p6KyisvSLi_syNqTi0fvnQX-pfBaIyhF5WFGJmKqhxCtq7kRrZXylxTwqZXhWI&usqp=CAc"
          />
          <Product
            id="0005"
            key={5}
            title="New Apple iPad Pro Silver"
            price={598.99}
            rating={4}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIqInFTE-OKKQjQpQnIJSthdwF1i071cnZbIzJHjspMhP5A0VrHCdoCgFNrFvI0P-txjnxYn_z&usqp=CAc"
          />
        </div>

        <div className="home__row">
          <Product
            id="0006"
            key={6}
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor 5120 x 1440"
            price={1094.98}
            rating={4}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4RC6S4waY_pObQrsyiVx8h7ynaMrGKnE6QkkXLf8il2TAj7FDra-JEC_RER1JdSSglb4-DhU&usqp=CAc"
          />
        </div>
        <div className="home__row home__footer">
          This is a FAKE amazon store created by Michael Scafate
        </div>
      </div>
    </div>
  );
}

export default Home;
