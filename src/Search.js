import React from "react";

import { useStateValue } from "./StateProvider"
import SearchProduct from "./SearchProduct"
function Search() {
    const [{ menu, search, user }, dispatch] = useStateValue();
    

    if(search !== '') {
        console.log('menu: ', menu);
        // student.firstName.toLowerCase().includes(searchTerm.toLowerCase())
        /*
        const addToMenu = () => {
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
        }    
        */
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
          }, search)
          */
        return (
            <div>
                {menu?.filter((product) => {
                    if(product.title.toLowerCase().includes(search.toLowerCase())) {
                        console.log('filter: ', product.title)
                        return product;
                    }
                }).map(product => {
                    return (
                        
                        
                        <SearchProduct 
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            image={product.image}
                            rating={product.rating}
                        />
                        
                    )
                })
                
                }
            </div>
        )
    } else {
    return (
        <div>
            nothing
            
        </div>
    )
    }
}

export default Search
