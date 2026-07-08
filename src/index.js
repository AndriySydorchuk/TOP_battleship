import "./style.css";

import { domManager } from "./domManager";
import { eventManager } from "./eventManager";

const main = document.querySelector("main");

const startView = domManager.createStartView();
const setupView = domManager.createSetupView();

main.append(startView, setupView);

domManager.showView(startView);

eventManager.handleViewSwitch();
