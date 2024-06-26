window.addEventListener('load', solve);

function solve() {
    let timeElement = document.getElementById("time");
    let dateElement = document.getElementById("date");
    let placeElement = document.getElementById("place");
    let eventElement = document.getElementById("event-name");
    let emailElement = document.getElementById("email");

    let addEventBtnElement = document.getElementById("add-btn");

    let upcomingListElement = document.getElementById("upcoming-list");
    let checkListElement = document.getElementById('check-list');
    let finishedListElement = document.getElementById('finished-list');

    addEventBtnElement.addEventListener("click", onAdd);

    function onAdd(e) {
        e.preventDefault();
        if (
            timeElement.value === "" ||
            dateElement.value === "" ||
            placeElement.value === "" ||
            eventElement.value === "" ||
            emailElement.value === ""
        ) {
            return;
        }

        let liElement = document.createElement("li");
        liElement.setAttribute("class", "event-content");

        let articleElement = document.createElement("article");

        let dateUpcoming = document.createElement("p");
        dateUpcoming.textContent = `Begins: ${dateElement.value}`;

        let timeUpcoming = document.createElement("p");
        timeUpcoming.textContent = `At: ${timeElement.value}`;

        let placeUpcoming = document.createElement("p");
        placeUpcoming.textContent = `In: ${placeElement.value}`;

        let eventUpcoming = document.createElement("p");
        eventUpcoming.textContent = `Event: ${eventElement.value}`;

        let emailUpcoming = document.createElement("p");
        emailUpcoming.textContent = `Contact: ${emailElement.value}`;

        let editBtn = document.createElement("button");
        editBtn.setAttribute("class", "edit-btn");
        editBtn.textContent = "Edit";

        let continueBtn = document.createElement("button");
        continueBtn.setAttribute("class", "continue-btn");
        continueBtn.textContent = "Continue";

        articleElement.appendChild(dateUpcoming);
        articleElement.appendChild(timeUpcoming);
        articleElement.appendChild(placeUpcoming);
        articleElement.appendChild(eventUpcoming);
        articleElement.appendChild(emailUpcoming);

        liElement.appendChild(articleElement);
        liElement.appendChild(editBtn);
        liElement.appendChild(continueBtn);

        checkListElement.appendChild(liElement);

        let timeEdited = timeElement.value;
        let dateEdited = dateElement.value;
        let placeEdited = placeElement.value;
        let eventEdited = eventElement.value;
        let emailEdited = emailElement.value;

        timeElement.value = "";
        dateElement.value = "";
        placeElement.value = "";
        eventElement.value = "";
        emailElement.value = "";

        addEventBtnElement.disabled = true;

        editBtn.addEventListener("click", onEdit);

        function onEdit() {
            timeElement.value = timeEdited;
            dateElement.value = dateEdited;
            placeElement.value = placeEdited;
            eventElement.value = eventEdited;
            emailElement.value = emailEdited;

            liElement.remove();
            addEventBtnElement.disabled = false;
        }

        continueBtn.addEventListener("click", onContinue);

        function onContinue() {
            let liElementContinue = document.createElement("li");
            liElementContinue.setAttribute('class', 'event-content');

            let articleElementContinue = articleElement.cloneNode(true);

            let finishBtn = document.createElement('button');
            finishBtn.setAttribute("class", 'finished-btn');
            finishBtn.textContent = "Move to Finished";

            liElementContinue.appendChild(articleElementContinue);
            liElementContinue.appendChild(finishBtn);

            upcomingListElement.appendChild(liElementContinue);
            liElement.remove();
            addEventBtnElement.disabled = false;

            finishBtn.addEventListener('click', onFinished);

            function onFinished() {
                let liElementResolved = document.createElement('li');
                liElementResolved.setAttribute('class', 'event-content');

                let articleElementResolved = articleElementContinue.cloneNode(true);

                liElementResolved.appendChild(articleElementResolved);
                finishedListElement.appendChild(liElementResolved);
                liElementContinue.remove();
                
                clearBtn = document.getElementById("clear");

                clearBtn.addEventListener('click', onClear);

                function onClear() {
                    liElementResolved.remove();
                }
            }
        }
    }
}
