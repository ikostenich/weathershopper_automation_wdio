/* eslint-disable max-classes-per-file */

class Product {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }

    static get builder() {
        return new ProductBuilder();
    }

    toString() {
        return `Product(title=${this.title}, price=${this.price})`;
    }

    equals(other) {
        return this.title === other.title
          && this.price === other.price;
    }

    greaterThan(other) {
        return this.price > other.price;
    }

    lessThan(other) {
        return this.price < other.price;
    }

    greaterThanOrEqual(other) {
        return this.price >= other.price;
    }

    lessThanOrEqual(other) {
        return this.price <= other.price;
    }

    notEqual(other) {
        return this.price !== other.price;
    }
}

class ProductBuilder {
    constructor() {
        this.title = null;
        this.price = null;
    }

    withTitle(title) {
        this.title = title;
        return this;
    }

    withPrice(price) {
        this.price = price;
        return this;
    }

    build() {
        const productObject = new Product(this.title, this.price);
        return productObject;
    }
}

module.exports = Product;
