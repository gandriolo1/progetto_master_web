function ReactLogo() {
  return (
		<img src="./assets/imgs/logo1.png" alt="Logo"></img>
  );
}

const root = ReactDOM.createRoot(document.getElementById('React-Logo'));
root.render(<ReactLogo />);