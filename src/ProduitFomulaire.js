import React from 'react';
import './ProduitFormulaire.css';
export default class ProduitFormulaire extends React.Component {
    constructor(props) {
        super(props);
        console.log("props" + props);
        this.state = {
            produit: {
                id_produit: "",
                nom: "",
                quantite: "",
                description: "",
                url_image: "",
                id_categorie: "",
                prix_actuel: ""
            }
        }
    }

    handleChange = (evt) => {
        console.log("evt : " + evt);
        evt.persist();
        let field = evt.target.name;
        let value = evt.target.value;
        this.setState((state) => state.produit[field] = value)
    }

    save = (evt) => {
        console.log("Dans save...");
        evt.preventDefault();
        let categorie = {
            id_categorie: this.state.id_categorie || this.state.produit.id_categorie
        }
        let produit = {
            id_produit: this.state.produit.id_produit,
            nom: this.state.nom || this.state.produit.nom,
            quantite: this.state.quantite || this.state.produit.quantite,
            description: this.state.description || this.state.produit.description,
            url_image: this.state.url_image || this.state.produit.url_image,
            categorie: categorie,
            prix_actuel: this.state.prix_actuel || this.state.produit.prix_actuel
        }
        console.log("produit : " + produit.nom);
        // this.props.saveCallback(produit);
        this.saveBdd(produit);
    }

    //////////
    saveBdd = (produit) => {
        console.log("creer produit " + produit.nom);
        if (!this.props.match.params.id) {
            console.log("saving create");
            fetch("http://localhost:8080/produits", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(produit)
            }).then((data) => data.json())
            
            console.log("saved");
        }

        else {
            console.log("modifier produit" + this.props.match.params.id);
            fetch(`http://localhost:8080/produits/${this.props.match.params.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(produit)
            })
                .then((data) => data.json())
        }
        this.props.history.push('/Produits');
    }
    /////////////////////

    cancel = () => {
        this.props.history.push('/Produits');
    }

    render() {
        const edit = !!this.props.match.params.id;
        return (
            <div className="add-box">
                <h2>Ajouter un produit</h2>
                <form>
                    <div className="champ" style={edit ? {} : { display: 'none' }}>
                        <input name="id"
                            readOnly
                            value={this.props.match.params.id} />
                    </div>
                    <div className="champ">
                        <input required="" name="nom" value={this.state.produit.nom} placeholder={this.state.produit.nom} onChange={this.handleChange} /><label>nom :</label>
                    </div>
                    <div className="champ">
                        <input required="" name="quantite" value={this.state.produit.quantite} placeholder={this.state.produit.quantite} onChange={this.handleChange} /><label>  quantite :</label>
                    </div>
                    <div className="champ">
                        <input required="" name="description" value={this.state.produit.description} placeholder={this.state.produit.description} onChange={this.handleChange} /> <label>   description : </label>
                    </div>
                    <div className="champ">
                        <input required="" name="url_image" value={this.state.produit.url_image} placeholder={this.state.produit.url_image} onChange={this.handleChange} /><label> url_image : </label>
                    </div>
                    <div className="champ">
                        <input required="" name="id_categorie" value={this.state.produit.id_categorie} placeholder={this.state.produit.id_categorie} onChange={this.handleChange} /> <label> id_categorie :</label>
                    </div>
                    <div className="champ">
                        <input required="" name="prix_actuel" value={this.state.produit.prix_actuel} placeholder={this.state.produit.prix_actuel} onChange={this.handleChange} /><label>Prix actuel :</label>
                    </div>

                    <a onClick={this.save}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                            Valider
                    </a>
                    <a className="Annuler" onClick={this.cancel}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                         Annuler
                        </a>
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
                this.setState({ produit: res })
                console.log(res)
            })
    }

}