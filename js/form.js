// Урок 3//
function ButtonSetDefaultValue () {
    var buttonEl = document.getElementById('checkButton');
    buttonEl.addEventListener('click', function (event) { //отменяем действия браузера по умолчанию, при клике форма не отправляется
        event.preventDefault();
    });
}

checkButton.onclick = function CheckData()
{
    CheckElement("name",/[A-Za-zА-Яа]+$/,"Неверное имя!");
    CheckElement("datepic", /\d{1,2}\.\d{1,2}\.\d{4}/, "Неверный формат даты рождения!");

    var regEmail=/^(\w+)@([a-z]+\.[a-z]{2,6})$|^(\w+\.\w+)@([a-z]+\.[a-z]{2,6})$|^(\w+-\w+)@([a-z]+\.[a-z]{2,6})$/;
    CheckElement("email",regEmail, "Неверный Email!");

    CheckElement("phone",/^\+7\(\d{3}\)\d{3}-\d{4}/, "Неверный номер телефона!");

};

function CheckElement(id, reg, errorText) {
    var elem = document.getElementById(id);
    if (elem == null) {
        //error;
    }
    //если элемент найден
    else {
        //не прошел проверку
        if (!reg.test(elem.value)) {
            //отображаем ошибку
            elem.className = "error";

            showError(elem, errorText);

        }
    }
}

function showError(elem,errorText) {

    var divError = document.createElement('div'); // создаем новый блок для отображения ошибки в dialog
    divError.id = 'divError';
    var txt = document.createTextNode(errorText);
    txt.className="error";
    divError.appendChild(txt);
    elem.parentNode.appendChild(divError);
    $(elem).effect("bounce", { times: 2 }, "slow"); // добавляем эффект bounce
    $('#divError').dialog({
            title: 'Ошибка!',
            modal:true,
            buttons: [
                {
                    text: 'Close',
                    click: function() {
                        $( this ).dialog( "close" );
                    }
                }
            ]

        }

    );

}



// Урок 4. Задание 2.получаем список городов после загрузки страницы
(function ($) {
    $(function() {
           $.ajax({
                url: 'https://jsonplaceholder.typicode.com/users',
                dataType: 'json',
                success: function (users) {
                    $.each(users, function (i, user) {
                        var $option = $('<option />').text(user.address.city);
                        $('.cities').append($option);
                    });

                }
            })
        });
})(jQuery);

// Урок 6. Добавление поля ДР
$(function () {
    $('#datepic').datepicker({
        firstDay: 1,
        dateFormat: 'dd.mm.yy',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    });
})
