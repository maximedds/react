import React from 'react';
import { Link} from 'react-router-dom';
import ProduitLigne from './ProduitLigne';
import './ProduitListe.css';

export default class ProduitListe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            produit : {},
            produits:[]
        }
    }

    render() {
		return (
            <React.Fragment>
                <Link to={this.props.match.url + '/create'}>creer un produit</Link>
                <table>
                    <caption>Produits</caption>
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Quantite</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Catégorie</th>
                        <th>Prix</th>
                        <th>Action</th>
                    </tr>
                    {this.state.produits.map( (produit)=> {
                        return (

                            
                            <React.Fragment>
                                <ProduitLigne  key ={produit.id_produit} produit={produit}/>
                                
                                <Link to={this.props.match.url + '/'+ (produit.id_produit)}><button className="Afficher-Button" type="button">Afficher</button> </Link>
                                <Link to={this.props.match.url + '/edit/' + (produit.id_produit)}><button className="Modifier-Button" type="button">Modifier</button></Link>
                                <button className="Delete-Button" onClick={() => this.delete((produit.id_produit))}> Supprimer </button>
                               
                           </React.Fragment>
                        );
                    })}
                </table>
                {/* <button onClick={()=>this.props.showForm({})}> creer produit</button> */}
                      
            </React.Fragment>
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
        })  
        .catch((err) => {
            console.log(err)
            this.setState({ netWorkError: true })
        })
    }
}