export const UI = {
  FORM: document.querySelector(".search"),
  TAB_NAV_BUTTONS: document.querySelectorAll(".tabs__btn"),
  TAB: {
    NOW: document.querySelector('.now'),
    DETAILS: document.querySelector('.details'),
    FORECAST: document.querySelector('.forecast'),
  },
  LIKE: document.querySelector('.now__like'),
  LOCATIONS: document.querySelector('.locations__container'),
}

UI.LOCATIONS.innerHTML = ""

UI.TAB_NAV_BUTTONS.forEach(btn => {
  btn.addEventListener("click", tabBtnClickHandler)
});

function tabBtnClickHandler() {
  UI.TAB_NAV_BUTTONS.forEach(btn => {btn.classList.remove("active")})
  this.classList.add("active")
  const tabName = this.dataset.tab
  showTab(tabName)
}

function showTab(tabName) {
  for (let tab in UI.TAB) {
    UI.TAB[tab].classList.contains(tabName) ?  UI.TAB[tab].classList.add("active") :  UI.TAB[tab].classList.remove("active")
  }
}
