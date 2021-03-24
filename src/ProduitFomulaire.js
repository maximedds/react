import React from 'react';

export default class ProduitFormulaire extends React.Component{
    constructor(props){
        super(props);
    }
        // this.state = {
        //     id : props.produit.id || "",
        //     nom : props.produit.nom || "",
        //     description : props.produit.description || "",
        //     url_image : props.produit.url_image || "",
        //     id_categorie : props.produit.id_categorie || "",
        //     prix_actuel : props.produit.prix_actuel || "",
        // }
    render(){
        const edit = !!this.props.match.params.id;
        return(
            <form>
                <div style={edit ? {}: {display:'none'}}>
                    id : <input name="id"
                                readOnly 
                                value={this.props.match.params.id}/>
                </div>
                <div>
                    nom : <input name="nom" value={this.props.match.params.nom}/>
                </div>
                <div>
                    quantite : <input name="quantite" value={this.props.match.params.quantite}/>
                </div>
                <div>
                    description : <input name="description" value={this.props.match.params.description}/>
                </div>
                <div>
                    url_image : <input name="url_image" value={this.props.match.params.url_image}/>
                </div>
                <div>
                    id_categorie : <input name="id_categorie" value={this.props.match.params.id_categorie}/>
                </div>
                <div>
                    prix_actuel : <input name="prix_actuel" value={this.props.match.params.prix_actuel}/>
                    
                </div>
            </form>
        );
    }
}