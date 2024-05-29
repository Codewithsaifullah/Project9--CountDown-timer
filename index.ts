#!/usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

let res = await inquirer.prompt([
    {
        name: "ans",
        type: "input",
        message: "Please Enter the amount of Seconds:",
        validate: (input) => {
            const num = Number(input);
            if (isNaN(num)) {
                return "Please enter a valid number";
            } else if (num > 60) {
                return "Please enter a number less than or equal to 60";
            } else {
                return true;
            }
        }
    }
]);

let input = Number(res.ans);

function startTime(value:number) {
    const endTime = new Date().getTime() + value * 1000;

    const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const diffTime = Math.round((endTime - currentTime) / 1000);

        if (diffTime <= 0) {
            console.log("Your Countdown time is expired!");
            clearInterval(interval);
            process.exit();
        }

        let min = Math.floor(diffTime / 60);
        let second = diffTime % 60;
        console.log(`min: ${min.toString().padStart(2, "0")}, second: ${second.toString().padStart(2, "0")}`);
    }, 1000);
}

startTime(input);
