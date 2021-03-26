import React from 'react';
import './FicheProduit.css';

export default class FicheProduit extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            produit : {
                id_produit : "",
                nom : "",
                quantite : "",
                description : "",
                url_image : "",
                id_categorie : "",
                prix_actuel : "",
            }
        }
    }

    render(){
        return (
            <ul class="tilesWrap">
            <li>
                <h2>{this.state.produit.nom}</h2>
                <h3>{this.state.produit.nom}</h3>
                <p>
                {this.state.produit.description}
                </p>
                <p>Prix : {this.state.produit.prix_actuel}€</p>
                <p>Quantité disponible : {this.state.produit.quantite}</p>
                <p><img className="image" src={this.state.produit.url_image}></img></p>
            </li>
           
        </ul>
        )

    }

    componentDidMount(){
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/produits/"+id, {
            method: "GET"
        })
        .then((data)=>data.json())
        .then((res)=>{
        this.setState({produit : res}) //{"id":4,"nom":"produit 4","categorie":{"id":1,"nom":"cat 1"}}
        console.log(res)
      })
    }
}