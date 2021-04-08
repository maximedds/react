import React from "react";

export default class Panier extends React.Component{
    constructor(props){
        super(props);
    }
    handleChange=(event, produitId)=>{
      this.props.editCartItem(produitId, event.target.value);
    }
    render() {
        return (
            <React.Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>nom</th>
                             <th>quantite</th> 
                            <th>prix</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.panier.map((produit) => {
                            return (<tr key={produit.id}> 
                                <td><img className="image" src={produit.url_image}></img></td>
                                <td>{produit.id}</td>
                                <td>{produit.nom}</td>
                                <td><input type="number" value={produit.quantite} onChange={(e)=>this.handleChange(e, produit.id)}/></td>
                                <td>{produit.prix_actuel}</td>
                                <td>
                                    <button onClick={() => this.props.deleteFromCart(produit.id)}>Supprimer</button>
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
                <button onClick={this.props.deleteAllFromCart}>Vider le panier</button>
                <button onClick={() => this.props.passerCommande(this.props.panier)}>Passer la commande</button>
    
            </React.Fragment>

        )
    }
    componentDidMount(){
        
    }
}  