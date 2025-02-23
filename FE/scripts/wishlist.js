const wishlistContainer = document.getElementById("wishlist");
const user = JSON.parse(localStorage.getItem("user"));
const idUtente = user ? user.id : null;

async function loadWishlist() {
  try {
    const response = await fetch(
      `http://localhost:4000/wishlist/listaPreferiti?id=${idUtente}`
    );
    if (!response.ok) {
      throw new Error("Impossibile recuperare la wishlist");
    }
    let wishlist = await response.json();
    wishlistContainer.innerHTML = "";
    if (wishlist.length > 0) {
      wishlist.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.classList.add("product-whish");
        productDiv.innerHTML = `
            <img src="${product.IMMAGINE}" alt="${product.NOME}">
            <h3>${product.NOME}</h3>
            <p>Prezzo: €${product.PREZZO}</p>
            <button data-id="${product.ID}">Rimuovi</button>
          `;
        wishlistContainer.appendChild(productDiv);
      });
    } else {
      wishlistContainer.innerHTML = "<p>La tua wishlist è vuota.</p>";
    }
  } catch (error) {
    wishlistContainer.innerHTML = `<p>Errore: ${error.message}</p>`;
  }
}

document.addEventListener("click", async (e) => {
  if (e.target.tagName === "BUTTON" && e.target.hasAttribute("data-id")) {
    const productId = e.target.getAttribute("data-id");
    try {
      const response = await fetch(
        `http://localhost:4000/wishlist/rimuoviPreferito?id=${idUtente}&productId=${productId}`,
        { method: "DELETE" }
      );
      if (response.ok) {
        loadWishlist();
      } else {
        throw new Error("Impossibile rimuovere il prodotto");
      }
    } catch (error) {
      alert(`Errore: ${error.message}`);
    }
  }
});

loadWishlist();
