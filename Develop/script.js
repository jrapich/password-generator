 // Assignment code here
//lets declare all the things
var randomNumber = 0;
var lowerNumber = 0;
var upperNumber = 0;
var specialNumber = 0;

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  console.log(password);
}

//lets define all the function logic
//this will actually create the password
function generatePassword(){
  var alphaNumberic = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numeric = "0123456789";
  //TODO: figure out how to add " and ' into the string below
  var specials = " !#$%&()*+,-./:;<=>?@[\]^_`{|}~";
  var lower = alphaNumberic.toLowerCase();
  const upperCase = alphaNumberic.split("");
  const lowerCase = lower.split(""); 
  const specialChar = specials.split("");
  const mathChars = [upperCase.length, lowerCase.length, specialChar.length]; 
  randomNumberGen(0, mathChars);
}
//random number generator
//will pick a number between 0 and the length of each of the char arrays above
//will return a number for each of the possibly needed char groups
function randomNumberGen (min, max) {
  min = 0;
  //I got the following equation from w3schools
  //this should generate the number we need for each of the array groups above
  var tempNumber = Math.floor(
    Math.random() * (max - min + 1) ) + min;
  
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
