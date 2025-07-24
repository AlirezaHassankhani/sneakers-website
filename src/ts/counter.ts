class Counter {
  private count: number = 0;

  constructor(count: number) {
    this.count = count;
  }

  increaseCount() {
    this.count += 1;
  }
  decreaseCount() {
    if (this.count > 0) {
      this.count -= 1;
    }
  }

  setCount(input: number): void {
    this.count = input;
  }
  getCount(): number {
    return this.count;
  }
}

export default Counter;
