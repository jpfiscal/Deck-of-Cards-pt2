const baseURL = "https://deckofcardsapi.com/api/deck/";
const btn = document.querySelector('#draw-btn');
const cardDiv = document.querySelector('#card-container');
let deckID = ""
let cardsLeft = 52;

async function drawCard(dID){
    let res
    try{
        res = await axios.get(`${baseURL}/${dID}/draw/?count=1`);
    } catch (e){
        console.log("Error occurred while attempting to draw a card.");
    }
    printDrawnCard(res);
}
function printDrawnCard(res){
    let drawnCard = document.createElement("img");
    drawnCard.src = res.data.cards[0].image;
    cardDiv.appendChild(drawnCard);
    cardsLeft = res.data.remaining;
    if (cardsLeft == 0){
        btn.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", async function(){
    let url = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    let deck = await axios.get(url);
    deckID = deck.data.deck_id;
});

btn.addEventListener('click', function(e){
    drawCard(deckID);
})