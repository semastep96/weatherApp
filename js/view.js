export const UI = {
  TAB_NAV_BUTTONS: document.querySelectorAll(".tabs__btn"),
  TABS: document.querySelectorAll(".tabs__content"),
}

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