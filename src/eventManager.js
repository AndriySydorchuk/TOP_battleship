import { domManager } from "./domManager";

const eventManager = (() => {
  function handleViewSwitch() {
    const startView = document.querySelector(".start-view");
    const setupView = document.querySelector(".setup-view");

    const computer = document.querySelector(".computer");
    computer.addEventListener("click", () => {
      domManager.resetSetupView();
      domManager.showView(setupView);
    });

    const returnBtn = document.querySelector(".return-btn");
    returnBtn.addEventListener("click", () => domManager.showView(startView));
  }

  return { handleViewSwitch };
})();

export { eventManager };
