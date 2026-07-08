import "./style.css";

import { domManager } from "./domManager";
import { eventManager } from "./eventManager";

const main = document.querySelector("main");

const startView = domManager.createStartView();
const setupView = domManager.createSetupView();
const playView = domManager.createPlayView();

main.append(startView, setupView, playView);

domManager.showView(startView);

eventManager.handleViewSwitch();
eventManager.handleSetup();
eventManager.handlePlay();
