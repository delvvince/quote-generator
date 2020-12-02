// Define Constants of Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

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

// Get Quote from API
async function getQuoteFromAPI() {
    showLoadingSpinner();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
//  const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    const apiUrl = 'http://quotes.stormconsultancy.co.uk/random.json';
    // TRUMP QUOTES
    // const apiUrl = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // console.log(data);
        // If Author is blank, fill with 'Unknown Author'
        if (data.author === '') {
            authorText.innerText = 'Unknown Author';
        } else {
            authorText.innerText = data.author;
        }
        // Reduce font size for long quotes
        if (data.quote.length > 77) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quote;
        // Stop the Loader, Show quote
        removeLoadingSpinner();
        // TESTING RECURSIVE CODE AS WITH INFINITE LOOP
        //throw new Error('oops')
    } catch (error) {
        //console.log(error);
        //getQuoteFromAPI();
    }
}

// Tweet Quote and prepopulate tweet content
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuoteFromAPI);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuoteFromAPI();
