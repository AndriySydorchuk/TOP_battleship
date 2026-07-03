import computerImage from "../assets/computer.png";

const domManager = (() => {
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

  return { renderStartView };
})();

export { domManager };
