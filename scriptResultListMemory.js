function getPlayersFromLocalStorage() {
  let resultList = []
  if (localStorage.getItem("Resultat")) {
    resultList = JSON.parse(localStorage.getItem("Resultat"))
    return resultList
  } else {
    return resultList
  }
}

let resultLists = getPlayersFromLocalStorage()
showPlayers(resultLists)

function showPlayers(results) {

  for (let i = 0; i < results.length; i++) {
    let playerTr = document.createElement("tr")
    let playDate = document.createElement("td")
    let playerName = document.createElement("td")
    let playerTry = document.createElement("td")

    playDate.textContent = results[i].datum
    playerName.textContent = results[i].spelare
    playerTry.textContent = results[i].försök

    playerTr.appendChild(playDate)
    playerTr.appendChild(playerName)
    playerTr.appendChild(playerTry)

    document.querySelector(".table-group-divider").appendChild(playerTr)
  }
}

showDiagram ()

function showDiagram(){
  let averageResultList = calculateAverageAttempts(resultLists)
  
  console.log(averageResultList)
  
  let namesOfPlayers = []
  let averageResults = []
  
  for (let i = 0; i < averageResultList.length; i++) {
    namesOfPlayers.push(averageResultList[i].spelare)
    averageResults.push(averageResultList[i].genomsnittligaFörsök)
  }
  
  const scorelistChart = document.getElementById("myChart")
  
  new Chart(scorelistChart, {
    type: "bar",
    data: {
      labels: namesOfPlayers,
      datasets: [
        {
          label: "Genomsnittliga försök per spelare",
          data: averageResults,
          backgroundColor: "rgb(255, 174, 201)",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  })
  
  }

function calculateAverageAttempts(results) {
  const playerStats = {}
  results.forEach((entry) => {
    const { spelare, försök } = entry
    if (!playerStats[spelare]) {
      playerStats[spelare] = { totalaFörsök: 0, count: 0 }
    }

    playerStats[spelare].totalaFörsök += försök
    playerStats[spelare].count += 1
  })

  const averages = Object.entries(playerStats).map(([spelare, stats]) => {
    return { spelare, genomsnittligaFörsök: stats.totalaFörsök / stats.count }
  })
  return averages
}


