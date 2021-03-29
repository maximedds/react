import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FicheProduit from './FicheProduit';
import ProduitFormulaire from './ProduitFomulaire';
import ProduitDisplay from './ProduitDisplay';
// import ProduitFormulaireModifier from './ProduitFormulaireModifier';

export default class Produits extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        startEditing : false,
        }
    }

    render(){
        console.log(this.props.match);
        return(
            <React.Fragment>
                <Switch>
                    <Route path={this.props.match.path + '/create'} component={ProduitFormulaire}/>
                    <Route path={this.props.match.path + '/edit/:id'} component={ProduitFormulaire}/>
                    <Route path={this.props.match.path + '/:id'} component={FicheProduit}/>
                    <Route exact path={this.props.match.path + '/'} component={ProduitDisplay}/>
                </Switch>
            </React.Fragment>
        );
    }

    
}