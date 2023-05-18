function applicationFormSubmit()
{
	// Get form data
	let forename = document.forms["application-form"]["forename"].value;
	let middleName = document.forms["application-form"]["middle-name"].value;
	let lastName = document.forms["application-form"]["last-name"].value;
	let birth = document.forms["application-form"]["birth"].value;

	let email = document.forms["application-form"]["email"].value;
	let phoneNumber = document.forms["application-form"]["phone-number"].value;
	let addressOne = document.forms["application-form"]["address-1"].value;
	let addressTwo = document.forms["application-form"]["address-2"].value;
	let postcode = document.forms["application-form"]["postcode"].value;

	let courseList = document.forms["application-form"]["course-list"].value;


	// Make sure that all fields are not empty
	if (forename == "" || middleName == "" || lastName == "" || birth == "" ||
		email == "" || phoneNumber == "" || addressOne == "" || addressTwo == "" || postcode == "" ||
		courseList == "") {
		alert("All fields must be filled out.");
		return false;
	}

	// Make sure the email address is valid
	if(!validateEmail(email)){
		alert("Email address must be valid.");
		return false;
	}

	// Date of birth must be valid
	var dateOfBirthPattern = /^((0[1-9]|[12][0-9]|3[01])(\/)(0[13578]|1[02]))|((0[1-9]|[12][0-9])(\/)(02))|((0[1-9]|[12][0-9]|3[0])(\/)(0[469]|11))(\/)\d{4}$/;
	if(!dateOfBirthPattern.test(birth))
	{
		alert("Date of brith must be DD/MM/YYYY for example 15/12/1996");
		return false;
	}

	// Validate phone number is a number
	if(!/^[0-9]+$/.test(phoneNumber)){
	    alert("Phone number must only contain numbers.");
		return false;
	}



	//
	// Sent email code taken from https://stackoverflow.com/questions/7381150/how-to-send-an-email-from-javascript
	//

	// Email the request to Bolton College
	console.log("Emailing...");

	// Set data to send
	data_js['subject'] = "New Application for " + courseList;
	data_js['text'] = "New appllication - " + "name: " + forename + "; middle name: " + middleName + "; last name:" + lastName + "; birth: " + birth + "; " + 
		"email: " + email + "; phone number: " + phoneNumber + "; address 1" +  addressOne + "; address 2" + addressTwo+ "; postcode: " +  postcode + "; " + 
		"course: " + courseList;

	// Convert data to url params
	var params = toParams(data_js);

	// Create a request 
	var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            onSuccess();
        } else
        if(request.readyState == 4) {
            js_onError(request.response);
        }
    };

    // Send the email via invotes
	request.open("POST", "https://postmail.invotes.com/send", true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(params);
}

// What to do once the email sent
function onSuccess(){
	// Hide form
	var form = document.getElementById("application-form");
	form.style.display = "none";

	// Show success message
	var form = document.getElementById("email-success");
	form.style.display = "block";
}

// what to if the email failed
function onError(){
	// Hide form
	var form = document.getElementById("application-form");
	form.style.display = "none";

	// Show success message
	var form = document.getElementById("email-failed");
	form.style.display = "block";
}

// Data to send to invotes
var data_js = {
    "access_token": "ksxy015sf1vco0j25ppm9m7s"	
};

// Function to validate email addresses
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Convert array to url params
function toParams(data_js) {
    var form_data = [];
    for ( var key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}