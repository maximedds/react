import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FicheProduit from './FicheProduit';
import ProduitFormulaire from './ProduitFomulaire';
import ProduitDisplay from './ProduitDisplay';
import ProduitFormulaireModifier from './ProduitFormulaireModifier';

export default class Produits extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.match);
        return(
            <React.Fragment>
                <Switch>
                    <Route path={this.props.match.path + '/create'} component={ProduitFormulaire}/>
                    <Route path={this.props.match.path + '/edit/:id'} component={ProduitFormulaireModifier}/>
                    <Route path={this.props.match.path + '/:id'} component={FicheProduit}/>
                    <Route exact path={this.props.match.path + '/'} component={ProduitDisplay}/>
                </Switch>
            </React.Fragment>
        );
    }

    cancel = () => {
        this.setState({ startEditing: false, produit: {} });
    }

    save = (produit) => {
        if (!produit.id_produit) {
            //product.id = this.state.productId;
            fetch("http://localhost:8080/produits", {
                method: "POST", 
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(produit)

            })
                .then((data) => data.json())
                .then(
                    (res) => {
                        this.setState({
                            produits: this.state.produits.concat(res),
                            startEditing: false
                        }
                        );
                        console.log(res)
                    }
                )
        }
        else {
            fetch(`http://localhost:8080/produits/${produit.id_produit}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(produit)
            })
                .then((data) => data.json())
                .then((res) => this.setState(
                    {
                        produits: this.state.produits.map((p) => p.id === produit.id_produit ? res : p),
                        startEditing: false
                    }
                )
            )
        }
    }
}