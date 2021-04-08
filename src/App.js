import React from 'react';

import './App.css';
import { Link, Route } from 'react-router-dom';
import Produits from './Produits';
import Categories from './Categories';
import Login from './Login';
import AuthService from './AuthService';
import AccessDenied from './AccessDenied';
import Panier from './Panier';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentUser : undefined,
      panier: [],//[{id: 1, nom: test, prixUnitaire: 10.50, quantité: 1}, {id: 5, nom: test5, prixUnitaire: 4.50, quantité: 3}]
      panierCount : 0
    }
  }

  addToCart = (produit, quantite=1)=>{
    this.setState({panierCount : this.state.panierCount+1})
    let newProduit = true;

    this.state.panier.forEach(produit=>{
      if(produit.id === produit.id){
        newProduit = false;
      }
    })
    this.setState((state)=>{
      if (newProduit) {
        const lignePanier = {id: produit.id, nom: produit.nom, prix_actuel: produit.prix_actuel, quantite: quantite};
        state.panier = [...state.panier, lignePanier];
        state.panier = state.panier.concat(lignePanier)
      }
      else{
        state.panier = state.panier.map((p)=>{
          produit.quantite = produit.id === produit.id ? p.quantite+1 : p.quantite;
          return produit;
        })
      }

    })
  }
  deleteFromCart = (produitId)=>{
    this.setState((state)=>state.panier = state.panier.filter((p)=>p.id !== produitId))
  }
  editCartItem = (produitId, quantite)=>{
    this.setState((state)=>state.panier = state.panier.map((p)=> {
        p.quantite = p.id === produitId ? quantite : p.quantite;
        return p;
      }
    ))
  }

  deleteAllFromCart = ()=>{
    this.setState((state)=>state.panier = [])
  }

  setCurrentUser = (user)=>{
    console.log(user);
    this.setState({currentUser: user})
  }

  logOut = () =>{
    AuthService.logout();
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Link to="/produits?currentPage=0"><button class="Header-Button"> Produits </button></Link>
          <Link to="/categories"><button class="Header-Button"> Categories </button></Link>
          <Link to="/panier"><button class="Header-Button"> Panier ({this.state.panier.length}) </button></Link>
          {(this.state.currentUser) && <div>
                                        <span>{this.state.currentUser.username} | </span>
                                        <a href="/login" className="nav-link" onClick={this.logOut}>
                                        <button class="Header-Button">  Se déconnecter  </button>
                                        </a>
                                      </div>}
          {(!this.state.currentUser) && <Link to="/login"><button class="Header-Button"> Se connecter </button></Link>}
          
        </header>
        <main>
          
          <Route path="/produits" render={(props)=> <Produits {...props} addToCart={this.addToCart} currentUser={this.state.currentUser} />}/>
          <Route path="/panier" render={(props)=> <Panier {...props} panier={this.state.panier} deleteFromCart={this.deleteFromCart} editCartItem={this.editCartItem} deleteAllFromCart={this.deleteAllFromCart} />}/>
          <Route path="/categories" component={Categories}/>
          <Route path="/login" render={(props)=> <Login {...props} setCurrentUser={this.setCurrentUser} />}/>
          <Route path="/access_denied" component={AccessDenied}/>
        </main>
      </div>
    );
  }
  componentDidMount(){
    this.setState({currentUser : AuthService.getCurrentUser()})
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    this.setState({currentUser : AuthService.getCurrentUser(), panier: panier})
  }
  componentDidUpdate(){
    console.log("componentDidUpdate");
    localStorage.setItem("panier", JSON.stringify(this.state.panier));
  }
  
}

export default App;
