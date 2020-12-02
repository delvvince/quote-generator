// Define Constants of Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Show new quote
function newQuote() {
    showLoadingSpinner();   
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    
    // If Author is blank, fill with 'Unknown Author'
    if (quote.author === '' || !quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check Quote length and reduce font size for long quotes
    if (quote.text.length > 77) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set the Quote, Hide Loader
    quoteText.innerText = quote.text;
    removeLoadingSpinner();
}

// Get local Quotes from json
function getQuotesLocally() {
    // Pick a random quote from localQuotes array
    const localQuote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    //console.log(localQuote);
}
// Get Quotes from API
async function getQuotesFromAPI() {
    showLoadingSpinner();
    //  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const apiUrl = 'https://type.fit/api/quotes';
    // const apiUrl = 'http://quotes.stormconsultancy.co.uk/random.json';
    // TRUMP'S QUOTES
    // const apiUrl = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';
    // PROXY for CORS
    // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[12]);
        newQuote();
        // TESTING RECURSIVE CODE AS WITH INFINITE LOOP
        // throw new Error('oops')
    } catch (error) {
        // Catch Error Here
        // console.log(error);
        getQuoteLocally();
    }
}
// Tweet Quote and prepopulate tweet content
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} – ${author}`;
    window.open(twitterUrl, '_blank');
}
// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
// newQuoteBtn.addEventListener('click', getQuoteLocally);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotesFromAPI();
// getQuotesLocally();