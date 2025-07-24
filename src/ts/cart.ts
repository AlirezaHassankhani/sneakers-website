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

  setCart(product: IProduct): void {
    this.cart.push(product);
  }
  getCart(): IProduct[] {
    return this.cart;
  }

  deleteFromCart(ID: string): void {
    this.cart = this.cart.filter((product) => product.id !== ID);
  }

  getCount(): number {
    return this.cart.length;
  }
}

export default Cart;
