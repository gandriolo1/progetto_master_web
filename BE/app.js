const express = require('express');
const cors = require('cors');

const app = express();
const path = require('path');
const db = require('./utils/db.js');
const port = 4000;

const userRoutes = require('./routes/user-routes');
const newsletterRoutes = require('./routes/newsletter-routes');
const prodottiRoutes = require('./routes/prodotti-routes');
const wishlistRoutes = require('./routes/wishlist-routes.js');

app.use('/file', express.static(path.join(__dirname, 'file')));

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE'], 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
app.use('/newsletter', newsletterRoutes);
app.use('/prodotti', prodottiRoutes);
app.use('/wishlist', wishlistRoutes);

app.listen(port, () => {
  console.log(`Server in ascolto su http://localhost:${port}`);
});
