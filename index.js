#! /usr/bin/env node
import inquirer from "inquirer";
import { faker } from '@faker-js/faker';
const createUser = () => {
    let users = [];
    for (let i = 0; i < 5; i++) {
        let user = {
            id: i,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(10000000000 * Math.random() * 90000000000),
            balance: 1000000 * i
        };
        users.push(user);
    }
    return users;
};
// ATM Machine
const atmMachine = async (users) => {
    const response = await inquirer.prompt({
        type: "number",
        message: "write your pin code",
        name: "pin"
    });
    const user = users.find(val => val.pin === response.pin);
    if (user) {
        console.log(`Welcome ${user.name}`);
        atmFunc(user);
        return;
    }
    else {
        console.log("Invalid user pin");
    }
};
// ATM Function
const atmFunc = async (user) => {
    const answer = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Select one of the button to perform operation",
        choices: ["Withdraw", "Balance", "Deposit", "Exit"]
    });
    if (answer.select === "Withdraw") {
        const amount = await inquirer.prompt({
            type: "number",
            message: "Enter amount.",
            name: "rupee"
        });
        if (amount.rupee > user.balance)
            return console.log("Insufficient Balance");
        if (amount.rupee > 25000) {
            return console.log("You can not withdraw amount more than 25000.");
        }
        console.log(`Withdraw amount: ${amount.rupee}`);
        console.log(`Balance: ${user.balance - amount.rupee}`);
    }
    if (answer.select === "Balance") {
        console.log(`Balance: ${user.balance}`);
    }
    if (answer.select === "Deposit") {
        const deposit = await inquirer.prompt({
            type: "number",
            message: "Enter amount you want to deposit",
            name: "rupee"
        });
        console.log(`Deposit Amount: ${deposit.rupee}`);
        console.log(`Total Balance:  ${user.balance + deposit.rupee}`);
    }
    if (answer.select === "Exit") {
        console.log("Thankyou for using ATM");
    }
};
const users = createUser();
atmMachine(users);
