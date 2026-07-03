import { domManager } from "./domManager";

const eventManager = (() => {
  function handleViewSwitch() {
    handleStartViewSwitch();
    handleBoardViewSwitch();
  }

  function handleBoardViewSwitch() {
    const computerBoxEl = document.querySelector(".computer-box");

    computerBoxEl.addEventListener("click", () => domManager.showBoardView());
  }

  function handleStartViewSwitch() {
    const backBtn = document.querySelector(".back-btn");

    backBtn.addEventListener("click", () => domManager.showStartView());
  }

  return { handleViewSwitch };
})();

export { eventManager };
