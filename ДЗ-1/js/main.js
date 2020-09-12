'use strict';

const products = [
    { id: 1, title: 'Аппарат для сахарной ваты', price: 10000, src: './img/vata.jpg' },
    { id: 2, title: 'Кружка мешалка Торнадо', price: 1500, src: './img/coffe.jpg' },
    { id: 3, title: 'Кофейные зерна в шоколаде Настоящему мужику', price: 500, src: './img/man.jpg' },
    { id: 4, title: 'Набор носков "На все случаи жизни"', price: 800, src: './img/socks.jpg' },
    { id: 5, title: 'Кружка Заправка "Полный бак" (с термослоем)', price: 450, src: './img/coffe2.jpg' },
    { id: 6, title: 'Кисточка для чистки пупка "Человеку, у которого все есть"', price: 1000, src: './img/navel.jpg' },
];

const renderProduct = (item, src) => {
    return `<div class="product__item">
                <div class="product__wrap">
                    <div class="product__buy">
                        <button class="by-btn">В корзину <i class="fas fa-shopping-basket"></i></button>
                    </div>
                    <img src="${item.src}" alt="image" class="product__img">
                </div>
                <div class="product__name">
                    <h3 class="product__title">${item.title}</h3>
                    <p class="product__price">${item.price} руб</p>
                </div>
            </div>`;
};

const renderProducts = (list) => {
    document.querySelector('.products').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item, item.src)).join(''));
};

renderProducts(products);

