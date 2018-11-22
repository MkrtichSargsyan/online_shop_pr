"use strict";


let seller = document.getElementById('seller__id')
let buyer = document.getElementById('buyer__id')

let add_button = document.getElementById('add-product__button');
let productName = document.getElementById('product-name__input');
let productPrice = document.getElementById('product-price__input');
let productType = document.getElementById('product-type__input');


let showProduct_Section = document.getElementById('show-product__section');
let storeShowProduct_Section = document.getElementById('store__show_product_section');
let shopping_cart_continer = document.querySelector('.buyed__product__container');

let checkTotal = 0;
let checkCount = 0;


let productList = {
    toysList: [],
    flowersList: [],
    booksList: [],
    randomProducts: [],
};


class Product {
    constructor(name, price, type) {
        this.name = name;
        this.price = price;
        this.type = type;
    }
}


add_button.addEventListener('click', function () {
    let nameValue = productName.value;
    let priceValue = productPrice.value;
    let typeValue = productType.options[productType.selectedIndex].text;


    if (nameValue === '' && priceValue === '') {

        productName.placeholder = 'Please add some text';
        productPrice.placeholder = 'Please add some text';
        productName.className += ' formInvalid';
        productPrice.className += ' formInvalid';


    } else if (nameValue === '') {
        productName.placeholder = 'Please add some text';
        productName.className += ' formInvalid';

    } else if (priceValue === '') {
        productPrice.placeholder = 'Please add some text';
        productPrice.className += ' formInvalid';
    } else if (typeValue === 'Product type') {

    } else {


        let product = new Product(nameValue, priceValue, typeValue);


        productName.placeholder = 'Product name';
        productName.classList.remove('formInvalid');
        productPrice.placeholder = 'Product price';
        productPrice.classList.remove('formInvalid');



        addProductToList(product);


        build();
        buildStore();
    }

});

function addProductToList(obj) {


    productList.randomProducts.push(obj);
    switch (obj.type) {

        case 'Flowers':
            productList.flowersList.push(obj);
            break;
        case 'Books':
            productList.booksList.push(obj);
            break;
        case 'Toys':
            productList.toysList.push(obj);
            break;
        default:
            console.log('wtf');
            break;

    }

    productName.value = '';
    productType.value = '';
    productPrice.value = '';
}


function build() {
    let html = '';

    for (let i = 0; i < productList.randomProducts.length; i++) {

        let obj = productList.randomProducts[i];

        html += '<div class="product__container">' +
            '<div class="product__name">' + obj.name + '</div>'
            + '<div class="product__type">' + obj.type + '</div>'
            + '<div  class="delete"><i class="material-icons delete__button">close</i></div>'
            + '</div>';

    }
    showProduct_Section.innerHTML = html;


    let deleteButtons = document.querySelectorAll('.delete__button');
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', function () {

            let tempObject = {};
            let tempObjectName = this.parentElement.parentElement.querySelector('.product__name').innerHTML;
            let tempObjectType = this.parentElement.parentElement.querySelector('.product__type').innerHTML;


            for (let j = 0; j < productList.randomProducts.length; j++) {
                if (productList.randomProducts[j].name === tempObjectName) {
                    tempObject = productList.randomProducts[j];
                    tempObjectType = productList.randomProducts[j].type;
                    console.log(tempObjectType);
                }
            }

            productList.randomProducts.splice(productList.randomProducts.indexOf(tempObject), 1);

            switch (tempObjectType) {
                case 'Toys':
                    productList.toysList.splice(productList.toysList.indexOf(tempObject), 1);
                    break;
                case 'Flowers':
                    productList.flowersList.splice(productList.flowersList.indexOf(tempObject), 1);
                    break;
                case 'Books':
                    productList.booksList.splice(productList.booksList.indexOf(tempObject), 1);
                    break;
                default:
                    console.log('wtf');
            }


            build();
            buildStore();

        })
    }
}


let arr = productList.randomProducts;

function buildStore() {


    let titlesArray = document.getElementsByClassName('store_section_titles');

    for (let i = 0; i < titlesArray.length; i++) {

        titlesArray[i].addEventListener('click', function () {

            for (let j = 0; j < titlesArray.length; j++) {
                document.getElementsByClassName('store_section_titles')[j].removeAttribute("style");
            }

            if (i === 1) {
                arr = productList.toysList;

            } else if (i === 2) {
                arr = productList.flowersList;
            } else if (i === 3) {
                arr = productList.booksList
            } else {
                arr = productList.randomProducts;
            }
            document.getElementsByClassName('store_section_titles')[i].style.borderBottom = "2px solid #000000";
            document.getElementsByClassName('store_section_titles')[i].style.lineHeight = "32px";
            buildStore();
        })
    }

    let html = '';

    for (let i = 0; i < arr.length; i++) {

        let obj = arr[i];

        html += '<div class="store__container">' +
            '<div class="image"><a href="https://placeholder.com"><img src="https://via.placeholder.com/81x80"></a></div>' +
            '<div class="product_info" style=" position: relative">' +

            '<b>' + obj.name + '</b>' +
            '<i>' + obj.type + '</i>' +
            '<div>$ ' + obj.price + '</div>' +
            '</div>' +
            '<button class="buy">Buy</button>' +
            '</div>';

    }
    storeShowProduct_Section.innerHTML = html;

    let buy_buttons = document.querySelectorAll('.buy');
    for (let i = 0; i < buy_buttons.length; i++) {

        buy_buttons[i].addEventListener('click', function () {

            checkCount++;

            let tempObjName = this.parentElement.querySelector('b').innerHTML;
            let tempObjPrice = +(this.parentElement.querySelector('.product_info').querySelector('div').innerHTML.substring(2));

            let html = '';

            html += '<div class="buyed__product">' +
                '<div class="buyedproduct_info">' +
                '<b>' + tempObjName + '</b>' +
                '<div>' + '$ ' + tempObjPrice + '</div>' +
                '<div class="zzv"><i>Count: 1</i><div class="decrease">-</div><div class="increase">+</div></div>' +
                '<b class="price">Price: ' + '$' + tempObjPrice + '</b>' +
                '</div>' +
                '<button class="x-class">X</button>' +
                '</div>';


            shopping_cart_continer.innerHTML += html;

            let total = 0;
            let priseValues = document.getElementsByClassName('price');
            for (let j = 0; j < priseValues.length; j++) {
                total += +priseValues[j].innerHTML.substring(8);
            }
            checkTotal = total;

            document.querySelector('.total__price').getElementsByTagName('b')[0].innerText = "Total price: $" + total;

            // this.style.pointerEvents = 'none';

            //add listeners to increase and decrease buttons

            let increaseButtons = document.getElementsByClassName('increase');

            for (let j = 0; j < increaseButtons.length; j++) {
                increaseButtons[j].addEventListener('click', function () {
                    let count = +(this.parentElement.getElementsByTagName('i')[0].textContent.substring(7)) + 1;
                    this.parentElement.getElementsByTagName('i')[0].textContent = 'Count: ' + count;
                    let num = count * +(this.parentElement.parentElement.getElementsByTagName('div')[0].textContent.substring(2));
                    this.parentElement.parentElement.getElementsByTagName('b')[1].textContent = 'Price: $' + num;


                    let total = 0;
                    let priseValues = document.getElementsByClassName('price');
                    for (let j = 0; j < priseValues.length; j++) {
                        total += +priseValues[j].innerHTML.substring(8);
                    }
                    checkTotal = total;
                    document.querySelector('.total__price').getElementsByTagName('b')[0].innerText = "Total price: $" + total;
                })
            }


            let decreaseButtons = document.getElementsByClassName('decrease');

            for (let j = 0; j < decreaseButtons.length; j++) {
                decreaseButtons[j].addEventListener('click', function () {
                    let count = +(this.parentElement.getElementsByTagName('i')[0].textContent.substring(7))
                    if (count !== 1) {
                        count--;
                        this.parentElement.getElementsByTagName('i')[0].textContent = 'Count: ' + count;
                        let num = count * +(this.parentElement.parentElement.getElementsByTagName('div')[0].textContent.substring(2));
                        this.parentElement.parentElement.getElementsByTagName('b')[1].textContent = 'Price: $' + num;
                        let total = 0;
                        let priseValues = document.getElementsByClassName('price');
                        for (let j = 0; j < priseValues.length; j++) {
                            total += +priseValues[j].innerHTML.substring(8);
                        }

                        checkTotal = total;
                        console.log(checkCount);
                        document.querySelector('.total__price').getElementsByTagName('b')[0].innerText = "Total price: $" + total;
                    }
                })
            }
            let title = document.createElement('div');
            title.classList.add('shopping__cart__title');

            // add listener for x button

            let xButtons = document.getElementsByClassName('x-class');

            for (let j = 0; j < xButtons.length; j++) {
                xButtons[j].addEventListener('click', function () {

                    checkCount--;
                    console.log(this.parentElement);

                    let parent = this.parentElement.getElementsByClassName('buyedproduct_info')[0];
                    let sum = +(parent.getElementsByClassName('price')[0].textContent.substring(8));
                    this.parentElement.parentElement.removeChild(this.parentElement);
                    let total = +(document.querySelector('.total__price').getElementsByTagName('b')[0].textContent.substring(14)) - sum;
                    checkTotal = total;
                    document.querySelector('.total__price').getElementsByTagName('b')[0].textContent = 'Total price: $' + checkTotal;
                })
            }
        });
    }
}


seller.addEventListener('click', function () {
    document.getElementById('seller__main').classList.remove('hide');
    document.getElementById('buyer__main').classList.add('hide');
    document.getElementById('funny').classList.add('hide');
    buyer.style.color = 'white';
    seller.style.color = '#243e16';

});

buyer.addEventListener('click', function () {
    document.getElementById('seller__main').classList.add('hide');

    if (productList.randomProducts.length === 0) {
        document.getElementById('funny').classList.remove('hide');
    } else {
        document.getElementById('funny').classList.add('hide');
        document.getElementById('buyer__main').classList.remove('hide');
    }
    seller.style.color = 'white';
    buyer.style.color = '#243e16';
});

let checkoutButton = document.getElementsByClassName('checkout')[0];

checkoutButton.addEventListener('click', function () {


    let cont = document.getElementsByClassName('buyed__product__container')[0];
    cont.innerHTML = '';

    document.querySelector('.total__price').getElementsByTagName('b')[0].textContent = 'Total price: $' + 0;

    alert('Total price is ' + checkTotal + '\n'
        + 'Total items ' + checkCount);

    checkTotal = 0;
    checkCount = 0;

});
