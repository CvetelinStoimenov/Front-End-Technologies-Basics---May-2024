window.addEventListener("load", solve);

function solve() {
    let numTicketsElement = document.getElementById("num-tickets");
    let seatingPreferenceElement = document.getElementById("seating-preference");
    let fullNameElement = document.getElementById("full-name");
    let emailElement = document.getElementById("email");
    let phoneNumberElement = document.getElementById("phone-number");

    let purchaseBtnElement = document.getElementById("purchase-btn");

    let purchaseListElement = document.getElementById("ticket-purchase");
    let previewElement = document.getElementById('ticket-preview');
    let bottomListElement = document.querySelector('.bottom-content');

    purchaseBtnElement.addEventListener("click", onAdd);

    function onAdd(e) {

        e.preventDefault();
        if (
            numTicketsElement.value == "" ||
            seatingPreferenceElement.value == "" ||
            fullNameElement.value == "" ||
            phoneNumberElement.value == "" ||
            emailElement.value == ""
        ) {
            return;
        }

        let liElement = document.createElement("li");
        liElement.setAttribute("class", "ticket-purchase");

        let articleElement = document.createElement("article");
        let divElement = document.createElement("div");
        divElement.setAttribute("class", "btn-container");


        let numTicketsUpcoming = document.createElement("p");
        numTicketsUpcoming.textContent = `Count: ${numTicketsElement.value}`;

        let seatingPreferenceUpcoming = document.createElement("p");
        seatingPreferenceUpcoming.textContent = `Performance: ${seatingPreferenceElement.value}`;

        let fullNameUpcoming = document.createElement("p");
        fullNameUpcoming.textContent = `To: ${fullNameElement.value}`;

        let emailUpcoming = document.createElement("p");
        emailUpcoming.textContent = `Email: ${emailElement.value}`;

        let phoneNumberUpcoming = document.createElement("p");
        phoneNumberUpcoming.textContent = `Phone number: ${phoneNumberElement.value}`;

        let editBtn = document.createElement("button");
        editBtn.setAttribute("class", "edit-btn");
        editBtn.textContent = "Edit";

        let continueBtn = document.createElement("button");
        continueBtn.setAttribute("class", "edit-btn");
        continueBtn.textContent = "Next";

        articleElement.appendChild(numTicketsUpcoming);
        articleElement.appendChild(seatingPreferenceUpcoming);
        articleElement.appendChild(fullNameUpcoming);
        articleElement.appendChild(phoneNumberUpcoming);
        articleElement.appendChild(emailUpcoming);

        liElement.appendChild(articleElement);
        divElement.appendChild(editBtn);
        divElement.appendChild(continueBtn);
        liElement.appendChild(divElement);
        previewElement.appendChild(liElement);

        let numTicketsEdited = numTicketsElement.value;
        let dateEdited = seatingPreferenceElement.value;
        let placeEdited = fullNameElement.value;
        let eventEdited = phoneNumberElement.value;
        let emailEdited = emailElement.value;

        numTicketsElement.value = "";
        seatingPreferenceElement.value = "";
        fullNameElement.value = "";
        phoneNumberElement.value = "";
        emailElement.value = "";

        purchaseBtnElement.disabled = true;

        editBtn.addEventListener("click", onEdit);

        function onEdit() {
            numTicketsElement.value = numTicketsEdited;
            seatingPreferenceElement.value = dateEdited;
            fullNameElement.value = placeEdited;
            phoneNumberElement.value = eventEdited;
            emailElement.value = emailEdited;

            liElement.remove();
            purchaseBtnElement.disabled = false;
        }

        continueBtn.addEventListener("click", onNext);

        function onNext() {
            divElement.innerHTML = '';
            let liElementNext = document.createElement("li");
            liElementNext.setAttribute('class', 'ticket-purchased');

            let articleElementContinue = articleElement.cloneNode(true);

            let buyBtn = document.createElement('button');
            buyBtn.setAttribute("class", 'buy-btn');
            buyBtn.textContent = "Buy";

            liElementNext.appendChild(articleElementContinue);
            divElement.appendChild(buyBtn);

            liElementNext.appendChild(divElement);

            purchaseListElement.appendChild(liElementNext);
            liElement.remove();
            purchaseBtnElement.disabled = false;

            buyBtn.addEventListener('click', onBuy);

            function onBuy() {

                liElementNext.remove();

                let backBtn = document.createElement('button');
                backBtn.setAttribute("class", 'back-btn');
                backBtn.textContent = "Back";

                let h2 = document.createElement('h2');
                h2.textContent = "Ticket Purchased";

                bottomListElement.appendChild(h2);
                bottomListElement.appendChild(backBtn);

                backBtn.addEventListener('click', onClear);

                function onClear() {
                    h2.remove();
                    backBtn.remove();
                }
            }
        }
    }
}