import { fifaData } from './fifa.js';
console.log(fifaData);

console.log('its working');
// ⚽️ M  V P ⚽️ //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data*/

const accessData = fifaData.filter((item)=>{
    return item.Year === 2014 && item.Stage === "Final";
})

/*(a) Home Team name for 2014 world cup final*** year = 2014 & stage = final****/
console.log(accessData[0]);
console.log(`${accessData[0]["Home Team Name"]}${" is the Home Team of the 2014 World Cup Final"}`);

/*(b) Away Team name for 2014 world cup final*/
console.log(`${accessData[0]["Away Team Name"]}${" is the Away Team of the 2014 World Cup Final"}`);

/*(c) Home Team goals for 2014 world cup final*/
console.log(`${accessData[0]["Home Team Name"]}${" made "}${accessData[0]["Home Team Goals"]}${" goal(s) in the 2014 World Cup Finals"}`);

/*(d) Away Team goals for 2014 world cup final*/
console.log(`${accessData[0]["Away Team Name"]}${" made "}${accessData[0]["Away Team Goals"]}${" goal(s) in the 2014 World Cup Finals"}`);

/*(e) Winner of 2014 world cup final */
console.log(`${"At the end of the 2014 World Cup Finals "}${accessData[0]["Win conditions"]}`);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Task 2: 
Instructions- Create a function called  getFinals that takes `data` as an argument 
               and returns an array of objects with only finals data */

let getFinals = fifaData.filter ((data) =>{
    return data.Stage === "Final"
})
console.log(getFinals);


/* Web 36: Solved Like:

  function getFinals(data) {
	const allFinals = data.filter(function(item){
		return item.Stage === 'Final';
	});
	return allFinals;
}

console.log(getFinals(fifaData)); */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Task 3: 
Instructions- 1.Implement a higher-order function called `getYears` (Below)
              2.that accepts the callback function `getFinals` (Above in Task 2).... getFinals.map
              3.and returns an array called `years` ..... let years = ^^^
              ***containing all of the years in the dataset (Create empty array OR .map bc it creates an array)*/ 

function getYears(data, years) {
	return years.map(function(item){
		return item.Year;
	})
};

console.log(getYears(fifaData, getFinals));

/* Web 36: Solved Like:

function getYears(data, getFinalsCB) {
	return getFinalsCB(data).map(function(item) {
		return item.Year;
	}
};

console.log(getYears(fifaData, getFinals)); */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Task 4: 
Instructions: 1. Implement a higher-order function called `getWinners` (Below) ✔
              2. that accepts the callback function `getFinals()` (Function from task 2- looping thru this function) ✔
              3. and determine the winner (home or away) of each `finals` game. (.forEach)
              4. Return the name of all winning countries in an array called `winners` (create a new array, .push)

Guided Practice Notes:
let string=" ";
function howBigTall(hero, ind){
	string += `${hero.name} has an index position of ${ind}, weighs ${hero.weight} lbs, and is ${hero.height} inches tall /n`;   
}
heroData.forEach(howBigTall);
console.log(string);

OR

heroData.forEach(function(hero, ind){
	console.log("Hero at index # + ind + " - Name: " + hero.name + " | weapon " + hero.weapon);
})
*/ 

function getWinners(item, task2) {

let winners = [];

    task2.forEach((item)=>{
        if(item['Home Team Goals'] > item['Away Team Goals']){
            return winners.unshift(item['Home Team Name']);
        }else if(item['Away Team Goals'] > item['Home Team Goals']){
            return winners.push(item['Away Team Name']);
        }else{
            return winners.push(item['Win conditions']);
        }
    })
    return winners;
};

console.log(getWinners(fifaData, getFinals));

/* Web 36: Solved Like:

function getWinners(data, getFinalsCB) {
	let winners = [];
	
	getFinalsCB.forEach(function(item){
		if(item['Home Team Goals'] > item['Away Team Goals']) {
			item['Home Team Name'];
		} else if(item['Away Team Goals'] > item['Home Team Goals']){
			winners.push(item['Away Team Name']);
		}else if(item['Home Team Goals'] === item['Away Team Goals']){
			winners.push(item['Win conditions']);
		}
	});
	return winners;
}

console.log (getWinners(fifaData, getFinals)); */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Task 5: 
Instructions: 1. Implement a higher-order function called `getWinnersByYear` 
              2. that accepts the following parameters 
              3. and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(winnersCB, yearsCB) {
	let winners = winnersCB(fifaData, getFinals);
    let years = yearsCB(fifaData, getFinals);
    
	let yearlyWinners = [];  // Pushing to an empty array
	
	winners.forEach(function(country, index){
		yearlyWinners.push(`In ${years[index]}, ${country} won the world cup!`)
	})
	return yearlyWinners;
};

console.log(getWinnersByYear(getWinners, getYears));

/* Web 36: Solved Like:

function getWinnersByYear (getWinnersCB, getYearsCB) {
	let winners = getWinnersCB(fifaData, getFinals);
		console.log(winners);
	let years = getYearsCB(fifaData, getFinals);
	let yearlyWinners = [];
	
	winners.forEach(function(item, index){
		yearlyWinners.push(`in ${years[index]}, ${item} won the world cup!`)
	})
	console.log(winners)
	return yearlyWinners;
};

Console.log(getWinnersByYear(getWinners, getYears)); */

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Task 6: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */


/* Web 36: Solved Like:*/

function getAverageGoals(data) {
	const averageHomeGoals = data.reduce(function(acc, item) {
		return acc + item['Home Team Goals'];
	},0)
	const averageAwayGoals = data.reduce(function(acc, item) {
		return acc + item['Away Team Goals'];
	},0)
	
	return `Home Team Average: ${averageHomeGoals / data.length}, Away Team Average: ${averageAwayGoals / data.length}`;
};

console.log(getAverageGoals(fifaData)); 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// STRETCH 🥅 //

/* Stretch 1: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(/* code here */) {

    /* code here */

};

getCountryWins();


/* Stretch 3: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* Stretch 4: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
