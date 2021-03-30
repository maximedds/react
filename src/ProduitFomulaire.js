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

        let produit = {
            id_produit: this.state.produit.id_produit,
            nom: this.state.nom || this.state.produit.nom,
            quantite: this.state.quantite || this.state.produit.quantite,
            description: this.state.description || this.state.produit.description,
            url_image: this.state.url_image || this.state.produit.url_image,
            id_categorie: this.state.id_categorie || this.state.produit.id_categorie,
            prix_actuel: this.state.prix_actuel || this.state.produit.prix_actuel
        }
        console.log("produit : " + produit.nom);
        // this.props.saveCallback(produit);
        this.saveBdd(produit);
    }

    //////////
    saveBdd = (produit) => {
        console.log("saving " + produit.nom);
        if (!this.props.match.params.id) {
            console.log("saving create");
            fetch("http://localhost:8080/produits/create", {
                method: "POST", 
                headers: {"Content-type": "application/json", "Access-Control-Allow-Origin": "http://localhost:8080", 'Accept' :'application/json', 'Authorization': '*'},
                body: JSON.stringify(produit)
            }).then((data) => data.json())
                    console.log("saved");
                }
                
        else {
            console.log("saving modif"+ this.props.match.params.id);
            fetch(`http://localhost:8080/produits/edit/${this.props.match.params.id}`, {
                method: "PUT",
                headers: {"Content-type": "application/json", "Access-Control-Allow-Origin": "http://localhost:8080", 'Accept' :'application/json', 'Authorization': '*'},
                body: JSON.stringify(produit)
            })
                .then((data) => data.json())
            }
        this.props.history.push('/produits');
    }
    /////////////////////

    cancel = () => {
        this.props.history.push('/produits');
    }

    render() {
        const edit = !!this.props.match.params.id;
        return (
            <div className="add-box">

                <h2 style={edit ? {} : { display: 'none' }}>Modifier un produit</h2>
                <h2 style={edit ? { display: 'none' } : {}}>Ajouter un produit</h2>

                <form>
                    <div className="champ" style={edit ? {} : { display: 'none' }}>
                        <input name="id"
                            readOnly
                            value={this.props.match.params.id} />
                    </div>
                    <div className="champ">
                        <input required="true" type="text" name="nom" value={this.state.produit.nom} onChange={this.handleChange} /><label>nom :</label>
                    </div>
                    <div className="champ">
                        <input required="true" type="number" name="quantite" value={this.state.produit.quantite} onChange={this.handleChange} /><label>  quantite :</label>
                    </div>
                    <div className="champ">
                        <input required="true" type="text" name="description" value={this.state.produit.description} onChange={this.handleChange} /> <label>   description : </label>
                    </div>
                    <div className="champ">
                        <input required="true" type="text" name="url_image" value={this.state.produit.url_image} onChange={this.handleChange} /><label> url_image : </label>
                    </div>
                    <div className="champ">
                        <input required="true" type="number" name="id_categorie" value={this.state.produit.id_categorie} onChange={this.handleChange} /> <label> id_categorie :</label>
                    </div>
                    <div className="champ">
                        <input required="true" type="number" name="prix_actuel" value={this.state.produit.prix_actuel} onChange={this.handleChange} /><label>Prix actuel :</label>
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