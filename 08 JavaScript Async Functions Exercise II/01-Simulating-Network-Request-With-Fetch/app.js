async function getUserInput(promptMessage) {
    return new Promise((resolve) => {
        const input = prompt(promptMessage);
        resolve(input);
    });
}

async function fetchData() {
    const userInput = await getUserInput('Enter the number of people you search:');
    const url = 'https://swapi.dev/api/people/';
    let searchUrl = url + userInput;
    const response = await fetch(searchUrl);
    const data = await response.json();
    console.log(data);
}