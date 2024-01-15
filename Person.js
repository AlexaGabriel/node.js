class Person {
  constructor(name) {
    this.name = name;
  }
  sayMyName() {
    return `my name is ${this.name}`;
  }
}

module.exports = {
  Person,
};
