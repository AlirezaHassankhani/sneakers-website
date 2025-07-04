class Counter {
  count = 0;
  constructor(count) {
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
  setCount(input) {
    this.count = input;
  }
  getCount() {
    return this.count;
  }
}
export default Counter;
