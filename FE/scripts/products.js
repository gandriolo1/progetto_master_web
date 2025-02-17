let currentPage = 1;
const productsPerPage = 9;
let totalProducts = 0;
let filteredProducts = [];

function getFilters() {
    const categoria = document.getElementById('categoria').value;
    const materiale = document.getElementById('materiale').value;
    const colore = document.getElementById('colore').value;
    return { categoria, materiale, colore };
}

async function listProducts(filters) {
    try {
        const response = await fetch('http://localhost:4000/prodotti/get-all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Errore nella chiamata API');
        }
        const allProducts = await response.json();
        filteredProducts = allProducts.filter(product => {
            const matchesCategoria = filters.categoria === 'Tutto' || product.CATEGORIA === filters.categoria;
            const matchesMateriale = filters.materiale === 'Tutto' || product.MATERIALE === filters.materiale;
            const matchesColore = filters.colore === 'Tutto' || product.COLORE === filters.colore;
            return matchesCategoria && matchesMateriale && matchesColore;
        });
        totalProducts = filteredProducts.length;
        const start = (currentPage - 1) * productsPerPage;
        const end = currentPage * productsPerPage;
        return filteredProducts.slice(start, end);
    } catch (error) {
        console.error('Errore durante il recupero dei prodotti:', error);
        return [];
    }
}

function renderProducts(products) {
    const productListContainer = document.getElementById('product-list-container');
    productListContainer.innerHTML = '';
    if (products.length === 0) {
        productListContainer.innerHTML = '<p>Non ci sono prodotti che corrispondono ai filtri selezionati.</p>';
        return;
    }
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <img src="${product.IMMAGINE}" alt="${product.NOME}">
            <h3>${product.NOME}</h3>
            <p>Prezzo: ${product.PREZZO} €</p>
            <button class="add-to-wishlist" onclick="addToWishlist(${product.ID})">Aggiungi alla wishlist</button>
        `;
        productListContainer.appendChild(productElement);
    });
}

function updatePagination() {
    const prevButton = document.getElementById('prev-page');
    const nextButton = document.getElementById('next-page');
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage * productsPerPage >= totalProducts;
}

async function applyFilters() {
    const filters = getFilters();
    const products = await listProducts(filters);
    renderProducts(products);
    updatePagination();
}

function resetFilters() {
    document.getElementById('categoria').value = 'Tutto';
    document.getElementById('materiale').value = 'Tutto';
    document.getElementById('colore').value = 'Tutto';
    listProducts({ categoria: 'Tutto', materiale: 'Tutto', colore: 'Tutto' }).then(renderProducts);
}

async function addToWishlist(idProdotto) {
    const product = filteredProducts.find((p) => p.ID == idProdotto);
    if (!product) {
      alert("Prodotto non trovato!");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    const idUtente = user ? user.id : null;
    const data = {
      idUtente,
      idProdotto
    };
    try {
      const response = await fetch('http://localhost:4000/wishlist/aggiungiPreferito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (response.status === 200) {
        const result = await response.json();
        if (result.messaggio === "Prodotto aggiunto alla Whishlist") {
          alert(`${product.NOME} aggiunto alla wishlist!`);
        } else {
          alert(`${product.NOME} non può essere aggiunto alla wishlist.`);
        }
      } else {
        throw new Error('Errore nella risposta del server');
      }
    } catch (error) {
      alert(`Errore: ${error.message}`);
    }
}

document.querySelector('button').addEventListener('click', applyFilters);
document.querySelectorAll('button')[1].addEventListener('click', resetFilters); 
document.getElementById('prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    applyFilters();
  }
});
document.getElementById('next-page').addEventListener('click', () => {
  if (currentPage * productsPerPage < totalProducts) {
    currentPage++;
    applyFilters();
  }
});  

applyFilters();
