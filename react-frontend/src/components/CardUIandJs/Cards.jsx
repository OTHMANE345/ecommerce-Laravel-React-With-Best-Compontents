import React,{Componen, useEffect, useState} from "react";
import   Card  from "./CardUI"; // Importing Card and Button components from react-bootstrap
import img1 from "../../assets/img/pexels-markus-spiske-1343537.jpg";
import axiosClient from "../../axios-client";

const CustomCard = () => {
    const [products, setProducts] = useState([]);
     useEffect( () => {
        getP()
     } , [])


     const getP = () => {
        axiosClient.get('/products')
        .then(({data})=>{
            setProducts(data)
             console.log(data);
            //  setNavig(true);

        })
    .catch(err => {
        const response = err.response;
        if(response && response.status == 422){
            console.log(response.data.errors);
        }
    })
     }
     {/* id={p.id} price={p.price} product_name={p.product_name} */}
    return (

    <div  className="container-fluid d-flex justify-content-center" id="ghu">

      <div className="row">
        {products.map(p => (
        <div key={p.id} className="col-md-4">
            <Card  imgsrc={p.image} title={p.name} description={p.description} id={p.id} />

        </div>))}


      </div>
    </div>

  );
};

export default CustomCard; // Exporting the corrected Card component
