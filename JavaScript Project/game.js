//this file's game code will read arrow key as input
//key 'npm run startgame' in terminal to start the game

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
  }

  print() {
    const displayString = this._field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(displayString);
    console.log("Please input an arrow key:");
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
}

const myField = new field();
myField.generateField(0.3);
myField.runGame();
myField.print();

const handleArrow = () => {
  let playing = true;
  var stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.on("data", function (key) {
    if (key == "\u001B\u005B\u0041") {
      // UP
      if (character.y > 0) {
        character.y--;
      } else {
        console.log("Out of bounds!");
        playing = false;
      }
    }
    if (key == "\u001B\u005B\u0043") {
      // RIGHT
      if (character.x < colNum - 1) {
        character.x++;
      } else {
        console.log("Out of bounds!");
        playing = false;
      }
    }
    if (key == "\u001B\u005B\u0042") {
      // DOWN
      if (character.y < rowNum - 1) {
        character.y++;
      } else {
        console.log("Out of bounds!");
        playing = false;
      }
    }
    if (key == "\u001B\u005B\u0044") {
      // LEFT
      if (character.x > 0) {
        character.x--;
      } else {
        console.log("Out of bounds!");
        playing = false;
      }
    }

    playing &= myField.moveCharacter();

    //will exit if playing = false or when ctrl c is keyed in
    if (key == "\u0003" || playing == false) {
      process.exit();
    }
    myField.print();
  });
};

handleArrow();
