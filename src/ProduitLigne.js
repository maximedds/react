import React from 'react';



export default class ProduitLigne extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        let produit = this.props.produit;
        return (
            <React.Fragment>
                
 
      <tbody>
                <tr>
                    <td>{produit.id_produit}</td>
                    <td>{produit.nom}</td>
                    <td>{produit.quantite}</td>
                    <td>{produit.description}</td>
                    <td><img className="image" src={produit.url_image}></img></td>
                    <td>{produit.id_categorie}</td>
                    <td>{produit.prix_actuel}</td>

                    <td>
                        
                        <button className="Afficher-Button" type="button" onClick={() => {window.location.href = 'produits/' + (produit.id_produit)}}> Afficher</button>
                        <button className="Modifier-Button" type="button" onClick={() => {window.location.href = 'produits/edit/' + (produit.id_produit)}}>Modifier</button>
                        <button className="Delete-Button" onClick={() => this.props.deleteCallback((produit.id_produit))}> Supprimer </button>
                    </td>
                </tr>
                
      </tbody>

 

            </React.Fragment>
        );
    }
}