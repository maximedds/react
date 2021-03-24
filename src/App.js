import logo from './logo.svg';
import './App.css';
import {Link, Route} from 'react-router-dom';
import Produits from './Produits';
import Categories from './Categories';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/produits">produits</Link>
        <Link to="/categories">cat</Link>
      </header>
      <main>
        <Route path="/produits" component={Produits}/>
        <Route path="/categories" component={Categories}/>
      </main>
    </div>
  );
}

export default App;
