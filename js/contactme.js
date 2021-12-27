// contact form
const contactForm = document.querySelector("#contactMeForm");

// firebase
const firebaseConfig = {
  apiKey: "AIzaSyCRYsXazlUcWDmsWOYmJWdp_2JKjinPyYQ",
  authDomain: "contactmeform-3de70.firebaseapp.com",
  databaseURL: "https://contactmeform-3de70.firebaseio.com",
  projectId: "contactmeform-3de70",
  storageBucket: "contactmeform-3de70.appspot.com",
  messagingSenderId: "868962792991",
  appId: "1:868962792991:web:00b5f76739b7bf303c872a",
  measurementId: "G-P80V6E5WZQ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// put messages into a collection called 'messages'
let destination = firebase.database().ref("messages");

function submitForm(event) {
  event.preventDefault();
  let submitter = getInput("submitter");
  let contactInfo = getInput("contactInfo");
  let msg = getInput("msg");

  let send = destination.push();
  send.set({
    submitter: submitter,
    contactInfo: contactInfo,
    msg: msg,
  });

  contactForm.reset();
}
function getInput(id) {
  return document.getElementById(id).value;
}

contactForm.addEventListener("submit", submitForm);