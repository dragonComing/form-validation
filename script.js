"use strict";
// * `Email` must be a valid email address.
// //<input type='text' id='email' name='email'>

// * `Password` must be longer than 8 characters.
// // <input class='error' type='password' id='password' name='username'>

// * `Colour` must be selected.
// 	 // <select name='colour' id='colour'>
// 	 //                    <option value=''>Choose colour</option>
// 	 //                    <option value='blue'>Blue</option>
// 	 //                    <option value='green'>Green</option>
// 	 //                    <option value='red'>Red</option>
// 	 //                    <option value='black'>Black</option>
// 	 //                    <option value='brown'>Brown</option>
// 	 // </select>

// * At least two `Animal`s must be chosen.
// 		// <input type='checkbox' name='animal' value='bear' id='bear'>
// 		//                 <label for='bear'>
// 		//                      Bear
// 		//                 </label>
// 		//                 <input type='checkbox' name='animal' value='tiger' id='tiger'>
// 		//                 <label for='tiger'>
// 		//                     Tiger
// 		//                 </label>
// 		//                 <input type='checkbox' name='animal' value='snake' id='snake'>
// 		//                 <label for='snake'>
// 		//                      Snake
// 		//                 </label>
// 		//                 <input type='checkbox' name='animal' value='donkey' id='donkey'>
// 		//                 <label for='donkey'>
// 		//                      Donkey
// 		//                 </label>
// 		//             </p>
// 		//             

// * If `Tiger` is one of the chosen `Animal`s then `Type of tiger` is required to be a non-empty string.
// 		//				<p>
// 		//                 <label class='label' for='tiger_type'>
// 		//                     Type of tiger
// 		//                 </label>
// 		//                 <input type='text' name='tiger_type' id='tiger_type'>
// 		//             </p>
// ## Other requirements
// If the form is submitted and an error occurs, the error element's parent should have a CSS `error` class added to it.

//define the variable
var email,pass,checkNum=0,tigerChecked=false,colourStatus=false,emailStatus=false,passStatus=false,
	emailField = getId('email'),
	passField = getId('password'),
	colour = getId('colour'),
	inputs = getTag('input'),
	form = getTag('form'),
	checkbox = getName('animal'),
	tiger = getId('tiger'),
	tigerType = getId('tiger_type'),
	submit = getId('submit');

//disabled the tiger text field
tigerType.disabled = true;

//get the variable by id
function getId(id){
	return document.getElementById(id);
};

//get the variables by tag name
function getTag(tag){
	return document.getElementsByTagName(tag);
};

//get the variables by name
function getName(name){
	return document.getElementsByName(name);
};
//valid the email if it matches the pattern.
function emailValid(email){
	var val = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return val.test(email);
};

function emailCheck(){
	
if (emailValid(email) == true){
	emailField.parentNode.removeAttribute("class");
	emailStatus = true;
}
else{
	emailField.parentNode.setAttribute("class","error");
	emailStatus = false;
}
};

//valid the password if it is longer than 8 charecters
function passwordValid(pass){
	var val = /^[a-zA-Z0-9]{8,}$/;
	return val.test(pass);
}

function passCheck(){
if (passwordValid(pass) == true){
	passField.parentNode.removeAttribute("class");
	passStatus = true;
}
else{
	passField.parentNode.setAttribute("class","error");
	passStatus = false;
}
}

//Excute the validation function when typing in the field
emailField.onkeyup = function(){email = getId('email').value;emailCheck()};
passField.onkeyup = function(){pass = getId('password').value;passCheck(pass)};

//Make sure colour is selected
colour.onchange = function(){
if (colour.value == ''){
	colour.parentNode.setAttribute("class","error");
	colourStatus = false;
}
else{
	colour.parentNode.removeAttribute("class");	
	colourStatus = true;
}
};


//count how many checkbox checked
for (var i=0; i< checkbox.length; i++){
	checkbox[i].onchange = function(){
		if(this.checked == true){
		checkNum++;
		}	
		else{
		checkNum--;
		}
		
		if(checkNum >=2){
			checkbox[0].parentNode.removeAttribute("class");
			
		}
		else{
			checkbox[0].parentNode.setAttribute("class","error");
		}
		if(tiger.checked == true){
		//alert('Please enter your tiger type in the filed below!!');
		tigerChecked = true;
		tigerType.disabled = false;
		if (tigerType.value==''){
		tigerType.parentNode.setAttribute("class","error");
		}
		}
		else{
		tigerChecked = false;
		tigerType.disabled = true;
		tigerType.parentNode.removeAttribute("class");
		}
	}
};

tigerType.onkeyup = function(){
	if (tigerType.value==''){
		tigerType.parentNode.setAttribute("class","error");
	}
	else{
		tigerType.parentNode.removeAttribute("class");
	}
}

//do final check before submit the form
function finalCheck(){
	if (emailStatus&&passStatus&&colourStatus&&checkNum >= 2){
		if(tigerType.disabled == false){
			if(tigerType.value ==""){
				tigerType.parentNode.setAttribute("class","error");
				return false;
			}
			else{
				alert('The form has been submitted successfully');
					
				return true;
			}
		}
		else{
			alert('The form has been submitted successfully');
			return true;
		}
		
	}
	else{

		if(emailStatus == false){
			emailField.parentNode.setAttribute("class","error");
		}
		if(passStatus == false){
			passField.parentNode.setAttribute("class","error");
		}
		if(colourStatus == false){
			colour.parentNode.setAttribute("class","error");
		}
		if(checkNum < 2){
			checkbox[0].parentNode.setAttribute("class","error");
		}
		alert('You must fill up this form correctly before submit it!');
		return false;
	
	}
}



