
function pageLoad(){
	// Get the url of the page
	const queryString = window.location.search;


	// Get the url paramaters
	const urlParams = new URLSearchParams(queryString);


	// Find the course pramater
	const course = urlParams.get('course');


	// Set the correct course option
	selectElement('course-list', course);
}


function selectElement(id, valueToSelect) {  
	// Find the select box
	const select = document.querySelector('#'+id);

	// Get all the options
	const options = Array.from(select.options);
	
	// Does the valueToSelect exisits
	const optionToSelect = options.find(item => item.value == valueToSelect);


	// It the valueToSelect does exists
	if(optionToSelect !== undefined)
	{
		// The it as the detault value
		select.value = valueToSelect;
	}
}

pageLoad();