interface IProduct {
    id: string;
    name: string;
    price: number;
    count: number;
}

class Cart {
  private cart: IProduct[] = [];

  constructor(cart: IProduct[]) {
    this.cart = cart;
  }

  setCart(product: IProduct) {
    this.cart.push(product);
  }
  getCart() {
    return this.cart;
  }

  deleteFromCart(ID: string) {
    this.cart = this.cart.filter((product) => product.id !== ID);
  }
}

export default Cart;