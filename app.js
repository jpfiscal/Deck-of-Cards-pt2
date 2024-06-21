const baseURL = "https://deckofcardsapi.com/api/deck/";
const btn = document.querySelector('#draw-btn');
const cardDiv = document.querySelector('#card-container');
let cardsLeft = 52;
const newDeck = axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res => {
        console.log(`${res.data.deck_id}`);
        deckID = res.data.deck_id;
    })
    .catch(err => {
        console.log(err);
    });

function drawCard(dID) {
    axios.get(`${baseURL}/${dID}/draw/?count=1`)
        .then(res=>{
            console.log(res);
            let drawnCard = document.createElement("img");
            drawnCard.src = res.data.cards[0].image;
            cardDiv.appendChild(drawnCard);
            cardsLeft = res.data.remaining;
            console.log(`Cards Left in Deck: ${cardsLeft}`)
            if (cardsLeft == 0){
                btn.style.display = "none";
            }
        }).catch(err => {
            console.log(err);
        })
}

btn.addEventListener('click', function(e){
    // e.preventDefault();
    drawCard(deckID);
})