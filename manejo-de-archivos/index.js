const fs = require('fs');

class ProductManager {
    //The constructor method initializes the this.path variable and creates the file if it doesn't exist already.
    constructor(path) {
        this.path = path;
        if (!fs.existsSync(this.path)) {
          try {
           
            fs.writeFileSync(this.path, JSON.stringify([]));
          } catch (err) {
            throw new Error(`Unable to create file at path ${this.path}: ${err.message}`);
          }
        }
    }

  //The getProducts method reads the file at the specified path, parses the JSON data, and returns the products array.
  getProducts() {
    try {
      const products = JSON.parse(fs.readFileSync(this.path));
      return products;
    } catch (err) {
      throw new Error(`Unable to read file at path ${this.path}: ${err.message}`);
    }
  }

  //The addProduct method takes a product object as input, auto-increments the id field, adds the new product to the array of products, and writes the updated array to the file.
  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: products.length + 1,
      ...product
    };
    products.push(newProduct);
    try {
      fs.writeFileSync(this.path, JSON.stringify(products));
      return newProduct;
    } catch (err) {
      throw new Error(`Unable to write to file at path ${this.path}: ${err.message}`);
    }
  }

  //The getProductById method takes an id as input, searches for a product with that id in the array of products, and throws an error if the product is not found. Otherwise, it returns the product object.
  getProductById(id) {
    const products = this.getProducts();
    const product = products.find(p => p.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  //The updateProduct method takes an id and newFields object as inputs, finds the index of the product with the given id in the array of products, updates the product with the new fields, and writes the updated array to the file.
  updateProduct(id, newFields) {
    const products = this.getProducts();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex < 0) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = {
      ...products[productIndex],
      ...newFields
    };
    products[productIndex] = updatedProduct;
    try {
      fs.writeFileSync(this.path, JSON.stringify(products));
      return updatedProduct;
    } catch (err) {
      throw new Error(`Unable to write to file at path ${this.path}: ${err.message}`);
    }
  }

  //The deleteProduct method takes an id as input, finds the index of the product with the given id in the array of products, removes the product from the array, and writes the updated array to the file.
  deleteProduct(id) {
    const products = this.getProducts();
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex < 0) {
      throw new Error(`Product with id ${id} not found`);
    }
    products.splice(productIndex, 1);
    try {
      fs.writeFileSync(this.path, JSON.stringify(products));
      return true;
    } catch (err) {
      throw new Error(`Unable to write to file at path ${this.path}: ${err.message}`);
    }
  }
}



const productManager = new ProductManager('./products');

// adding new products
const product1 = productManager.addProduct({
    name: "producto prueba",
    description: "Este es un producto prueba",
    price: 9.99,
    image: "https://example.com/product1-thumbnail.jpg",
    category: 1,
    stock: 10
});

// Retrieving a product by ID
const retrievedProduct = productManager.getProductById(1);
console.log(retrievedProduct);