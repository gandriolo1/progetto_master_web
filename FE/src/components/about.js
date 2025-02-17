function ReactAbout() {
    return (
        <p>
            L'angolo di Rita è un luogo dove puoi trovare prodotti fatti in casa, realizzati con amore e passione.
            Offriamo una vasta gamma di prodotti unici, tutti fatti a mano e di alta qualità.
        </p>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('React-About'));
  root.render(<ReactAbout />);
