const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const { Sequelize, Model, DataTypes, Op } = require('sequelize');
const app = express();
app.use(cors())
const port = 3000;

// Create Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Define Product model
class Product extends Model { }
Product.init({
  name: DataTypes.STRING,
  quantity: DataTypes.NUMBER,
  value: DataTypes.NUMBER,
}, { sequelize, modelName: 'product' });

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sync models with database
sequelize.sync();
// CRUD routes for Product model
app.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

app.get('/products/:id', async (req, res) => {
  const user = await Product.findByPk(req.params.id);
  res.json(user);
});

app.post('/products', async (req, res) => {
  const user = await Product.create(req.body);
  // console.log("BODY" + JSON.stringify(req.body));

  res.send({ "req": req.body, "user": user });
  // res.json(req.body);
});

app.patch('/products', async (req, res) => {
  console.log("ID: ", req.body);
  const cart = req.body;
  let newProducts = []
  let products = [];
  let hasStock = []
  // Check stock
  hasStock = true;

  console.log(cart);
  const cartIds = cart.map(p => p.id)
  const foo = await Product.findAndCountAll({
    order: [
      ['id', 'asc']
    ],
    where: {
      id: {
        [Op.or]: [...cartIds],
      },
      quantity: {
        [Op.gte]: 1,
      }
    }
  })


  if (foo.count == cart.length) {
    let i = 0;
    while (hasStock && i < cart.length) {
      let product = foo.rows[i].dataValues
      console.log(product);

      let newQuantity = product.quantity - cart[i].quantity
      if (newQuantity >= 0) {
        newProducts.push({ ...product, quantity: newQuantity })
        i++
      } else {
        hasStock = false;
        return res.json({ error: "Not enough " + product.name + " Stock" })
      }
    }
    // cart[idx].quantity 
    console.log("Enough stock. ");
    for (let i = 0; i < cart.length; i++) {
      const product = cart[i];
      Product.decrement(
        { quantity: product.quantity },
        { where: { id: product.id } }
      )

    }

  }
  return res.json(newProducts)
});
app.patch('/products/:id', async (req, res) => {
  const user = await Product.findByPk(req.params.id);
  if (user) {
    await user.update(req.body);
    res.json(user);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.delete('/products/:id', async (req, res) => {
  const user = await Product.findByPk(req.params.id);
  if (user) {
    await user.destroy();
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
