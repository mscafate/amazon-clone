import React, { useState, useEffect } from 'react'
import "./Home.css"
import Product from "./Product"
import { useStateValue } from "./StateProvider"
import { db } from "./firebase"

function Home() {
    
    const [{ basket, user, search, menu }, dispatch] = useStateValue();
    
    /*
    const [products, setProducts] = useState([])
    useEffect(() => {
        db.collection('products').onSnapshot(snapshot => (
         setProducts(snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()    
        })))
    ))
    //console.log('Title useEffect(): ', products[0])
    }, [])
    */

    /*
    var book = db.collection('products').get().then((snapshot) => {
        getInfo(snapshot.docs)
    })

    function getInfo(data) {
        data.forEach(doc => {
            var info = doc.data();
            console.log('title', info.title)
        })
    }
    */

    /*
    https://images-eu.ssl-images-amazon.com/images/G/02/
    digital/video/merch2016/Hero/Covid19/Generic/
    GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg
    */
   /* 
                    <Product 
                        id="0001"
                        title="the lean startup"
                        price={29.99}
                        image="https://play-lh.googleusercontent.com/VUJ-ENDVVS_8IhabKfewbXZ6f4_t0a4AbZZ2GURq55gTfZEWeBcxFkYQQ6sCQ-UWuI8adABab7SYQg=s400-rw"
                        rating={5}
                    />

                    <Product 
                        id=
                        title=
                        price=
                        image=
                        rating=
                    />

                    <Product 
                        id={products[0].id}
                        title={products[0].data.title}
                        price={products[0].data.price}
                        image={products[0].data.image}
                        rating={products[0].data.rating}
                    />
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
                        title="the lean startup"
                        price={29.99}
                        image="https://play-lh.googleusercontent.com/VUJ-ENDVVS_8IhabKfewbXZ6f4_t0a4AbZZ2GURq55gTfZEWeBcxFkYQQ6sCQ-UWuI8adABab7SYQg=s400-rw"
                        rating={5}
                    />
                    {console.log('Home menu: ', menu)}
                    <Product 
                        id="0002"
                        title="Kenwood kMix Stand Mixer"
                        price={239.0}
                        rating={4}
                        image="https://kitchenaid-h.assetsadobe.com/is/image/content/dam/global/kitchenaid/countertop-appliance/portable/images/hero-KP26M1XSL.tif"
                    />
                </div>

                <div className="home__row">
                    <Product
                        id="0003" 
                        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor"
                        price={199.99}
                        rating={3}
                        image="https://m.media-amazon.com/images/I/71916r38cNL._AC_SX679_.jpg"
                    />
                    <Product 
                        id="0004"
                        title="Amazon Echo (3rd generation) Smart speaker with Alexa, Charcoal Fabric"
                        price={98.99}
                        rating={5}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1HElBD_Och8p6KyisvSLi_syNqTi0fvnQX-pfBaIyhF5WFGJmKqhxCtq7kRrZXylxTwqZXhWI&usqp=CAc"
                    />
                    <Product 
                        id="0005"
                        title="New Apple iPad Pro Silver"
                        price={598.99}
                        rating={4}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIqInFTE-OKKQjQpQnIJSthdwF1i071cnZbIzJHjspMhP5A0VrHCdoCgFNrFvI0P-txjnxYn_z&usqp=CAc"
                    />
                </div>

                <div className="home__row">
                    <Product 
                        id="0006"
                        title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor 5120 x 1440"
                        price={1094.98}
                        rating={4}
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4RC6S4waY_pObQrsyiVx8h7ynaMrGKnE6QkkXLf8il2TAj7FDra-JEC_RER1JdSSglb4-DhU&usqp=CAc"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home
