//lets declare all the things
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = upperCase.toLowerCase();
const specialChar = "!#$%&()*+,-./:;<=>?@[\"']^_`{|}~";
const numeric = "0123456789";
const minPassLength = 8;
const maxPassLength = 128;
const userPasswordType = {
  isUpperCase: false,
  isLowerCase: false,
  isSpecialChars: false,
  isNumbers: false,
  isValid: false,
  typeCheck: function () {
    if (
      this.isLowerCase === null &&
      this.isUpperCase === null &&
      this.isSpecialChars === null &&
      this.isNumbers === null
    ) {
      return this.isValid;
    } else {
      this.isValid = true;
      return this.isValid;
    }
  },
};

//random number generator, picks a number between min and max(inclusive)
//will use this to return a number to randomly pick a number between given values, or wherever we will need a random number
function randomIndex(min, max) {
  //max will be an array length. if array length is 1, return 0
  if (max === 1) {
    return 0;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//asks the user for password length between 8 and 128
function askForLength() {
  let userPassLength = prompt(
    "Choose a password length: \nIt must be a number between 8 - 128"
  );
  if (!userPassLength) {
    alert("please choose a valid number");
    return userPassLength;
  }
  //this converts the users password length to a number as prompts return only strings
  userPassLength = parseInt(userPassLength, 10);
  if (userPassLength < minPassLength || userPassLength > maxPassLength) {
    alert("you must choose a number between 8 and 128");
  } else if (
    (userPassLength > minPassLength && userPassLength < maxPassLength) ||
    userPassLength === minPassLength ||
    userPassLength === maxPassLength
  ) {
    return userPassLength;
  } else {
    alert("please choose a valid number");
  }
}

//asks for the char types in the password and saves it in passwordType object
function selectPassType() {
  userPasswordType.isLowerCase = prompt(
    "Do you want to use lower case letters? \nPress OK for YES, or Cancel for NO. \nWhatever you type here doesn't influence the password."
  );
  userPasswordType.isLowerCase === ""
    ? (userPasswordType.isLowerCase = true)
    : null;
  userPasswordType.isUpperCase = prompt(
    "Do you want to use upper case letters? \nPress OK for YES, or Cancel for NO. \nWhatever you type here doesn't influence the password."
  );
  userPasswordType.isUpperCase === ""
    ? (userPasswordType.isUpperCase = true)
    : null;
  userPasswordType.isSpecialChars = prompt(
    "Do you want to use special characters? \nPress OK for YES, or Cancel for NO. \nWhatever you type here doesn't influence the password."
  );
  userPasswordType.isSpecialChars === ""
    ? (userPasswordType.isSpecialChars = true)
    : null;
  userPasswordType.isNumbers = prompt(
    "Do you want to use numbers? \nPress OK for YES, or Cancel for NO. \nWhatever you type here doesn't influence the password."
  );
  userPasswordType.isNumbers === ""
    ? (userPasswordType.isNumbers = true)
    : null;
  userPasswordType.typeCheck();
}

//character picker based on random number, adds that character to password so far
function passHasher(userPasswordType, password) {
  let charSet = "";
  userPasswordType.isUpperCase ? (charSet = charSet.concat(upperCase)) : null;
  userPasswordType.isLowerCase ? (charSet = charSet.concat(lowerCase)) : null;
  userPasswordType.isSpecialChars ? (charSet = charSet.concat(specialChar)) : null;
  userPasswordType.isNumbers ? (charSet = charSet.concat(numeric)) : null;
  charSet = charSet.split("");
  const finalChar = charSet[randomIndex(1, charSet.length) - 1];
  return password + finalChar;
}

//this below using all the above functions and  will actually create the password;
//here we want to generate a character from a random number, and add to the password
//and repeat that until it reaches the password length requested by user;
//password must be a certain length, and user must pick at least one character group;
//will throw errors otherwise
function generatePassword() {
  let password = "";
  const userPassLength = askForLength();
  if (!userPassLength) {
    password = "ERROR: please pick a valid length.";
    return password;
  } else if (userPassLength < minPassLength) {
    password =
      "ERROR: " + userPassLength + " is too small, please pick a valid length.";
    return password;
  } else if (userPassLength > maxPassLength) {
    password = `ERROR: ${userPassLength} is too big, please pick a valid length.`;
    return password;
  } else {
    selectPassType();
    if (!userPasswordType.isValid) {
      password = "ERROR: you must choose at least one character type.";
      return password;
    } else {
      console.log(
        "begin password generation. password length selected: " + userPassLength
      );
      for (j = 0; j < userPassLength; j++) {
        password = passHasher(userPasswordType, password);
      }
      console.log("generated password is " + password);
      console.log("the password length is " + password.length);
      return password;
    }
  }
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input when user clicks button
function writePassword() {
  document.querySelector("#password").value = generatePassword();
  return;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
