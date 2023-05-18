function getDate(element)
{
	// Get date 
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	// Create a string of date
	today = dd + '/' + mm + '/' + yyyy;

	// Set the date in div
	const div = document.getElementById(element);
	div.textContent = today;
}

getDate('current-date');