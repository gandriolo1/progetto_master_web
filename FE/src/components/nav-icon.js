function ReactNavIcon() {
    const isLoggedIn = localStorage.getItem('user') !== null;
    const handleUserClick = () => {
        const confirmLogout = window.confirm("Sei sicuro di voler uscire?");
        if (confirmLogout) {
            localStorage.removeItem('user');
            window.location.href = './index.html'; 
        }
    };
    return (
        <ul>
            {isLoggedIn && (
                <li>
                    <a href="./carrello.html">
                        <img src="./assets/icons/Shopping-Cart-Icon.png" alt="Shopping Cart Icon" />
                    </a>
                </li>
            )}
            {isLoggedIn && (
                <li>
                    <a href="./wishlist.html">
                        <img src="./assets/icons/Wishlist-Icon.png" alt="Wishlist Icon" />
                    </a>
                </li>
            )}
            <li>
                {isLoggedIn ? (
                    <a href="#" onClick={handleUserClick}>
                        <img src="./assets/icons/Exit-Icon.png" alt="Logged In User Icon" />
                    </a>
                ) : (
                    <a href="./accedi.html">
                        <img src="./assets/icons/User-Icon.png" alt="User Icon" />
                    </a>
                )}
            </li>
        </ul>
    );
}
  
const root = ReactDOM.createRoot(document.getElementById('React-Nav-Icon'));
root.render(<ReactNavIcon />);
