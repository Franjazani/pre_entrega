import fs from "fs";
import moment from "moment";

class Cart {
    constructor(articulo) {
        this.articulo = articulo;
    }

    async validateExitFile() {
        try {
            await fs.promises.state(this.articulo);
            return true;            
        } catch (error) {
            await fs.promises.writeFile(this.articulo, JSON.stringify([]));
            return false;
        }
    }
    async loadEmptyFile() {
        try {
            let cartDefault = [
                {
                    id: cartId-511,
                    timestap: new Date(),
                    products: [
                        {
                            id: "etiqueta01",
                            nombre: "Artesano Manos Negras",
                            descripcion: "vino tinto malbec",
                            codigo: ABZ001,
                            precio: 3300,
                            stock: 6,
                            foto: "https://vinomanos.com/wp-content/uploads/2018/12/Manos_Negras_Artesano_Mlb-v.png",
                            timestap: "new Date()"
                        },
                        {
                            id: "etiqueta02",
                            nombre: "Buescapleitos La Azul",
                            "descripcion": "vino tinto bonarda",
                            codigo: ABB004,
                            precio: 1950,
                            stock: 6,
                            foto: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/383/721/products/azul-buscapleito-bonarda1-54e045e24286bc0c9216511622851550-1024-1024.png",
                            timestap: "new Date()"
                        },
                    ],
                },
            ];
            const data = JSON.stringify(cartDefault, null, "\t");
            await fs.promises.writeFile(this.articulo, data);
        } catch (error) {
            throw new Error("No se cargo el Carrito 🤷‍♂️");
        }
    }
    
    async getAllProductsInCart() {
        try {
            let fileExist = await this.validateExistFile();
            if (!fileExist) {
               await this.loadEmptyFile(); 
            }
            const data = await fs.promises.readFile(this.articulo, "utf-8");
            return JSON.parse(data);
          } catch (error) {
            throw new Error(" No encontramos los productos");
        }
    }
    async saveCarts(carts) {
    try {
      const data = JSON.stringify(carts, null, "\t");
      await fs.promises.writeFile(this.articulo, data);
    } catch (error) {
      throw new Error("No se pudo guardar los carritos!", error);
    }
  }

    async getCartById(id) {
        try {
            const productsCart = await this.getAllProductsInCart();
      const index = productsCart.findIndex((cart) => cart.id === id);
      if (index < 0) {
        const productExists = {
          index: index,
          msg: "El carrito buscado no existe!",
        };
        throw productExists;
      }
      return productsCart[index];
    } catch (error) {
      throw error;
    }
  }
    async createCart() {
      try {
      const carts = await this.getAllProductsInCart();
      let id = 1;
      if (carts.length) {
        id = carts[carts.length - 1].id + 1;
      }

      const newCart = {
        id: id,
        timestamp: "new Date()",
        products: [],
      };

      carts.push(newCart);

      await this.saveCarts(carts);
    } catch (error) {
      throw new Error("Hubo un problema al crear el carrito!", error);
    }
  }

  async deleteAll() {
    try {
      await this.saveProducts([]);
    } catch (error) {
      throw new Error("Hubo un problema al borrar todos los productos!", error);
    }
  }

  async deleteById(id) {
    try {
      const carts = await this.getAllProductsInCart();

      const index = carts.findIndex((cart) => cart.id === id);

      if (index < 0) {
        throw "El carrito a eliminar no existe!";
      }

      carts.splice(index, 1);

      await this.saveCarts(carts);
    } catch (error) {
      throw error;
    }
  }

  async deleteProductInCartById(cartId, productId) {
    try {
      const carts = await this.getAllProductsInCart();
      const cartIndex = carts.findIndex((cart) => cart.id === cartId);

      const productIndex = carts[cartIndex].products.findIndex(
        (product) => product.id === productId
      );

      if (productIndex < 0) {
        throw "El producto buscado no existe dentro del carrito!";
      }

      carts[cartIndex].products.splice(productIndex, 1);

      await this.saveCarts(carts);
    } catch (error) {
      throw error;
    }
  }

  async AddNewProductToCart(cartId, product) {
    try {
      const carts = await this.getAllProductsInCart();
      const index = carts.findIndex((cart) => cart.id === cartId);
      carts[index].products.push(product);
      await this.saveCarts(carts);
    } catch (error) {
      throw new Error("No se pudo agregar el producto al carrito!", error);
    }
  }
}
export default Cart;
       
    
    