import { domManager } from "./domManager";

const eventManager = (() => {
  function handleViewSwitch() {
    handleStartViewSwitch();
    handleSetupViewSwitch();
  }

  function handleSetupViewSwitch() {
    const computerOption = document.querySelector(".computer-option");

    computerOption.addEventListener("click", () => domManager.showSetupView());
  }

  function handleStartViewSwitch() {
    const returnBtn = document.querySelector(".return-btn");

    returnBtn.addEventListener("click", () => domManager.showStartView());
  }

  return { handleViewSwitch };
})();

export { eventManager };
