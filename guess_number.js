var guessElement = document.getElementById('guess');
var responseElement = document.getElementById('response');
var numGuessesElement = document.getElementById('numGuesses');
var historyElement = document.getElementById('history');
var answer = Math.floor((Math.random() * 100) + 1);
var numGuesses = 0;
var guessHistory = [];

addEventListener("keydown", function(event)
{
  if ( event.keyCode === 13 ) // enter key
  {
    processInput();
  }
});

function getResponse(guess)
{
  var response;

  if ( guess == answer )
  {
    response = "<b>That's it!</b>";
  }
  else if (guess < answer)
  {
    response = "<b>Too low!</b> Try again.";
  }
  else // guess > answer
  {
    response = "<b>Too high!</b> Try again.";
  }

  return response;
}

function isInteger(number)
{
  return !isNaN(number) &&
         parseInt(Number(number)) == number && 
         !isNaN(parseInt(number, 10));
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function processInput()
{
  var guess = guessElement.value;
  guessElement.value = "";

  if ( !isInteger(guess) )
  {
    responseElement.style.color = "red";
    responseElement.innerHTML = "Please enter a whole number.";
  }
  else if ( guess < 1 || guess > 100 )
  {
    responseElement.style.color = "red";
    responseElement.innerHTML = "Please enter a whole number between 1 and 100.";
  }
  else
  {
    if ( guessHistory.indexOf(guess) === -1 ) // not already guessed
    {
      ++numGuesses;
      responseElement.style.color = "black";
      responseElement.innerHTML = getResponse(guess);
      numGuessesElement.innerHTML = "# Guesses: " + numGuesses;
      historyElement.innerHTML += " " + guess;
      guessHistory.push(guess);
      
      if ( guess == answer )
      {
          await sleep(5000);
          numGuesses = 0;
          responseElement.innerHTML = "Enter your first guess.";
          numGuessesElement.innerHTML = "# Guesses: " + numGuesses;
          historyElement.innerHTML = "History:";
          guessHistory = [];
      }
    }
    else
    {
      responseElement.innerHTML = "<b>You already guessed that!</b> Try again.";
    }
  }
}
