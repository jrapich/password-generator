 // Assignment code here
//lets declare all the things
var randomNumber = [];
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
}

//lets define all the function logic below

//this will actually create the password
//here we want to generate a character from a random number, and add to the password
//and repeat that until it reaches the password length requested by user
function generatePassword(){
  var alphaNumberic = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var numeric = "0123456789";
  //TODO: figure out how to add " and ' into the string below
  var specials = " !#$%&()*+,-./:;<=>?@[\]^_`{|}~";
  var lower = alphaNumberic.toLowerCase();
  const upperCase = alphaNumberic.split("");
  const lowerCase = lower.split(""); 
  const specialChar = specials.split("");
  const mathChars = [upperCase.length,  lowerCase.length, specialChar.length]; 
  randomNumberGen(0, mathChars);

  //sets some variables to blank at the end so when this function executes again
  //they don't include the previous result
  randomNumber = [];
}
//random number generator
//will pick a number between 0 and the length of each of the char arrays above
//will return a number for each of the possibly needed char groups
function randomNumberGen (min, max) {
  min = 0;
  console.log(min, max);
  //I got the following equation from w3schools and put it in a for loop
  //this should generate the number we need for each of the array groups above
  function numberCalc() {
    var tempNumber = 0;
    function randomMath() {
      tempNumber = Math.floor(Math.random() * (max[i] - min + 1) ) + min;
      return tempNumber;
    }
    for (i = 0; i < max.length; i++) {
      randomNumber.push(randomMath());
    };
    return randomNumber;
  }
  numberCalc();
  console.log(randomNumber);
  return randomNumber;
}


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
