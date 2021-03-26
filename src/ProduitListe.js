import React from 'react';
import { Link} from 'react-router-dom';
import ProduitLigne from './ProduitLigne';
import './ProduitListe.css';

export default class ProduitListe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: {},
            produits: []

        }
    }
    

    render() {
		return (
            <React.Fragment>
                <table>
                    <caption><h1>Nos véhicules</h1></caption>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Quantite</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Catégorie</th>
                        <th>Prix</th>
                        <th>Action</th>
                    </tr>
                    {this.props.produits.map( (produit)=> {
                        return (
                            <ProduitLigne  key ={produit.id_produit.toString()} produit={produit} deleteCallback={this.props.deleteCallback}/>
                        );
                    })}
                </table>   
            </React.Fragment>
        );
    }
}