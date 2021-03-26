import React from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import ProduitListe from './ProduitListe';




export default class ProduitDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            netWorkError:false,
            startEditing: false,
            produit: {},
            produits: []

        }
    }
    deleteProduit = (produitId => {
        fetch(`http://localhost:8080/produits/${produitId}`, {
            method: "DELETE",

        }).then((data) => data.json)
            .then((res) => this.setState(
                {
                    produits:
                        this.state.produits.filter((produit) => produit.id_produit !== produitId)
                }
            ))
    }
    )

    showForm = (produit) => {
        this.setState({ startEditing: true, produit: produit });
    }

    

    render() {
        return (
          (this.state.networkError ? 
            <p>Problème de connexion</p> :
            <React.Fragment>
                <Link to={this.props.match.url + '/create'} saveCallback={this.save}>
                    <button className="Add-Button">Créer un produit</button>
                </Link>
                <ProduitListe produits={this.state.produits} deleteCallback={this.deleteProduit} />
            </React.Fragment>
          )
        );
      }

    componentDidMount = () => {
        let promesse = fetch("http://localhost:8080/produits/");
        promesse.then((data) => {
            console.log(data);
            return data.json()
        }).then((res) => {
            console.log(res);
            this.setState({ produits: res })
        }).catch((err) => {
                console.log(err)
                this.setState({ netWorkError: true })
            })
    }
}

