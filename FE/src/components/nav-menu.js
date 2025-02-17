function ReactNavMenu() {
    return (
        <ul>
            <li><a href="./index.html">Home</a></li>
            <li><a href="./prodotti.html">Prodotti</a></li>
            <li><a href="./contatti.html">Contatti</a></li>
        </ul>	
    );
}
  
const root = ReactDOM.createRoot(document.getElementById('React-Nav-Menu'));
root.render(<ReactNavMenu />);
