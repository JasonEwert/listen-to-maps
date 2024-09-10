window.onload = function() {
	
	if (window.document.documentMode) {
		console.log("this is IE");
		let description = document.getElementById('description');
		description.innerHTML ="<b> Unsupported browser. </b> <br /><br />Please load the site using a modern web browser such as Google Chrome, Microsoft Edge, Mozilla Firefox or Apple Safari."
	}
}