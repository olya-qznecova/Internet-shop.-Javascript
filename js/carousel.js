$(function(){

    $(".button-right").click(function(){
        $(".carousel-items").animate({left: "-222px"}, 200); // анимация: блок с набором картинок уедет влево
        setTimeout(function () { // устанавливаем задержку перед выполнением следующих функций.
            $(".carousel-items .block").eq(0).clone().appendTo(".carousel-items"); // выбираем первый элемент (eq(0)), создаём его копию и помещаем в конец карусели
            $(".carousel-items .block").eq(0).remove(); // удаляем первый элемент карусели
            $(".carousel-items").css({"left":"0px"}); // возвращаем исходное смещение набора набора элементов карусели
        }, 300);
    });

    $(".button-left").click(function(){
        $(".carousel-items .block").eq(-1).clone().prependTo(".carousel-items"); // выбираем последний элемент, создаём его копию и помещаем в начало(PrependTo)
        $(".carousel-items").css({"left":"-222px"}); // устанавливаем смещение
        $(".carousel-items").animate({left: "0px"}, 200); // за 200 милисекунд элементы переместятся в исходную точку
        $(".carousel-items .block").eq(-1).remove(); // выбираем последний элемент карусели и удаляем его
    });

});