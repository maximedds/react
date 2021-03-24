import React from 'react';
import { Link } from 'react-router-dom';


export default class ProduitLigne extends React.Component {
    constructor(props) {
        super(props);

    }
    
    render() {
        let produit = this.props.produit;
        return (

            <tr>
                <td>{produit.id_produit}</td>
                <td>{produit.nom}</td>
                <td>{produit.quantite}</td>
                <td>{produit.description}</td>
                <td>{produit.url_image}</td>
                <td>{produit.id_categorie}</td>
                <td>{produit.prix_actuel}</td>
                {/* <td>
                    <Link to={this.props.match.url + '/1'}><button className="Afficher-Button" type="button">Afficher</button> </Link>
                    <Link to={this.props.match.url + '/edit/1'}><button className="Modifier-Button" type="button">Modifier</button></Link>
                    <button className="Delete-Button" onClick={() => this.delete(2)}> Supprimer </button>
                </td> */}

                {/* <td><img src={/images/${produit.nom}.jpg} width="50" height="50" /></td> */}

            </tr>

        );
    }
}