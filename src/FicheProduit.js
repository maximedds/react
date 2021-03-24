import React from 'react';


export default class FicheProduit extends React.Component {
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
        return (
            <div>
                <ul>
                    <li>{this.state.produit.id_produit}</li>
                    <li>{this.state.produit.nom}</li>
                    <li>{this.state.produit.quantite}</li>
                    <li>{this.state.produit.description}</li>
                    <li>{this.state.produit.url_image}</li>
                    <li>{this.state.produit.id_categorie}</li>
                    <li>{this.state.produit.prix_actuel}</li>
                </ul>
            </div>
        )
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