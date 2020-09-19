'use strict';
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let btnBasket = document.getElementById('btn-cart');
let goodsListSection = document.getElementById('goods-list-section');

let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            const r = xhr.responseText;
            resolve(r);
            reject(console.log('error'));
        }
        xhr.send();
    });
}
getRequest();

class ProductList {
    #goods;

    constructor(container = '.products') {
        this.container = container;
        this.#goods = [];
        this.allProducts = [];

        // this._fetchProducts();
        this.#getGoods()
            .then(data => {
                this.#goods = [...data];
                this.#render();
            });

        console.log(this.sumPrice());
    }

    // fetchProducts() {
    //       getRequest(`${API}/catalogData.json`, (data) => {
    //         this.#goods = JSON.parse(data);
    //         this.#render();
    //         console.log(this.#goods);
    //       });
    //     }

    // #fetchGoods() {
    //     this.#goods = [
    //         { id: 1, title: 'Аппарат для сахарной ваты', price: 10000, src: './img/vata.jpg' },
    //         { id: 2, title: 'Кружка мешалка Торнадо', price: 1500, src: './img/coffe.jpg' },
    //         { id: 3, title: 'Кофейные зерна в шоколаде Настоящему мужику', price: 500, src: './img/man.jpg' },
    //         { id: 4, title: 'Набор носков "На все случаи жизни"', price: 800, src: './img/socks.jpg' },
    //         { id: 5, title: 'Кружка Заправка "Полный бак" (с термослоем)', price: 450, src: './img/coffe2.jpg' },
    //         { id: 6, title: 'Кисточка для чистки пупка "Человеку, у которого все есть"', price: 1000, src: './img/navel.jpg' },
    //     ];
    // }

    #getGoods() {
        return fetch(`${API}/catalogData.json`)
            .then(response => response.json())
            .catch(err => console.log(err));
    }

    #render() {
        const block = document.querySelector(this.container);

        for (let product of this.#goods) {
            const productObject = new ProductItem(product);

            this.allProducts.push(productObject);

            block.insertAdjacentHTML('beforeend', productObject.getHTMLString());
        }
    }

    // sumPrice() {
    //     return this.#goods.reduce((sum, { price }) => sum + price, 0);
    // }
}

class ProductItem {
    constructor(product, src = 'https://placehold.it/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.src = src;
    }
    getHTMLString() {
        return `<div class="product__item">
                    <div class="product__wrap">
                        <div class="product__buy">
                            <button class="by-btn">В корзину <i class="fas fa-shopping-basket"></i></button>
                        </div>
                        <img src="${this.src}" alt="image" class="product__img">
                    </div>
                    <div class="product__name">
                        <h3 class="product__title">${this.title}</h3>
                        <p class="product__price">${this.price} руб</p>
                    </div>
                </div>`;
    }
}


class GoodsItem {
    constructor(title, price, src) {
        this.title = title;
        this.price = price;
        this.src = src;
    }
    //метод возвращает html-разметку отрисовка корзины.
    render() {
        return `<div class="goods-list__product-box">
        <span class="goods-list__product-box__name">${this.title}</span>
        <div class="goods-list__product-box__price">${this.price}</div>
        <img class="goods-list__product-box__img" src=${this.src} height="100px" alt="">
        <input type="submit" value="X" class="goods-list-item__product-box__delete" onclick="deleteProductStringBasket()">
        </div>`
    }
}

const list = new ProductList();

//Создаем класс корзина Cart
class Cart {
    constructor() {
        this.goods = [];
    }
    //метод добавления товара в корзину
    addCartItem(cartItem) {
        this.goods.push(cartItem);
    }

    //Метод для вывода итоговой суммы корзины
    totalCartPrice() {
        let totalPrice = document.getElementById('goods-list__total');
        let sum = 0;
        this.goods.forEach(good => {
            sum += good.price
        });
        totalPrice.innerText = `Итого  ${sum} рублей`;
    }

    render() {
        let listHtml = '';
        let goodsList = document.getElementById('goods-list__product-box');

        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.src);
            listHtml += goodItem.render();
        });
        goodsList.innerHTML = listHtml;
    }
}

let renderCart = () => {
    // const list = new ProductList();
    const cart = new Cart();

    list.fetchGoods();
    cart.addCartItem(list.goods[0]);
    cart.addCartItem(list.goods[1]);
    cart.addCartItem(list.goods[2]);
    cart.addCartItem(list.goods[3]);
    cart.addCartItem(list.goods[4]);
    cart.addCartItem(list.goods[5]);
    cart.render();

    cart.totalCartPrice();
    goodsListSection.style.display = 'block';
};

btnBasket.addEventListener('click', renderCart);
window.addEventListener('click', function (evt) { console.log(evt) });







