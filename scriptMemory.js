//----------------------------------------------Memory---------------------------------------------------------
initiateBoard()

document
  .getElementById("btnStartNewGame")
  .addEventListener("click", initiateBoard)


function initiateBoard() {
  fetch("https://cataas.com/api/cats?limit=10&skip=0") 
    .then((response) => response.json())
    .then((result) => {
      const cards = result.map((cat) => ({
        src: `https://cataas.com/cat/${cat._id}`, 
        id: cat._id,
      }))

      let cardsList = []

      for (let i = 0; i < cards.length; i++) {
        cardsList.push(cards[i])
        cardsList.push(cards[i])
      }

      cardsList.sort(() => 0.5 - Math.random())

      const gameSection = document.querySelector("#gameSection")
      const attemptsHolder = document.querySelector(".attemptsHolder")
      const foundHolder = document.querySelector(".foundHolder")

      gameSection.innerHTML= ""

      const cardsInGame = 10
      let attempts = 0
      let foundCards = 0
      attemptsHolder.textContent = attempts
      foundHolder.textContent = foundCards

      let chosenCards = []
      let chosenCardsIds = []
      
      
      for (let i = 0; i < cardsList.length; i++) {
        let card = document.createElement("img")
        card.setAttribute("src", "images/placeholder.png")
        card.setAttribute("card-id", i)
        gameSection.appendChild(card)

        card.addEventListener("click", flipCard)
      }

      function flipCard() {
        if (chosenCards.length !== 2) {
          let cardId = this.getAttribute("card-id")
          if (this.getAttribute("src") != cardsList[cardId].src) {
            chosenCards.push(cardsList[cardId].id)
            chosenCardsIds.push(cardId)
            this.setAttribute("src", cardsList[cardId].src)
            if (chosenCards.length === 2) {
              setTimeout(checkForMatch, 800)
            }
          }
        }
      }

      function checkForMatch() {
        attempts++
        let cards = document.querySelectorAll("img")
        let firstCard = chosenCardsIds[0]
        let secondCard = chosenCardsIds[1]
        if (chosenCards[0] === chosenCards[1]) {
          foundCards++
        } else {
          cards[firstCard].setAttribute("src", "images/placeholder.png")
          cards[secondCard].setAttribute("src", "images/placeholder.png")
        }
        chosenCards = []
        chosenCardsIds = []
        attemptsHolder.textContent = attempts
        foundHolder.textContent = foundCards
        if (foundCards === cardsInGame) {
          openForm()
        }
      }

      function openForm() {
        document.getElementById("form-popup").style.display = "block"
        document.getElementById("btnAddPlayerData").addEventListener("click", addPlayerData)
        document.getElementById("btnCancelForm").addEventListener("click", closeForm)
      }

      function addPlayerData() {
        const playerName = document.getElementById("addPlayerName").value
        const playerAttempts = attempts

        const newPlayer = {
          datum: getTodaysDate(),
          spelare: playerName,
          försök: playerAttempts,
        }
        addPlayerToLocalStorage(newPlayer)

        console.log("Ny spelare tillagd i resultatlistan:" + newPlayer)
        closeForm()
      }

      function getTodaysDate() {
        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth() + 1
        var yyyy = today.getFullYear()

        if (dd < 10) {
          dd = "0" + dd
        }

        if (mm < 10) {
          mm = "0" + mm
        }

        today = dd + "/" + mm + "/" + yyyy

        return today
      }

      function addPlayerToLocalStorage(newPlayer) {
        let player = getPlayersFromLocalStorage()
        player.push(newPlayer)
        localStorage.setItem("Resultat", JSON.stringify(player))
      }

      function getPlayersFromLocalStorage() {
        let player = []
        if (localStorage.getItem("Resultat")) {
          player = JSON.parse(localStorage.getItem("Resultat"))
        }
        return player
      }

      function closeForm() {
        document.getElementById("form-popup").style.display = "none"
      }

    })
  }