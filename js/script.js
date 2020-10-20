//interactive form treehouse project #3 ezbz12345 10/20/2020 
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('mail');
const otherJobTitle = document.getElementById('other-title');
otherJobTitle.style.display = "none"
const jobTitle = document.getElementById('title')
const tShirtDesign = document.getElementById('design')
const tShirtColor = document.getElementById('color')
const eventActivities = document.querySelector('#activities');
const colorChoices = document.getElementById('shirt-colors');


// makes sure that on page load, the cursor is active in the Name field. 
nameInput.focus();

//function that hides or displays the text entry box for other-job-title.
function whatOtherJob(){
    // console.log(JobTitle.value);
    if (jobTitle.value === "other"){
        otherJobTitle.style.display = "block";
    }else{
        otherJobTitle.style.display = "none";
    }
}
jobTitle.addEventListener("change", whatOtherJob);

// function to change whether or not color options if design was chosen
function pickDesign(){
    if(tShirtDesign.value !== 'js puns' && tShirtDesign.value !=="heart js"){
    colorChoices.style.display = "none";}else {colorChoices.style.display = "block";}
}
pickDesign(); //need to call upon page load before attaching to an event listener, since the page default is to not have a design chosen
tShirtDesign.addEventListener("change", pickDesign);

//function to change what colors show - since we only have some shirts in some colors, then we'll attach to an event listner
function availableColors(){
    if (tShirtDesign.value !== "js puns" && tShirtDesign.value !== "heart js"){
        for(i = 0 ; i < tShirtColor.length ; i ++){
            if(i === 0){
                tShirtColor[i].style.display = "block"
            }else{tShirtColor[i].style.display = "none"}
        }
        tShirtColor.selectedIndex = 0;
    }else if (tShirtDesign.value === "js puns"){
        for(i = 0 ; i < tShirtColor.length ; i ++){
            if(i === 0 | i > 3){
                tShirtColor[i].style.display = "none"
            }else{tShirtColor[i].style.display = "block"}
        }
        tShirtColor.selectedIndex = 1;
    }else if (tShirtDesign.value === "heart js"){
        for(i = 0 ; i < tShirtColor.length ; i ++){
            if( i < 4){
                tShirtColor[i].style.display = "none"
            }else{tShirtColor[i].style.display = "block"}
        }
        tShirtColor.selectedIndex = 4;
    }
}
tShirtDesign.addEventListener("change", availableColors);
// run the function on page load. 
availableColors();

// create an element that will display the total cost for the event
let totalPrice = 0;
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
//function to calculate price
function calculatePrice(){
    totalPrice = 0;
    for(i = 0 ; i < checkboxes.length ; i ++){
        if (checkboxes[i].checked === true){
        totalPrice += parseInt(checkboxes[i].dataset['cost']);
     
                 }
                } return totalPrice;
            }
//price updater for if a new checkbox is checked
function changeThePrice(){
    eventActivities.lastChild.remove();
    totalPrice = calculatePrice();
    let totalPriceCount = document.createElement('h3');
    totalPriceCount.textContent = `total price = $${totalPrice}`;
    eventActivities.appendChild(totalPriceCount);
    
}
eventActivities.addEventListener("change", changeThePrice);

//function to run through an array (occupiedTimes) that holds all checked inputs while checked, and disables any checkbox with the same dayAndTime value
//also resets or enables any checkboxes once a conflict of time has been undone by unchecking a box with a previously conflicting dayAndTime value
let occupiedTimes = [];
function haveAndEatCake(e){
    let whenEvent = e.target.dataset['dayAndTime'];
    if (e.target.checked === true){
        occupiedTimes.push(whenEvent);
    }else if(e.target.checked === false){
        for(i = 0; i < occupiedTimes.length ; i ++){
            if (occupiedTimes[i] === e.target.dataset['dayAndTime']){
            occupiedTimes.splice(i, 1);
        }}
    };
    for(i = 0 ; i < checkboxes.length ; i ++){
        if (checkboxes[i].checked === false && occupiedTimes.includes(checkboxes[i].dataset['dayAndTime'])){
            //checkboxes[i].textContent.strike();
            checkboxes[i].disabled = true;
            checkboxes[i].parentNode.style.textDecoration = "line-through";
                 }else{
                    checkboxes[i].disabled = false;
                    checkboxes[i].parentNode.style.textDecoration = "none";
                 }
                };
            }
eventActivities.addEventListener("change", haveAndEatCake);



//payment section
const paymentType = document.getElementById('payment');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const creditCardDiv = document.getElementById('credit-card');
function paymentDefault(){
    paymentType.value = 'credit card';
        creditCardDiv.style.display = "";
        paypalDiv.style.display = "none";
        bitcoinDiv.style.display = "none";
}
paymentDefault();
//function to display or hide the appropriate associated content for the different payments. 
function paymentChanger(){
    if (paymentType.value === 'credit card'){
        creditCardDiv.style.display = "";
        paypalDiv.style.display = "none";
        bitcoinDiv.style.display = "none";
    }
    else if (paymentType.value === 'paypal'){
        creditCardDiv.style.display = "none";
        paypalDiv.style.display = "";
        bitcoinDiv.style.display = "none";
    }
    else if (paymentType.value === 'bitcoin'){
        creditCardDiv.style.display = "none";
        paypalDiv.style.display = "none";
        bitcoinDiv.style.display = "";
    }
    else if (paymentType.value === 'select method'){
        creditCardDiv.style.display = "none";
        paypalDiv.style.display = "none";
        bitcoinDiv.style.display = "none";
    }
}
paymentType.addEventListener("change", paymentChanger);
//nodes for validation set up
const ccZip = document.getElementById('zip');
const creditCardNum = document.getElementById('cc-num');
const ccCVV = document.getElementById('cvv');
const registerButton = document.querySelector('button[type=submit]');
const nameValid = document.getElementById('name-blank');
const emailValid = document.getElementById('email-wrong');
const activitiesValid = document.getElementById('activities-none');
const selectPaymentValid = document.getElementById('select-payment');
const ccNumValid = document.getElementById('cc-num-wrong');
const ccZipValid = document.getElementById('zip-wrong');
const ccCVVValid = document.getElementById('cvv-wrong');
const ccNumEmpty = document.getElementById('cc-num-empty');

//all the validators in one object for easy calling
const validators = {
    name: ()=> {if (nameInput.value === ""){
                   // registerButton.disabled = true;
                    nameValid.classList.add('active');
                }
                else{registerButton.disabled = false;
                    nameValid.classList.remove('active');}
            },
    email: ()=> {if (/^[\w\d]+@[\w]+\.(com|net|gov|edu)$/.test(emailInput.value) === false){
                registerButton.disabled = true;
                emailValid.classList.add('active');
            }
                else{registerButton.disabled = false;
                emailValid.classList.remove('active');}
            },
    regForActivities: ()=> {for(i=0;i<checkboxes.length;i++){
                if(checkboxes[i].checked === true){
                    activitiesValid.classList.remove('active')
                    break;
                }
                else if (i === checkboxes.length - 1){
                    activitiesValid.classList.add('active');}}
            },
    payment: ()=>{if(paymentType.value === "credit card"){
                if(/^\d{4} ?-?\d{4} ?-?\d{4} ?-?\d\d?\d?\d?$/.test(creditCardNum.value) && creditCardNum.value !== ""){
                    ccNumValid.classList.remove('active');
                    ccNumEmpty.classList.remove('active');}
                else if (creditCardNum.value === ""){
                    ccNumValid.classList.remove('active');
                    ccNumEmpty.classList.add('active');
                }
                else{ccNumValid.classList.add('active');
                    ccNumEmpty.classList.remove('active');}
                    //prevent more than 16 numbers from even being enetered ty salad
        }else{ccNumValid.classList.remove('active');
              ccNumEmpty.classList.remove('active');
              ccZipValid.classList.remove('active');
              ccCVVValid.classList.remove('active');
            }
    },
    paymentZip: ()=>{if(paymentType.value === "credit card"){
                if(/^\d{5}$/.test(ccZip.value)){
                    ccZipValid.classList.remove('active');
                }
                else{ccZipValid.classList.add('active');}
    }

        },
    paymentCVV: ()=>{if(paymentType.value === "credit card"){
                if(/^\d{3}$/.test(ccCVV.value)){
                    ccCVVValid.classList.remove('active');
                }
                else{ccCVVValid.classList.add('active');}
}},
    selectMethod: ()=>{if(paymentType.value === "select method"){
            selectPaymentValid.classList.add('active');
    }else{selectPaymentValid.classList.remove('active');}}
    

    } 
//add event listeners for real time validation
nameInput.addEventListener("keyup", validators["name"]);
nameInput.addEventListener("blur", validators["name"]);

emailInput.addEventListener("keyup", validators["email"]);
eventActivities.addEventListener("change", validators["regForActivities"]);

const paymentFieldSet = paymentType.parentNode;
paymentType.addEventListener("change", validators['selectMethod']);
creditCardNum.addEventListener("keyup", validators["payment"]);
ccZip.addEventListener("keyup", validators["paymentZip"]);
ccCVV.addEventListener("keyup", validators["paymentCVV"]);



//last check to make sure that everything is in order before accepting submission
registerButton.addEventListener('click', validators["name"]);
registerButton.addEventListener('click', validators["email"]);
registerButton.addEventListener('click', validators["regForActivities"]);
registerButton.addEventListener('click', validators["payment"]);
registerButton.addEventListener('click', validators["paymentZip"]);
registerButton.addEventListener('click', validators["paymentCVV"]);
registerButton.addEventListener('click', validators["selectMethod"]);

registerButton.addEventListener('click', function(event){
    if(document.querySelectorAll('.active').length !== 0){
        event.preventDefault();
    }
})


