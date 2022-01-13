function showSuggestionForm()
{
    //gets the suggestion form
    const suggestionForm = document.getElementById('product-suggestion-form');

    //gets the current display status of the form
    let displaySetting = suggestionForm.style.display;

    //if the form is showing, hide it
    if(displaySetting === 'flex') {
        suggestionForm.style.display = 'none';
    }
    //if the form is hidden, show it
    else {
        hideAllForms();//hide all other forms before showing form
        suggestionForm.style.display = 'flex';
    }
}

function showContactForm()
{
    const contactForm = document.getElementById('contact-form');
    let displaySetting = contactForm.style.display;
    if(displaySetting === 'flex'){
        contactForm.style.display = 'none';
    }
    else {
        hideAllForms();
        contactForm.style.display = 'flex';
    }
}


function validateEmail(elementValue){
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
}

function submitSuccess(thisForm)
{
    const formObjs = document.getElementById(thisForm).elements;
    const submissionPage = document.getElementById('submission-success-form');
    const errorText = document.getElementsByClassName('error-text');
    let displaySetting = submissionPage.style.display;
    if(displaySetting === 'flex'){
        submissionPage.style.display = 'none';
    }
    else {
        let control = 0;
        for(let i = 0; i < formObjs.length; i++)
        {
            if(formObjs[i].value.length > 0)
            {
                control ++;//simplest way to check for text in the form
            }
        }
        console.log(control);
        if(control >= formObjs.length && validateEmail(formObjs[2].value))//-1 to account for the submit button
        {
            hideAllForms();
            controlFormButtons(3);//3 to trigger else condition and reset their display
            submissionPage.style.display = 'flex';
            errorText[0].style.display = 'none';
            errorText[1].style.display = 'none';
        }
        else {
            errorText[0].style.display = 'block';
            errorText[1].style.display = 'block';
        }
    }
}

function controlFormButtons(index)
{
    const orderQuestionBlock = document.getElementById('order-question-block');
    const websiteFeedbackBlock = document.getElementById('website-feedback-block');

    if(index === 0){
        orderQuestionBlock.style.backgroundColor = 'darkgrey';
        websiteFeedbackBlock.style.backgroundColor = 'lightsteelblue';

    }
    else if(index === 1){
        websiteFeedbackBlock.style.backgroundColor = 'darkgrey';
        orderQuestionBlock.style.backgroundColor = 'lightsteelblue';

    }
    else if(index === 2){
        orderQuestionBlock.style.backgroundColor = 'lightsteelblue';
        websiteFeedbackBlock.style.backgroundColor = 'lightsteelblue';
        showSuggestionForm();
    }
    else{
        orderQuestionBlock.style.backgroundColor = 'lightsteelblue';
        websiteFeedbackBlock.style.backgroundColor = 'lightsteelblue';
    }
}

function clearContents(element)
{
    element.value = '';
}

function hideAllForms()
{
    const errorText = document.getElementsByClassName('error-text');
    errorText[0].style.display = 'none';
    errorText[1].style.display = 'none';
    document.getElementById('product-suggestion-form').style.display = 'none';
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('submission-success-form').style.display = 'none';
}