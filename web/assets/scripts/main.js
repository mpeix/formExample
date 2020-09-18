let Config;

window.onload = function () {
    document.getElementById("main-form").addEventListener("submit", formUtils.validate);
    Config = FillConfig();
}

function FillConfig() {
   return {
        RequiredFields : ['name', 'surname', 'email'],
        RequiredText : 'Field is required',
        Phone:{
            ErrorMessage:"Phone is not valid"
        },
        Email:{
            ErrorMessage:"Email is not valid, must contain an @"
        },
        Texts : {
            MaxLenghtErrorMsg: 'The maximum characters allowed are ',
            NameMaxLeng: 10,
            SurnameMaxLeng: 20
        }
    }
}

let formUtils = {
    validate: function (e) {
        let formHasErrors = false;
        e.preventDefault();
        let form = document.getElementById('main-form');
        formUtils.removeErrors();
        let formInputs = form.getElementsByTagName('input');
        for (let i = 0; i < formInputs.length; i++) {
            let element = formInputs[i];
            let isElementCorrect = formUtils.isRequiredFieldInformed(element)
            if(isElementCorrect){
                switch (element["type"]) {
                    case 'text':
                        isElementCorrect = formUtils.isValidTextField(element);
                        break;
                    case 'phone':
                        isElementCorrect =formUtils.isValidPhoneField(element);
                        break;
                    case 'email':
                        isElementCorrect = formUtils.isValidEmailField(element);
                        break;
                    default:
                        break;
                }
            }

            if(!isElementCorrect)
                formHasErrors = true;
        };
   
        if (!formHasErrors){
            document.getElementById('datos-ok').style.display='block';
            //All correct, perform call to backend or perform form submit
        }
    },

    removeErrors: function () {
        let errorElements = document.getElementsByClassName('error-text');
            for (let i = errorElements.length -1; i >= 0; i--) 
                errorElements[i].remove();
    },

    isRequiredFieldInformed: function (elem) {
        if (Config.RequiredFields.indexOf(elem.id) !== -1 && elem.value.trim().length === 0){
            formUtils.insertErrorElement(elem, Config.RequiredText);
            return false;
        }else
            return true;
    },
  
    isValidTextField: function(elem){
        if(elem.id ==="name")
           return formUtils.isValidLenght(elem, Config.Texts.NameMaxLeng, `${Config.Texts.MaxLenghtErrorMsg} ${Config.Texts.NameMaxLeng}`); 
        else if(elem.id === "surname")
            return formUtils.isValidLenght(elem, Config.Texts.SurnameMaxLeng, `${Config.Texts.MaxLenghtErrorMsg} ${Config.Texts.SurnameMaxLeng}`); 
        else
            return true;
    },
    isValidPhoneField: function(elem){
        if(Number.isFinite(elem.value))
            return true;
        else{
            insertErrorElement(elem, Config.Phone.ErrorMessage);
            return false;
        }
    },

    isValidEmailField:function(elem){
       if(elem.value.includes('@'))
            return true;
       else {
            insertErrorElement(elem, Config.Email.ErrorMessage);
            return false;
       }
    },

    isValidLenght: function (elem, maxLenght, errorMessage) {
        if(elem.value.length > maxLenght){
            formUtils.insertErrorElement(elem, errorMessage);
            return false;
        }
            return true;
    },

    insertErrorElement: function (elem, message) {
        let errorElement = document.createElement('span');
        errorElement.classList.add('error-text');
        errorElement.textContent = `** ${message}`;
        elem.parentNode.insertBefore(errorElement, elem);
    }
}