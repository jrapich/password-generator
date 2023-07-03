 // Assignment code here
//lets declare all the things
var alphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var numbers = "0123456789";
var specials = "!#$%&()*+,-./:;<=>?@[\"']^_`{|}~";
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
var userPassLength = 0;
var password = "";
const userPasswordType = {
  isUpperCase: true,
  isLowerCase: true,
  isSpecialChars: true,
  isNumbers: true,
  isValid: true,
  typeCheck: function() {
    if (
      this.isLowerCase === null &&
      this.isUpperCase === null &&
      this.isSpecialChars === null &&
      this.isNumbers === null
    ) {
      this.isValid = false;
      return this.isValid;
    } else {
      return;
    }
  }
}

//lets define all the function logic below

//asks the user for password length between 8 and 128
function askForLength(){
  userPassLength = prompt("Choose a password length: \nIt must be a number between 8 - 128");
  if (!userPassLength) {
    alert("please choose a valid number");
    console.log(userPassLength);
    return userPassLength;
  }
  //this converts the users password length to a number as prompts return only strings
  userPassLength = parseInt(userPassLength, 10);
  if (userPassLength < minPassLength) {
      alert("you must choose a number between 8 and 128");
  } else if (userPassLength > maxPassLength) {
      alert("you must choose a number between 8 and 128");
  } else if (userPassLength > minPassLength && userPassLength < maxPassLength || userPassLength === minPassLength || userPassLength === maxPassLength) {
      return userPassLength;
  } else {
      alert("please choose a valid number");
  }
}

//asks for the char types in the password and saves it in passwordType object
function selectPassType(){
  userPasswordType.isLowerCase = prompt("Do you want to use lower case letters? \nPress OK for YES, or Cancel for NO. \nWhatever you type here doesn't influence the password.");
  userPasswordType.isUpperCase = prompt("Do you want to use upper case letters? \nPress OK for YES, or Cancel for NO. \nWhatever you type here doesn't influence the password.");
  userPasswordType.isSpecialChars = prompt("Do you want to use special characters? \nPress OK for YES, or Cancel for NO. \nWhatever you type here doesn't influence the password.");
  userPasswordType.isNumbers = prompt("Do you want to use numbers? \nPress OK for YES, or Cancel for NO. \nWhatever you type here doesn't influence the password.");
  userPasswordType.typeCheck();
  //console.log(userPasswordType);
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
      tempNumber = Math.floor(Math.random() * (max[i] - min + 1)) + min;
      return tempNumber;
    }
    for (i = 0; i < max.length; i++) {
      randomNumber.push(randomMath());
    };
    return randomNumber;
  }
  numberCalc();
  //console.log(" the random number array is " + randomNumber);
  return randomNumber;
}

//character picker based on random number, will pass one random char
function passHasher(num) {
  var charPicker = {
    type: ["upper", "lower", "special", "number"],
    pickedType: [],
    useUpper: true,
    useLower: true,
    useSpecial: true,
    useNumber: true
  }
  //set the charpicker to match what the user chose
  if (userPasswordType.isLowerCase === null) {
    charPicker.useUpper = false;
  } if (userPasswordType.isUpperCase === null) {
    charPicker.useLower = false;
  } if (userPasswordType.isSpecialChars === null) {
    charPicker.useSpecial = false;
  } if (userPasswordType.isNumbers === null) {
    charPicker.useNumber = false;
  }
  //add only the users choices to the group of chars
  function userPickedChar() {
    if (charPicker.useUpper) {
      charPicker.pickedType.push("upper");
    }
    if (charPicker.useLower) {
      charPicker.pickedType.push("lower");
    }
    if (charPicker.useSpecial) {
      charPicker.pickedType.push("special");
    }
    if (charPicker.useNumber) {
      charPicker.pickedType.push("number")
    }
  }
  userPickedChar();
  //generate a char based on  generated random number and users choice
  charPicker.pickedType = charPicker.pickedType[Math.floor(Math.random() * charPicker.pickedType.length)];
  if (charPicker.pickedType === "upper") {
      singleChar = upperCase[randomNumber[0]];
      //console.log("random number picked for char group is: " + randomNumber[0]);
    }
    if (charPicker.pickedType === "lower") {
      singleChar = lowerCase[randomNumber[1]];
      //console.log("random number picked for char group is: " + randomNumber[1]);
    } 
    if (charPicker.pickedType === "special") {
      singleChar = specialChar[randomNumber[2]];
      //console.log("random number picked for char group is: " + randomNumber[2]);
    } 
    if (charPicker.pickedType === "number") {
      singleChar = numeric[randomNumber[3]];
      //console.log("random number picked for char group is: " + randomNumber[3]);
    }
    //console.log("char group picked is: " + charPicker.pickedType);
    //console.log("random char generated is: " + singleChar);

  //resetting the random number array here or else the array gets insanely big when i try to loop it
  randomNumber = [];
  return singleChar;
}
    
//add a character to the password based on the above random character selected
function passMake(char) {
  password = password + char;
  return password;
}

//this below using all the above functions and  will actually create the password;
//here we want to generate a character from a random number, and add to the password
//and repeat that until it reaches the password length requested by user;
//password must be a certain length, and user must pick at least one character group;
//will throw errors otherwise
function generatePassword(){
  password ="";
  askForLength();
    if (!userPassLength) {
      password = "ERROR: please pick a valid length.";
    return password;
  } else if (userPassLength < minPassLength) {
      password = "ERROR: " + userPassLength + " is too small, please pick a valid length.";
      return password;
  } else if (userPassLength > maxPassLength) {
      password = `ERROR: ${userPassLength} is too big, please pick a valid length.`;
      return password;
  } else { 
      selectPassType();
      if (!userPasswordType.isValid) {
        password = "ERROR: you must choose at least one character type."
        return password;
      } else {
          console.log("begin password generation. password length selected: " + userPassLength);
          for (j = 0; j < userPassLength; j++) {
            passMake(passHasher(randomNumberGen(0, mathChars)));
          }
          console.log("generated password is " + password);
          console.log("the password length is " + password.length);
          return password;
        }
  }
}

//most of this below is what was in the original source

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input when user clicks button
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;

  //sets some arrays/vars to blank at the end
  //so when the user clicks the button and this generator executes again
  //they don't include the previous result
  //TODO: test to see if this is indeed resetting them like I think it is
  randomNumber = [];
  tempNumber = 0;
  singleChar = "";
  password = "";
  return {
    randomNumber,
    tempNumber,
    singleChar,
    password
  } 
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);