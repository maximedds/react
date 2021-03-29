import React from 'react';
import './ProduitFormulaire.css';
import { Link } from 'react-router-dom';

export default class ProduitFormulaireModif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit: {
                id_produit: props.id_produit || "",
                nom: props.nom || "",
                quantite: props.quantite || "",
                description: props.description || "",
                url_image: props.url_image || "",
                id_categorie: props.id_categorie || "",
                prix_actuel: props.prix_actuel || "",
            }
        }
    }

    handleChange = (evt) => {
        console.log(evt);
        evt.persist();
        let field = evt.target.name;
        let value = evt.target.value;
        this.setState((state) => state[field] = value)
        // this.setState((state)=>state[evt.target.name] = evt.target.value)
    }
    save = (evt) => {
        evt.preventDefault();//désactive l'action/opération par défaut du navigateur pour l'évènement onClick sur un bouton de from
        let product = {
            id_produit: this.state.id_produit,
            nom: this.state.nom,
            quantite: this.state.quantite,
            description: this.state.description,
            url_image: this.state.url_image,
            id_categorie: this.state.id_categorie,
            prix_actuel: this.state.prix_actuel,
        }
        this.props.saveCallback(product);
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