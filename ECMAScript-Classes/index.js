class ProductMAnager {

    //initializes an empty array 'this.products'
    constructor(){
        this.products=[];
    }

//adds a new product to the ''this.products' array witht he given properties. returns the newly added product. 
addProduct(itemName, description, price, thubmnail, id, quantity) {
    const product = {
        itemName, 
        description, 
        price, 
        thubmnail, 
        id, 
        quantity, 
    };
    this.products.push(product);
    return product;
};


//removes teh product with given 'product.ID' from the 'this.products' array
removeProduct(productId) {
    const index = this.products.findIndex((product) => productId === productId);
    if (index !== -1) {
        this.products.splice(index, 1);
    }

}

//returns the product with the given 'productId' from the "this.produtcts" array or 'undefined' if it doesn't exist. 
getProduct(productId){
    return this.products.find((product) => product.id === productId)
}


//returns an array of all products managed by the "ProductManager"
getAllProducts() {
    return this.products;
}
}


///////////////managing a set of products using 'ProductManager'

const productManager = new ProductMAnager();

//adding new products
const product1 = productManager.addProduct(
    "product 1", 
    "this is the description for product 1", 
    9.99, 
    "https://example.com/product1-thumbnail.jpg", 
    1, 
    10
);

const product2 = productManager.addProduct(
    "Product 2",
    "This is the description for Product 2",
    19.99,
    "https://example.com/product2-thumbnail.jpg",
    2,
    5
);
  

// Retrieving a product by ID
const retrievedProduct = productManager.getProduct(1);
console.log(retrievedProduct);

// Removing a product by ID
productManager.removeProduct(2);


// Retrieving all products
const allProducts = productManager.getAllProducts();
console.log(allProducts);