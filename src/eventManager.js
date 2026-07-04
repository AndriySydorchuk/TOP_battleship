import { domManager } from "./domManager";

const eventManager = (() => {
  function handleViewSwitch() {
    handleStartViewSwitch();
    handleBoardViewSwitch();
  }

  function handleBoardViewSwitch() {
    const computerOption = document.querySelector(".computer-option");

    computerOption.addEventListener("click", () => domManager.showBoardView());
  }

  function handleStartViewSwitch() {
    const returnBtn = document.querySelector(".return-btn");

    returnBtn.addEventListener("click", () => domManager.showStartView());
  }

  return { handleViewSwitch };
})();

export { eventManager };
