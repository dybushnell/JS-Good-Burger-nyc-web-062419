document.addEventListener("DOMContentLoaded", () => {

  fetchBurgers()

})

const burgerMenu = document.getElementById("burger-menu")
const orderList = document.getElementById("order-list")
const customBurger = document.getElementById("custom-burger")
console.log(customBurger)





function fetchBurgers() {
  return fetch(`http://localhost:3000/burgers`)
    .then(resp => resp.json())
    .then(json => renderBurgers(json))
}

//DECLARE DATA-[THING]-ID IN ELEMENTS
//document.querySelector('h3[data-burger-name="1"]').innerText


function renderBurgers(burger) {
  burger.forEach(burgerInstance => {
    burgerMenu.insertAdjacentHTML("beforeend", `
              <div class = "burger" id="${burgerInstance.name}">
              <h3 class = "burger_title" data-burger-name='${burgerInstance.id}'> ${burgerInstance.name} </h3>
              <img src =${burgerInstance.image}>
              <p class = "burger_description">${burgerInstance.description}</p> 
              <button class = "button" data-button-id='${burgerInstance.id}'> Add to Order </button> 
              </div>
              `)
  })
}




burgerMenu.addEventListener("click", function (e) {
  if (e.target.className === "button") {
    let burgerId = e.target.dataset.buttonId
    fetch(`http://localhost:3000/burgers/${burgerId}`)
      .then(resp => resp.json())
      .then(burger => orderList.insertAdjacentHTML("beforeend",
        `<li>${burger.name}</li>`))

  }
})



// document.addEventListener("click", function (e) {
//   //debugger
//   if (e.target.parentElement.className === "burger") {
//     let burgerName = e.target.parentNode.children[0].innerText
//     orderList.insertAdjacentHTML("beforeend",
//       `<li>${burgerName}</li>`)
//   }
// })

customBurger.addEventListener("submit", function (e) {
  e.preventDefault()

  return fetch(`http://localhost:3000/burgers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: e.target.name.value,
        description: e.target.description.value,
        image: e.target.url.value

      })

    })
    .then(resp => resp.json())
    .then(burger => {
      burgerMenu.insertAdjacentHTML("beforeend", `
              <div class = "burger" id="${burger.name}">
              <h3 class = "burger_title" data-burger-name='${burger.id}'> ${burger.name} </h3>
              <img src =${burger.image}>
              <p class = "burger_description">${burger.description}</p> 
              <button class = "button" id="button${burger.id}" data-button-id='${burger.id}'> Add to Order </button> 
              </div>
              `)
      orderList.insertAdjacentHTML("beforeend",
        `<li>${burger.name}</li>`)
    })
})