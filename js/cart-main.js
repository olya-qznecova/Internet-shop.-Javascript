var PRODUCTS_BLOCK_SMALL = '#yourItem';
var PRODUCT_CART_TABLE = '#cartTable';
var ID_SUBTOTAL_SUM = '#subTotalSum';
var ID_TOTAL_SUM = '#TotalSum';
var ID_GRAND_TOTAL_SUM = '#GrandTotalSum';



////////////////////////////////////
Cart.prototype = Object.create(Container.prototype);
var cart = new Cart();

EventListener();
////////////////////////////////////

function Container() {
    this.id = '';
    this.className = '';
    this.element = null;

}

function Product (options) {
    this.id = options.id;
    this.className = options.name;
    this.price = options.price;
    this.img = options.img;
    this.count = 1;
}


function Cart() {
    Container.call(this);

    var myCartStorage =JSON.parse(localStorage.getItem("myCart"));
    var content = myCartStorage == null? []:myCartStorage;

//Получение контента
    this.getContent = function () {
        return content;
    };


//Пополнение контента

    this.AddProduct = function (product) {
//переменная, отвечающая за наличие такого элемента в корзине
        var checkElementById = false;
        var prd = null;
//ищем элемент по id
        for (var i = 0; i < content.length; i++) {
//если элемент нашелся
            if (content[i].id == product.id) {
//увеличиваем количество
                content[i].count++;
                prd = content[i];
                break;
            }
        }
//если такого товара еще не было в корзине
        if (!prd) {
            content.push(product);
            prd = product;
        }
        DisplayProductInSmallCart(prd);
        // ShowDialog(product);
        localStorage.setItem("myCart", JSON.stringify(content));
        cart.UpdateTotalSum();
    };

    function DisplayProductInSmallCart(product) {
        var divYourCart = $(PRODUCTS_BLOCK_SMALL);
        divYourCart.children('#' + product.id).remove();

        var newBlock = '<a href="#" id="' + product.id + '" class="your-item"><img src="' + product.img + '" alt="" class="item-pic" height="80"><div class="info-box" ><h2>' + product.className + '</h2><img src="img/-----.png" alt=""><p>' + product.count + ' x $' + product.price + '</p></div><div class="xxx" onclick="DeleteElementFromCartHandler(\'' + product.id + '\', PRODUCTS_BLOCK_SMALL)"><i class="fa fa-times-circle" aria-hidden="true"></i></div></a>';
        divYourCart.prepend(newBlock);
        // // окно с сообщением "Товар добавлен в корзину"


           }

      function ShowDialog  (product) {

        //   $( "#message" ).dialog({
        //       dialogClass: "no-close",
        //       modal: false,
        //       dialogClass: 'noTitleStuff',
        //       show: 'fade',
        //       hide: 'fade'
        //
        //   });
        //
        //   $( "#message" ).text("Товар добавлен в корзину");
        //   // $( "#message" ).hide();
        // $('.ui-dialog-titlebar').hide();
              }

    this.DisplaySmallCart = function()
    {
        for (i=0;i<content.length;i++) {
            product = content[i];

            DisplayProductInSmallCart(product);
        }
        cart.UpdateTotalSum();
    };
    ////////////////////////////////////
    // MAIN CART PAGE
    ////////////////////////////////////

    this.DisplayMainCart = function (product)
    {

        for (i=0;i<content.length;i++) {
            product = content[i];
            var divYourMainCart = $(PRODUCT_CART_TABLE);
            var newBlock = '<tr id=\'' + product.id + '\'><td class="first-block">' +
                '            <div class="mango-product"><a href="#" class="rectangle">' +
                '            <img src="' + product.img + '" alt=""></a>' +
                '            <div class="item1"><a href="#" class="mango item1__mango">' + product.className + '</a><div>' +
                '            <p>Color:   <span class="color">Red</span></p>' +
                '            <p>  Size:   <span class="color">Xll</span></p>' +
                '            </div></div></div></td><td>'+ '$' + product.price + '</td><td>' +
                '           <input type="number" min="1" value="'+product.count+'" onchange="SetProductCountValueHandler(\''+product.id+'\', this)"></td><td>FREE</td><td id="subTotalSum'+product.id+'">$'+parseFloat(content[i].price) * parseFloat(content[i].count)+'</td><td><div class="xxx" onclick="DeleteElementFromCartHandler(\'' + product.id + '\', PRODUCT_CART_TABLE)"><i class="fa fa-times-circle" aria-hidden="true"></i></a></td></tr></table>';

            divYourMainCart.prepend(newBlock);
        }

        //localStorage.setItem("myCart", JSON.stringify(content));
        cart.UpdateTotalSum();
    };


    //Удаление одного элемента
    this.CartDeleteElement = function (id, parentBlockName) {
        //deleting from array
        for (var i=0;i<content.length; i++) {
            if (content[i].id == id) {
                content.splice(i,1);
                break;
            }
        }

        //deleting from form
        var divYourCartItems = $(parentBlockName); //общий блок товаров
        divYourCartItems.children('#' + id).remove();

        localStorage.setItem("myCart", JSON.stringify(content));
        cart.UpdateTotalSum();
    };


    //Очистка корзины

    this.CartRemoveAllElements = function () {
        content.length = 0;
        $(PRODUCTS_BLOCK_SMALL).empty();
        $(PRODUCT_CART_TABLE).empty();

        localStorage.setItem("myCart", JSON.stringify(content));
        cart.UpdateTotalSum();
    };

    //Получение суммы товаров в корзине
    this.UpdateTotalSum = function () {
        var sum = 0;
        for (i=0; i<content.length; i++) {
            var prd = content[i];
            sum = sum + parseFloat(content[i].price) * parseFloat(content[i].count);
        }
        $(ID_TOTAL_SUM).text('$' + String(parseFloat(sum).toFixed(2)));
        $(ID_GRAND_TOTAL_SUM).text('$' + String(parseFloat(sum).toFixed(2)/2));

    };


    this.SetProductCountValue = function(id_, inputSetValue)
    {
        var newCount = parseInt(inputSetValue.value);
        for (var i = 0; i < content.length; i++) {
            //если элемент нашелся
            if (content[i].id == id_) {
                //если неверное значение
                if (newCount<1){
                    inputSetValue.value = content[i].count;
                    break;
                }
                //увеличиваем количество
                content[i].count = newCount;
                $(ID_SUBTOTAL_SUM+id_).text('$'+parseFloat(content[i].price) * parseFloat(content[i].count));
                break;
            }
        }
        localStorage.setItem("myCart", JSON.stringify(content));
        //обновление общей суммы
        cart.UpdateTotalSum();

        //обновление суммы в строке
    };

}


function cartAddProductHandler(options) {
    cart.AddProduct(new Product(options));
}

function DeleteElementFromCartHandler(id_, parentBlockName) {
    cart.CartDeleteElement(id_, parentBlockName);
}

function CartRemoveAllHandler(options) {
    cart.CartRemoveAllElements();
}


function SetProductCountValueHandler(id_, inputSetValue)
{
    cart.SetProductCountValue(id_,inputSetValue);
}
//function UpdateTotalSumHandler() {
//    cart.UpdateTotalSum();
//}


////////////////////////////////////////
//	LISTENER METHOD
////////////////////////////////////////
function EventListener()
{

    $('#remove-all').bind('click',function () {
        CartRemoveAllHandler();
    });

    $(document).ready(function DisplayMainCartHandler() {
        cart.DisplayMainCart();
        cart.DisplaySmallCart();
    });



//	   $(PRODUCTS_BLOCK_SMALL).bind('DOMSubtreeModified', function() {
//        UpdateTotalSumHandler();
//    });

//    $(PRODUCT_CART_TABLE).bind('DOMSubtreeModified', function() {
//        UpdateTotalSumHandler();
//    });

}