import React from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

export default class ProduitListe extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            netWorkError:false,
            startEditing: false,
            produit: {},
            produits: []
        }
    }
    
     useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
      }));

    handlePageClick = ({selected}) =>{
        console.log(selected);
        this.props.setCurrentPage(selected);
        this.props.history.push(this.props.match.url + "?currentPage="+selected+"&searchWord="+this.props.searchWord)
    }
    render() {
        console.log(this.props);
        const isEmploye = this.props.currentUser && this.props.currentUser.roles.includes("ROLE_EMPLOYE");
        return (
            <React.Fragment>
                {!!this.props.searchWord && (<div>{this.props.produitsCount} produit(s) trouvés. Voici les résultats pour le mot-clé "{this.props.searchWord}"</div>)}
                <ReactPaginate
                    previousLabel={"← Previous"}
                    nextLabel={"Next →"}
                    initialSelected={this.props.currentPage}
                    forcePage={this.props.currentPage}
                    pageCount={this.props.pageCount}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}
                    
                />
                   

                        {this.props.produits.map((produit) => {
                            return ( 
                            <section id="produits">
                           <section>
                            <img className="image" src={produit.url_image}></img>
                                <div><ul className="produits">
            <li>
                                    <div><h2>{produit.nom} - {produit.prix_actuel}€</h2></div>
                                    </li>
                                    </ul>
                                    <div>
                                    {produit.description}
                                    </div>
                                    <div>
                                    <div>
     
                                    </div>
                                    <Tooltip title="AFFICHER PRODUIT" arrow>
                                    <Link to={this.props.match.url + '/'+produit.id_produit}><button className="Afficher-Button" type="button">Afficher</button></Link>  
                                    </Tooltip>
                                    <Tooltip title="MODIFIER PRODUIT" arrow>
                                    <Link style={isEmploye ? {}: {display: "none" }} to={this.props.match.url + '/edit/'+produit.id_produit}><button class="Modifier-Button">Modifier</button></Link>
                                    </Tooltip>
                                    <Tooltip title="SUPPRIMER PRODUIT" arrow>
                                    <button className="Delete-Button" style={isEmploye?{}:{display:"none"}}onClick={()=>this.props.deleteCallback(produit.id_produit)}>Supprimer</button>
                                    </Tooltip>
                                    <Tooltip title="Ajouter au panier" arrow>
                                    <button className="ajout-panier-Button" onClick={()=>this.props.addToCart(produit)}>Ajouter au panier</button>
                                    </Tooltip>
                                    </div>
                                </div>
                            </section>
                            </section>)
                        })}
                   
                   
                
            </React.Fragment>

        )
    }
    componentDidMount(){
        console.log("ProduitList Componentdidmount called");
        let search = this.props.location.search;
        search = search.trim();
        search = search.split("&");
        let currPage = 0;
        let searchWord = "";
        for (let index = 0; index < search.length; index++) {
            let temp = search[index].split("=");
            if (index === 0) {
                if(temp.length === 2){
                    currPage = temp[0].indexOf("currentPage") >= 0 ? temp[1] : 0;
                }
            }
            else if(index === 1){
                if(temp.length === 2){
                    searchWord = temp[0].indexOf("searchWord") >= 0 ? temp[1] : "";
                }
            }
        }
        if (searchWord !== "") {
            this.props.search(searchWord);
            this.props.history.push(this.props.match.url + "?currentPage="+currPage + "&searchWord="+ searchWord);
        }
        else{
            this.props.setCurrentPage(parseInt(currPage));
            this.props.history.push(this.props.match.url + "?currentPage="+currPage)
        }
    }
}