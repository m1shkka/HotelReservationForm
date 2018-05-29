var dateReg = /^\d{2}([./-])\d{2}\1\d{4}$/;

var birthDiv = document.getElementById("myDiv");

//Create array of options to be added
var array = [];
var date = 1949;
for (var i = 0; date < 2000; i++) {
    array[i] = date + 1;
    date += 1;
}

//Create and append select list
var selectList = document.createElement("select");
selectList.setAttribute("id", "yearOfBirth");
birthDiv.appendChild(selectList);

//Create and append the options
for (var i = 0; i < array.length; i++) {
    var option = document.createElement("option");
    option.setAttribute("value", array[i]);
    option.text = array[i];
    selectList.appendChild(option);
}


function buildDaysDropDown() {
    var month = $("#monthOfBirthday").val();
    var year = $(birthDiv).val();
    var maxDays = daysInMonth(month, year);
    var days = [];
    for (var i = 0; i < maxDays; i++) {
        days[i] = i + 1;
    }
    var $dropdown = $("#dayid");
    $dropdown.empty();
    $.each(days, function() {
        $dropdown.append($("<option />").val(this.toString()).text(this.toString()));
    });
}

function daysInMonth(m, y) {
    switch (m) {
        case "2":
            {
                if (y % 4 === 0) {
                    return 29;
                }
                return 28;
            }
        case "9":
        case "4":
        case "6":
        case "11":
            return 30;
        default:
            return 31;
    }
}

function isValid(d, m, y) {
    return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
}


$(document).ready(function() {

    buildDaysDropDown();

    $("#dayid").keyup(function() {
        $("#dayid").val(this.value.match(/[0-9]*/));
    });

    $('#submitBtn').click(function() {
        var flag = true;

        if (!isValid($('#dayid').val(), parseInt($('#monthOfBirthday').val()), parseInt($(birthDiv).val()))) {
            alert('Wrong birth dates parameter')
            flag = false;
        }
    });
});


/*---------------------------------------*/


function datesgo() {


}



/*------------------------------------------------*/


function showError(container, errorMessage) {
    container.className = 'error';
    var msgElem = document.createElement('span');
    msgElem.className = "error-message";
    msgElem.innerHTML = errorMessage;
    container.appendChild(msgElem);
}

function resetError(container) {
    container.className = '';
    if (container.lastChild.className == "error-message") {
        container.removeChild(container.lastChild);
    }
}



function validate(form) {
    var elems = form.elements;

    resetError(elems.name.parentNode);
    if (!elems.name.value) {
        showError(elems.name.parentNode, "  input name!");
    }

    resetError(elems.surname.parentNode);
    if (!elems.surname.value) {
        showError(elems.surname.parentNode, 'input surname!');
    }

    resetError(elems.password.parentNode);
    if (!elems.password.value) {
        showError(elems.password.parentNode, 'input password!');
    }


    var a1 = document.getElementById("surname").value;
    var a = document.getElementById('name1').value;
    if (a > 64 || (a < 91 && a > 97) || (a < 123 && a < 1040) || a > 1103) {
        alert("Input NORMAL NAME!");
    }

    if (a1 > 64 || (a1 < 91 && a1 > 97) || (a1 < 123 && a1 < 1040) || a1 > 1103) {
        alert("Input NORMAL SURNAME!");
    }


    if ($('#departing').val() === "" || $('#returning').val() === "") {
        alert('Your date is empty!!!');
    } else {
        var result = new Date($('#departing').val()) > new Date($('#returning').val());
        if (result) {
            alert('Incorrect booking dates!');
        }

    }
}
