import React from 'react';
import ProductCard from '../../Component/ProductCard/ProductCard.js';
import { instanceAxs } from '../../api/Api.js';
import { fileApi } from '../../config/index.js';
import "./Menu.css";

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoading: true
        }
    }

     async getItems () {
        await instanceAxs.get(`${fileApi}/getmenuitems`)
        .then(response => {
            console.log("Retrived items: ", response);
            this.setState({
                items: response.data.items,
                isLoading: false
            })
        })
    }
    
    componentDidMount(){
        this.getItems();
    }
    
    render(){
        return(
            <div className="container HomePageContainer">
                <div className="homePageItems">  
                    { (this.state.items.length > 0 && this.state.isLoading === false) ? 
                    
                    (this.state.items.map(item => {
                        var annonce = item.annonce;
                        return(
                                <div key={annonce._id}>
                                    <ProductCard 
                                    img={annonce.images} 
                                    price={annonce.price} 
                                    name={annonce.title} 
                                    id={annonce._id}/> 
                                    </div>                          
                        ) 
                    }))
                    : 
                    <p>loading</p>
                }                                                      
                </div>
            </div>       
        )
    }   
}

export default Menu;