function ReactNavSite() {
    return (
        <ul>
            <li><a href="./index.html">Home</a></li>
            <li><a href="./prodotti.html">Prodotti</a></li>
            <li><a href="./contatti.html">Contatti</a></li>
            <li><a href="./accedi.html">Accedi</a></li>
            <li><a href="./registrati.html">Registrati</a></li>
        </ul>	
    );
}
  
const root = ReactDOM.createRoot(document.getElementById('React-Nav-Site'));
root.render(<ReactNavSite />);
