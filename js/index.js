var database = firebase.database();

$(document).ready(function(){

	$("#sign-up-btn").click(function(event) {
		event.preventDefault();
		
		var email = $("#email-input").val();
		var password = $("#password-input").val();
		var user_id = '';

		console.log(email, password);

		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(function(response) {
			console.log(response);
			user_id = response.user.uid;
            
			database.ref('users/' + user_id).set({
  			email: email,
  			password: password
             });
             
             window.location = "tinder.html?id=" + user_id; 

		})
		.catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(errorCode, errorMessage);
        });    
	})

    $("#sign-in-btn").click(function(event) {
		event.preventDefault();
		var email = $("#sign-in-email").val();
		var password = $("#sign-in-password").val();

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(function(response) {
			window.location = "tinder.html?id=" + response.user.uid;
		})
		.catch(function(error) {
  		// Handle Errors here.
  		var errorCode = error.code;
  		var errorMessage = error.message;
  		console.log(errorCode, errorMessage);
		});
	})
})
