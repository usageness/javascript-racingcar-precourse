import Car from "./Car.js";
import isMovable from "../utils/isMovable.js";
import makeResultElement from "../utils/makeResultElement.js";
import isValidate from "../utils/isValidate.js";

class CarList {
    constructor() {
        this.array = [];
    }

    push(item) {
        this.array.push(item);
    }

    init(carNameArray) {
        for(let i = 0; i<carNameArray.length; i++) {
            if(isValidate("name", carNameArray[i])) {
                this.push(new Car(carNameArray[i]));
            }
            else {
                this.array = [];
                alert("잘못된 이름입니다.");
                return;
            }
        }
    }

    race() {
        for(let i = 0; i<this.array.length; i++) {
            this.move(i);
        }
        this.displayResult();
    }

    move(index) {
        if(isMovable()) {
            this.array[index].moveForward();
        }
    }

    game(racingCountInput) {
        makeResultElement();
        for(let i = 0; i<racingCountInput; i++) {
            this.race();
        }
        this.displayWinner();
    }

    displayResult() {
        const racingResults = document.getElementById("racing-results");
        let resultText = "";
        for(let i = 0; i<this.array.length; i++) {
            resultText += `\n${this.array[i].getName()}: ${this.array[i].displayDistance()}`;
        }

        racingResults.innerText += `${resultText}\n\n`;
    }

    displayWinner() {
        const racingWinners = document.getElementById("racing-winners");
        const winnerArray = this.getWinnerArray();
        let resultString = "";

        if(winnerArray.length > 1) {
            resultString = this.makeResultString(winnerArray);
        }
        else {
            resultString = winnerArray.toString();
        }

        racingWinners.innerText += resultString;
    }

    getWinnerArray() {
        let winnerArray = [];
        let maxDistance = 0;

        for(let i = 0; i<this.array.length; i++) {
            if(this.array[i].getDistance() > maxDistance) {
                winnerArray = [this.array[i].getName()];
                maxDistance = this.array[i].getDistance();
            }
            else if(this.array[i].getDistance() === maxDistance) {
                winnerArray.push(this.array[i].getName());
            }
        }

        return winnerArray;
    }

    makeResultString(winnerArray) {
        let winnerResult = "";

        for(let i = 0; i<winnerArray.length; i++) {
            if(i === 0) {
                winnerResult += winnerArray[i];
            }
            else {
                winnerResult += `, ${winnerArray[i]}`;
            }
        }

        return winnerResult;
    }
}

export default CarList;
