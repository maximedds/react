import React from 'react';
import './ProduitFormulaire.css';
import { Link } from 'react-router-dom';

export default class ProduitFormulaireModif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: {
                id_produit: "",
                nom: "",
                quantite: "",
                description: "",
                url_image: "",
                id_categorie: "",
                prix_actuel: "",
            }
        }
    }
    render() {
        const edit = !!this.props.match.params.id;

        return (

            <div class="add-box">
                <h2>{this.state.produit.nom}</h2>
                <form>

                <div class="champ">
                        <input required="true" type="text" name="nom" value={this.state.produit.nom}/><label> nom :</label>
                    </div>
                    <div class="champ">
                        <input required="true" type="number" name="quantite" value={this.state.produit.quantite} /><label>  quantite :</label>
                    </div>
                    <div class="champ">
                        <input required="true" type="text" name="description" value={this.state.produit.description} /> <label>   description : </label>
                    </div>
                    <div class="champ">
                        <input required="true" type="text" name="url_image" value={this.state.produit.url_image} /><label> url_image : </label>
                    </div>
                    <div class="champ">
                        <input required="true" type="number" name="id_categorie" value={this.state.produit.id_categorie} /> <label> id_categorie :</label>
                    </div>
                    <div class="champ">
                        <input required="true" type="number" name="prix_actuel" value={this.state.produit.prix_actuel} /><label>Prix actuel :</label>

                    </div>
                    <Link to="/produits" className="Valider" onClick={this.props.save}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
      Valider
    </Link>
                    <Link to="/produits" className="Annuler">

                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
      Annuler
         </Link>
                </form>
            </div>
        );
    }
    
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch("http://localhost:8080/produits/" + id, {
            method: "GET"
        })
            .then((data) => data.json())
            .then((res) => {
                this.setState({ produit: res }) //{"id":4,"nom":"produit 4","categorie":{"id":1,"nom":"cat 1"}}
                console.log(res)
            })
    }
}