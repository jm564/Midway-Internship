function convertTimeFromForm(form){
    let hours = form.hoursNumber.value;
    let minutes = form.minutesNumber.value;
    //converts input strings to rounded integers
    let parseHours = parseInt(hours);
    let parseMinutes = parseInt(minutes);
    if(parseMinutes < 60 && parseMinutes > -1 && parseHours < 13 && parseHours > 0)//checks that numbers are in the correct range
    {
        form.txtResult.value = " " + convertTimeToWords(parseHours, parseMinutes);
    }
    else //sends an error message if numbers are invalid
    {
        form.txtResult.value = "Invalid input. Input must be in 12-hour clock format."
    }
}



function convertTimeToWords(hours, minutes){

    let temp = 60 - minutes;

    //output variable
    let output = "";

    //add o'clock when there are no minutes
    if(minutes === 0){
       output = `${convertNum(hours)} o' clock`;
        return output;
    }

    //add half past when its half past an hour
    else if(temp === 30){
        output = `half past ${convertNum(hours)}`;
        return output;
    }

    //if minutes are less than 30 use minutes + past + hours
    if(temp > 30){
        //get minutes in words and add it to the output first
        output = convertNum(minutes);

        //if minutes isn't 15 add "minute"
        if(minutes !== 15){
            output += " minute";
        }

        //if minutes isn't 1 or 15 add "s"
        if(minutes !== 1 && minutes !== 15){
            output += "s";
        }

        //convert and add the hours last
        output += ` past ${convertNum(hours)}`;

        //return output
        return output;

    }
    //if minutes are greater than 30 use temp + to + hours
    else if(temp < 30){
        //get temp in words and add it to the output first
        output = convertNum(temp);

        //if minutes isn't 15 add "minute"
        if(temp !== 15){
            output += " minute";
        }

        //if minutes isn't 1 or 15 add "s"
        if(temp !== 1 && temp !== 15){
            output += "s";
        }

        //add one to the hours so the correct hour is displayed
        hours++;

        //if hours reach 12 next num is 1
        if(hours === 13)
        {
            hours = 1;
        }

        //convert and add the hours last
        output += ` to ${convertNum(hours)}`;

        //return output
        return output;
    }
}



function convertNum(number){
    //array to store numbers as words
    const numbers = ['twenty', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'quarter', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

    //return value
    let  returnValue = '';

    //words are indexed by value up to 19 return the number
    if(number < 20) {
        return numbers[number];
    }
    else {
        //remove 20 from input number so index is correct
        number -= 20;

        //add "twenty" to return value
        returnValue += numbers[0];

        //add a "-" and the number if it isn't zero
        if(number > 0){
            returnValue += `-${numbers[number]}`;
        }

        //return the return value
        return returnValue;
    }
}



function generateTestCases() {
    //get body to append to later
    const insertLocation = document.getElementById("test-container");

    //create a table and table body
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    //create array of test cases to print to the page pulled these from teh csv
    let testCases = [
        createNewTestCase(5,47),
        createNewTestCase(3, '00'),
        createNewTestCase(7,29),
        createNewTestCase(5,30),
        createNewTestCase(5,45),
        createNewTestCase(4,15),
        createNewTestCase(6,35),
        createNewTestCase(3,30),
        createNewTestCase(10,57),
        createNewTestCase(1,'01'),
        createNewTestCase(7,15),
        createNewTestCase(12,45)
    ]

    //cycle through all the test cases
    for (var i = 0; i < testCases.length; i++) {
        //create a new row each iteration
        let row = document.createElement("tr");

        //hours column of table
            //create new cell
            let cell = document.createElement("td");

            //pull hours from array
            let hours = testCases[i].hours;

            //put hours into the cell
            let cellText = document.createTextNode(`${hours}:`);
            cell.appendChild(cellText);

            //align text to the right so it displays correctly
            cell.setAttribute('style', 'text-align:right');

            //add cell to row
            row.appendChild(cell);

        //minutes column of table
            cell = document.createElement("td");
            let minutes = testCases[i].minutes;
            cellText = document.createTextNode(`${minutes}`);
            cell.appendChild(cellText);
            row.appendChild(cell);

        //output column of table
            cell = document.createElement("td");
            let output = testCases[i].output;
            cellText = document.createTextNode(`${output}`);
            cell.appendChild(cellText);

            //center makes the display of text look cleaner
            cell.setAttribute('style', 'text-align:center');
            row.appendChild(cell);

        //add finished row to table body
        tblBody.appendChild(row);
    }

    //add table body to table
    tbl.appendChild(tblBody);

    //add table to body
    insertLocation.appendChild(tbl);

    //set a border for basic styling
    tbl.setAttribute("border", "1");

    //disable testCaseButton so that test cases only display once
    const testCaseButton = document.getElementById('test-case-button');
    testCaseButton.setAttribute('disabled', '');
}

//just made to store hours/minutes/output
function createNewTestCase(hoursTest, minutesTest){
    const testCase = {
        hours: `${hoursTest}`,
        minutes: `${minutesTest}`,
        output: convertTimeToWords(parseInt(hoursTest), parseInt(minutesTest))
    };
    return testCase;
}
