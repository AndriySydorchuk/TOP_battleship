import computerImage from "../assets/computer.png";
import arrowleft from "../assets/arrowleft.svg";

const domManager = (() => {
  function renderViews() {
    renderStartView();
    renderBoardView();
  }

  function renderStartView() {
    const startViewEl = document.querySelector(".start-view");

    const computerBox = document.createElement("div");
    computerBox.classList.add("computer-box");

    const computerBoxImage = document.createElement("img");
    computerBoxImage.classList.add("computer-box-image");
    computerBoxImage.src = computerImage;

    const computerBoxText = document.createElement("p");
    computerBoxText.textContent = "vs Computer";

    computerBox.append(computerBoxImage, computerBoxText);

    startViewEl.append(computerBox);
  }

  function renderBoardView() {
    const boardViewEl = document.querySelector(".board-view");

    const topEl = document.createElement("div");
    topEl.classList.add("top");

    const backBtn = document.createElement("button");
    backBtn.classList.add("back-btn");

    const backBtnImg = document.createElement("img");
    backBtnImg.src = arrowleft;
    backBtnImg.classList.add("back-btn-img");

    backBtn.append(backBtnImg);

    topEl.append(backBtn);

    boardViewEl.append(topEl);
  }

  function showBoardView() {
    const startViewEl = document.querySelector(".start-view");
    const boardViewEl = document.querySelector(".board-view");

    startViewEl.classList.add("hidden");
    boardViewEl.classList.remove("hidden");
  }

  function showStartView() {
    const startViewEl = document.querySelector(".start-view");
    const boardViewEl = document.querySelector(".board-view");

    startViewEl.classList.remove("hidden");
    boardViewEl.classList.add("hidden");
  }

  return { renderViews, showStartView, showBoardView };
})();

export { domManager };
