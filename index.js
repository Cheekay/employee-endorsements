// javascript

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
	getDatabase,
	ref,
	push,
	onValue,
	remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
	databaseURL: "https://endorsements-d9e9d-default-rtdb.firebaseio.com/",
};

// initialize all app objects and necessary functions
const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsDB = ref(database, "endorsements");

// define constants and variables
const publishBTN = document.getElementById("publish-btn");
const userInput = document.getElementById("user-input");
const endorsementsList = document.getElementById("endorsements-list");

publishBTN.addEventListener("click", function () {
	let endorsementMSG = userInput.value;
	// let newEl = document.createElement("li")
	// newEl.textContent = endorsementMSG
	push(endorsementsDB, endorsementMSG);
	resetUserInput();
});

function resetUserInput() {
	userInput.value = "";
}

function renderEndorsements(item) {
	// let userEndorsement = item[i];
	let userEndorsementID = item[0];
	let userEndorsementValue = item[1];

	let newEl = document.createElement("li");
	newEl.textContent = userEndorsementValue;
	endorsementsList.append(newEl);
}

function clearEndorsementList() {
	endorsementsList.innerHTML = "";
}

onValue(endorsementsDB, function (snapshot) {
	if (snapshot.exists()) {
		clearEndorsementList();
		let userEndorsements = Object.entries(snapshot.val());

		for (let i = 0; i < userEndorsements.length; i++) {
			let currentEndorsement = userEndorsements[i];
			renderEndorsements(currentEndorsement);
		}
	} else {
		endorsementsList.innerHTML = `<li>No Endorsements submitted yet</li>`;
	}
});
