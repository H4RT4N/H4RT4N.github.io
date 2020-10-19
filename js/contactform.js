//firebase link
var firebaseConfig = {
    apiKey: "AIzaSyCRYsXazlUcWDmsWOYmJWdp_2JKjinPyYQ",
    authDomain: "contactmeform-3de70.firebaseapp.com",
    databaseURL: "https://contactmeform-3de70.firebaseio.com",
    projectId: "contactmeform-3de70",
    storageBucket: "contactmeform-3de70.appspot.com",
    messagingSenderId: "868962792991",
    appId: "1:868962792991:web:00b5f76739b7bf303c872a",
    measurementId: "G-P80V6E5WZQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var msgRef = firebase.database().ref('messages');

document.getElementById('contactmeform').addEventListener('submit', submitForm);

function submitForm(e){
	e.preventDefault();
	var name = getInput('name');
	var contact = getInput('submittercontact');
	var msg = getInput('msg');

	// send message
	sendMsg(name, contact, msg);

	// confirmation
	document.querySelector('.alert').style.display = 'block';
	// hide confirmation
	setTimeout(function() {
		document.querySelector('.alert').style.display = 'none';
	}, 2500)

	document.getElementById('contactmeform').reset();
}

function getInput(id){
	return document.getElementById(id).value;
}

function sendMsg(name, contact, msg) {
	var newMsgRef= msgRef.push();
	newMsgRef.set({
		name: name, contact: contact, msg: msg
	});
}