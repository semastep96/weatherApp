export const UI = {
  FORM: document.querySelector(".search"),
  TAB_NAV_BUTTONS: document.querySelectorAll(".tabs__btn"),
  TABS: document.querySelectorAll(".tabs__content"),
  TAB: {
    NOW: document.querySelector('.now')
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
  UI.TABS.forEach(tab => {
    tab.classList.contains(tabName) ? tab.classList.add("active") : tab.classList.remove("active")
  })
}

UI.FORM.addEventListener("onsubmit", () => {
   this.document.querySelector(".search__input").value
})

UI.LIKE.addEventListener("click", function () {
  this.classList.toggle('active')
})
