function ReactNavSocial() {
    return (
        <ul>
            <li>
                <a href="#">
                    <img src="./assets/icons/Facebook-Icon.png" alt="Shopping Cart Icon"></img>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="./assets/icons/Instagram-Icon.png" alt="Wishlist Icon"></img>
                </a>
            </li>
            <li>
                <a href="#">
                    <img src="./assets/icons/Etsy-Icon.png" alt="User Icon"></img>
                </a>
            </li>
        </ul>
    );
}
  
const root = ReactDOM.createRoot(document.getElementById('React-Nav-Social'));
root.render(<ReactNavSocial />);
