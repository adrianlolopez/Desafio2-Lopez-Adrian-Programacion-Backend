// Lee el módulo 'fs' de Node.js para manejar archivos.
const fs = require("fs");

// Declara una variable 'products' como un array vacío para almacenar productos.
let products = [];

// Declara una variable 'pathFile' para almacenar la ruta del archivo JSON de productos.
let pathFile = './data/products.json';



// Agrega un nuevo producto al array 'products' con los datos proporcionados.
const addProduct = async (title, description, price, thumbnail, code, stock) => {

    // Crea un objeto 'newProduct' con los datos del nuevo producto.
    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    };

    // Verifica si alguno de los valores del nuevo producto es undefined.
    if (Object.values(newProduct).includes(undefined)) {
        console.log("Todos los campos son obligatorios");
        return;
    }

    // Busca un producto existente con el mismo código.
    const productFail = products.find(product => product.code === code);
    if (productFail) {
        console.log(`El producto ${title} con el código ${code} ya existe`);
        return;
    }

    // Agrega el nuevo producto al array 'products'.
    products.push(newProduct);
   
    // Escribe el array 'products' en el archivo JSON.
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};



// Obtiene los productos almacenados en el archivo JSON.
const getProducts = async () => {
    
    // Lee el contenido del archivo JSON como texto.
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    
    // Parsea el contenido JSON a un array de productos.
    products = JSON.parse(productsJson) || [];

    // Retorna el array de productos.
    return products;
    
}



// Obtiene un producto por su ID.
const getProductById = async (id) => {
    
    // Obtiene todos los productos.
    await getProducts();

    // Busca el producto con el ID proporcionado.
    const product = products.find(product => product.id === id);

    // Si no se encuentra el producto, muestra un mensaje y retorna.
    if (!product) {
        console.log(`No se encontró el producto con el ID ${id}`);
        return;
    }

    // Muestra el producto encontrado y lo retorna.
    console.log(product);
    return product;
};


// Actualiza un producto por su ID con los datos proporcionados.
const updateProduct = async (id, dataProduct) => {
    
    // Obtiene todos los productos.
    await getProducts();
    
    // Busca el índice del producto con el ID proporcionado.
    const index = products.findIndex(product => product.id === id);
    
    // Actualiza los datos del producto en el array 'products'.
    products[index] = {
        ...products[index],
        ...dataProduct
    };

    // Escribe el array 'products' actualizado en el archivo JSON.
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
};


// Elimina un producto por su ID.
const deleteProduct = async (id) => {
    
    // Obtiene todos los productos.
    await getProducts();
    
    // Filtra los productos, excluyendo el producto con el ID proporcionado.
    products = products.filter(product => product.id !== id);
    
    // Escribe el array 'products' actualizado en el archivo JSON.
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}


// Pruebas de las funciones
// TEST

// addProduct("iPhone 11", "iPhone 11: Potente, versátil y elegante. Captura momentos extraordinarios.", 700000, "http://www.apple.com", "ADF211", 21);
// addProduct("iPhone 12", "Potente, elegante, y con 5G. El iPhone 12 redefine la experiencia móvil.", 900000, "http://www.apple.com", "ADF212", 7);
// addProduct("iPhone 13", "iPhone 13: Potente, elegante, innovador. La esencia de la excelencia tecnológica.", 1200000, "http://www.apple.com", "ADF212", 7);
// addProduct("iPhone 14", "iPhone 14: Potencia y elegancia redefinidas en tu mano.", 1300000, "http://www.apple.com", "ADF777", 7);
// addProduct("iPhone 15", "iPhone 15: Potente, elegante y revolucionario.", 1800000, "http://www.apple.com", "ADF1414");

// getProducts();

// getProductById(2);

// updateProduct(3, {
//     title: "iPhone 15",
//     description: "iPhone 15: Potente, elegante y revolucionario.",
// });

deleteProduct(2);