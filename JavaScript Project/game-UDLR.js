//this game code runs prompt and asks for input "U, D, L, R"
//key 'npm run startgameudlr' in terminal to start the game
const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const rowNum = 10,
  colNum = 10;

//set the character location object
const character = {
  x: 0,
  y: 0,
};

class field {
  constructor() {
    this._field = Array(rowNum)
      .fill()
      .map(() => Array(colNum));
  }

  generateField(percentage) {
    for (let y = 0; y < rowNum; y++) {
      for (let x = 0; x < colNum; x++) {
        const prob = Math.random();
        this._field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }
    //set the hat location: object
    const hatLocation = {
      x: Math.floor(Math.random() * colNum),
      y: Math.floor(Math.random() * rowNum),
    };

    //make sure the hat is not at the starting point
    while (hatLocation.x == 0 && hatLocation.y == 0) {
      hatLocation.x = Math.floor(Math.random() * colNum);
      hatLocation.y = Math.floor(Math.random() * rowNum);
    }

    this._field[hatLocation.y][hatLocation.x] = hat;

    //set the "home" position before the game starts
    this._field[character.x][character.y] = pathCharacter;
  }

  runGame() {
    console.log("Start Game");
    let playing = true;
    while (playing == true) {
      //print the field
      this.print();
      //if one of the conditions is false, playing will = false (&= will multiply, |= will add)
      playing &= this.askQuestion();
      playing &= this.moveCharacter();
    }
  }

  print() {
    const displayString = this._field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(displayString);
  }

  moveCharacter() {
    if (this._field[character.y][character.x] === hole) {
      console.log("You have fallen into a hole and died!");
      return false;
    } else if (this._field[character.y][character.x] === hat) {
      console.log("You have found the hat and won!");
      return false;
    } else {
      this._field[character.y][character.x] = pathCharacter;
    }
    return true;
  }

  askQuestion() {
    const direction = prompt("Which way? ").toUpperCase();
    switch (direction) {
      //implement your codes here
      //check if location is U, D, L, R
      //check for boundaries
      //check if character falls into a hole - game over
      //check if character gets the hat - game win
      case "U":
        if (character.y > 0) {
          character.y--;
          return true;
        } else {
          console.log("Out of bounds!");
        }
        break;
      case "D":
        if (character.y < rowNum - 1) {
          character.y++;
          return true;
        } else {
          console.log("Out of bounds!");
        }
        break;
      case "L":
        if (character.x > 0) {
          character.x--;
          return true;
        } else {
          console.log("Out of bounds!");
        }
        break;
      case "R":
        if (character.x < colNum - 1) {
          character.x++;
          return true;
        } else {
          console.log("Out of bounds!");
        }
        break;
    }
    return false;
  }
}

const myField = new field();
myField.generateField(0.3);
myField.runGame();
