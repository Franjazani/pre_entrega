const createError = require('http-errors')
const { v4: uuidv4 } = require('uuid');

class ProductsApi {
    constructor() {
        this.productos = [
            { id: uuidv4(), nombre: 'Artesano Manos Negras', descripcion: "vino tinto malbec", codigo: "ABZ001", precio: 3300, stock: 6, timestap: "new Date()" },
            
            { id: uuidv4(), nombre: 'Buescapleitos La Azul', descripcion: "vino tinto bonarda", codigo: "ABB004", precio: 1950, stock: 6, timestap:"new Date()"},
            
        ];
    }
    // comprueba si existe el ID
    exist(id) {
        const indice = this.productos.findIndex(aProduct => aProduct.id == id)

        //if (indice < 0) {
        //  return false
        //} else {
        //  return true;
        //}
        return indice >= 0;
    }
    validateBody(data) {
        if (!data.nombre || !data.precio || !data.descripcion || !data.codigo || !data.stock ||typeof data.nombre !== 'string' || typeof data.precio !== 'number'|| typeof data.descripcion !== 'string' || typeof data.codigo !== 'string' || typeof data.stock !== 'number') throw createError(400, 'Datos invalidos');
    }

    getAll() {
        return this.productos;
    }

    getById(id) {
        const exist = this.exist(id);
        if (!exist) throw createError(404, 'El producto no existe');

        const indice = this.productos.findIndex(aProduct => aProduct.id == id)

        return this.productos[indice];
    }
    // agregamos un producto
    
    save(data) {
        this.validateBody(data);

        const nuevoProducto = {
            id: uuidv4(),
            nombre: data.nombre,
            precio: data.precio,
            descripcion: data.descripcion,
            codigo: data.codigo,
            stock: data.stock,
            timestamp: new Date().toLocaleString(),
            foto: data.foto,
        }
        this.productos.push(nuevoProducto);
        return nuevoProducto;
    }
    
    findByIdAndUpdate(id, datanueva) {
        const exist = this.exists(id);
        
        if (!exist) throw createError(404, 'El producto no existe.');

        this.validateBody(datanueva);

        const indice = this.productos.findIndex(aProduct => aProduct.id == id)

        const oldProduct = this.productos(indice);

        const nuevoProducto = {
            timestamp: new Date().toLocaleString(),
            nombre: data.nombre,
            descripcion: data.descripcion,
            codigo: data.codigo,
            foto: data.foto,
            precio: data.precio,
            stock: data.stock,
            id: oldProduct.id,
        }

        this.productos.splice(indice, 1, nuevoProducto);
        
        return nuevoProducto;
    }

    findByIdAndDelete(id) {
        const exist = this.exists(id);
        if (!exist) return;

        const indice = this.productos.findIndex(aProduct => aProduct.id == id)

        this.productos.splice(indice, 1);

    }
}
//creamos la instancia

const instanciaProductsApi = new ProductsApi();

module.exports = {
    ProductsController : instanciaProductsApi
}
module.exports = {
    ProductsController : instanciaProductsApi
}