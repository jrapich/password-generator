 // Assignment code here
//lets declare all the things
var alphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
//TODO: figure out how to add " and ' into the string below without it messing up
var specials = "!#$%&()*+,-./:;<=>?@[\]^_`{|}~";
var lower = alphaNumeric.toLowerCase();
const upperCase = alphaNumeric.split("");
const lowerCase = lower.split(""); 
const specialChar = specials.split("");
const numeric = numbers.split("");
const mathChars = [upperCase.length -1,  lowerCase.length -1, specialChar.length - 1, numeric.length -1];
var randomNumber = [];
var tempNumber = 0;
var singleChar = "";
const minPassLength = 8;
const maxPassLength = 128;
var userPassLength = 24;


//lets define all the function logic below

//this will actually create the password
//here we want to generate a character from a random number, and add to the password
//and repeat that until it reaches the password length requested by user
function generatePassword(){ 
  passMake(passHasher(randomNumberGen(0, mathChars)));
  return password;
}
//random number generator
//will pick a number between 0 and the length of each of the char arrays above
//will return a number for each of the possibly needed char groups
function randomNumberGen (min, max) {
  min = 0;
  //I got the following equation from w3schools and put it in a for loop
  //this should generate the number we need for each of the array groups above
  function numberCalc() {
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
  console.log(" the random number array is " + randomNumber);
  return randomNumber;
}
//character picker based on random number, will pass one random char
function passHasher(num) {
  var charPicker = ["upper", "lower", "special", "number"];
  charPicker = charPicker[Math.floor(Math.random() * charPicker.length)];
  tempNumber = Math.floor(Math.random() * num.length);
  tempNumber = randomNumber[tempNumber];
  if (charPicker === "upper") {
    singleChar = upperCase[randomNumber[0]];
    console.log("random number picked for char group is: " + randomNumber[0]);
  } 
  if (charPicker === "lower") {
    singleChar = lowerCase[randomNumber[1]];
    console.log("random number picked for char group is: " + randomNumber[1]);
  }
  if (charPicker === "special") {
    singleChar = specialChar[randomNumber[2]];
    console.log("random number picked for char group is: " + randomNumber[2]);
  }
  if (charPicker === "number") {
    singleChar = numeric[randomNumber[3]];
    console.log("random number picked for char group is: " + randomNumber[3]);
  }
  console.log("char group picked is: " + charPicker);
  console.log("random char generated is: " + singleChar);
  return singleChar;
}
//create a password based on the above random character
//password will have min length of 8 and max of 128
function passMake(char) {
  password = password + char;
  return password;
}


//most of this below is what was in the original source


// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

   //sets some arrays/vars to blank at the end
  //so when the user clicks the button and this generator executes again
  //they don't include the previous result
  randomNumber = [];
  tempNumber = 0;
  singleChar = "";
  password = ""; 
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
