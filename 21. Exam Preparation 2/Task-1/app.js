window.addEventListener('load', solution);

function solution() {
  let employeeElement = document.getElementById("employee");
  let categoryElement = document.getElementById("category");
  let urgencyElement = document.getElementById("urgency");
  let teamElement = document.getElementById("team");
  let descriptionElement = document.getElementById("description");
  let addbtnElement = document.getElementById("add-btn");

  let previewListElement = document.querySelector(".preview-list");
  let pendingElement = document.querySelector('.pending-list');
  let resolvedElement = document.querySelector('.resolved-list');

  addbtnElement.addEventListener("click", onAdd);

  function onAdd(e) {
    e.preventDefault();
    if (
      employeeElement.value == "" ||
      categoryElement.value == "" ||
      urgencyElement.value == "" ||
      teamElement.value == "" ||
      descriptionElement.value == ""
    ) {
      return;
    }

    let liElementPreview = document.createElement("li");
    liElementPreview.setAttribute("class", "problem-content");

    let articleElementPreview = document.createElement("article");

    let employeePreview = document.createElement("p");
    employeePreview.textContent = `From: ${employeeElement.value}`;

    let categoryPreview = document.createElement("p");
    categoryPreview.textContent = `Category: ${categoryElement.value}`;

    let urgencyPreview = document.createElement("p");
    urgencyPreview.textContent = `Urgency: ${urgencyElement.value}`;

    let teamPreview = document.createElement("p");
    teamPreview.textContent = `Assign to: ${teamElement.value}`;

    let descriptionPreview = document.createElement("p");
    descriptionPreview.textContent = `Description: ${descriptionElement.value}`;

    let editBtn = document.createElement("button");
    editBtn.setAttribute("class", "edit-btn");
    editBtn.textContent = "Edit";

    let continueBtn = document.createElement("button");
    continueBtn.setAttribute("class", "continue-btn");
    continueBtn.textContent = "Continue";

    articleElementPreview.appendChild(employeePreview);
    articleElementPreview.appendChild(categoryPreview);
    articleElementPreview.appendChild(urgencyPreview);
    articleElementPreview.appendChild(teamPreview);
    articleElementPreview.appendChild(descriptionPreview);

    liElementPreview.appendChild(articleElementPreview);
    liElementPreview.appendChild(editBtn);
    liElementPreview.appendChild(continueBtn);

    previewListElement.appendChild(liElementPreview);

    let employeeEdited = employeeElement.value;
    let categoryEdited = categoryElement.value;
    let urgencyEdited = urgencyElement.value;
    let teamEdited = teamElement.value;
    let descriptionEdited = descriptionElement.value;

    employeeElement.value = "";
    categoryElement.value = "";
    urgencyElement.value = "";
    teamElement.value = "";
    descriptionElement.value = "";

    addbtnElement.disabled = true;

    editBtn.addEventListener("click", onEdit);

    function onEdit(){
      employeeElement.value = employeeEdited
      categoryElement.value = categoryEdited
      urgencyElement.value = urgencyEdited
      teamElement.value = teamEdited
      descriptionElement.value = descriptionEdited

      liElementPreview.remove();
      addbtnElement.disabled = false;
    }

    continueBtn.addEventListener("click", onContinue);

    function onContinue(){
      let liElementContinue = document.createElement("li");
      liElementContinue.setAttribute('class', 'problem-content')

      let articleElementContinue = document.createElement('article');
      articleElementContinue = articleElementPreview;

      let resolvedBtn = document.createElement('button');
      resolvedBtn.setAttribute("class", 'resolve-btn');
      resolvedBtn.textContent = "Resolved";

      liElementContinue.appendChild(articleElementContinue);
      liElementContinue.appendChild(resolvedBtn);

      pendingElement.appendChild(liElementContinue);
      liElementPreview.remove();
      addbtnElement.disabled = false;


      resolvedBtn.addEventListener('click', onResolve);

      function onResolve(){
        let liElementResolved = document.createElement('li');
        liElementResolved.setAttribute('class', 'problem-content');

        let articleElementResolved = document.createElement('article');
        articleElementResolved = articleElementContinue;

        let clearBtn = document.createElement('button');
        clearBtn.setAttribute('class', 'clear-btn');
        clearBtn.textContent = 'Clear';

        liElementResolved.appendChild(articleElementResolved);
        liElementResolved.appendChild(clearBtn);
        resolvedElement.appendChild(liElementResolved);
        liElementContinue.remove();

        clearBtn.addEventListener('click', onClear);

        function onClear() {
          liElementResolved.remove();
        }
      }
    }
  }
}




