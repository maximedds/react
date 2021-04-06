import axios from 'axios';
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/api/';

class ProduitService {
  getProduits(pageNumber, perPage, searchWord) {
    return axios.get(API_URL + `public/produits?pageNumber=${pageNumber}&perPage=${perPage}&searchWord=${searchWord}`);
  }

  createProduit(produit) {
    return axios.post(API_URL + 'employe/produits/create', 
                produit, { headers: authHeader() });
  }

  editProduit(produit) {
    return axios.put(API_URL + 'employe/produits/edit', 
                produit, { headers: authHeader() });
  }

  deleteProduit(produitId) {
    return axios.delete(API_URL + 'employe/produits/delete/' + produitId, 
                { headers: authHeader() });
  }
}

export default new ProduitService();
