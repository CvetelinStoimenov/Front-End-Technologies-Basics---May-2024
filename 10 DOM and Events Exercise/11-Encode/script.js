function encodeText() {
    const inputText = document.getElementById('inputText').value;
    const encodedText = btoa(btoa(inputText));
    document.getElementById('outputText').value = encodedText;
    addToHistory('Encoded', inputText, encodedText);
}

function decodeText() {
    const inputText = document.getElementById('inputText').value;
    try {
        const decodedText = atob(atob(inputText));
        document.getElementById('outputText').value = decodedText;
        addToHistory('Decoded', inputText, decodedText);
    } catch (e) {
        document.getElementById('outputText').value = 'Invalid encoded text';
    }
}

function addToHistory(action, input, output) {
    const historyList = document.getElementById('historyList');
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${action}:</strong> <br> Input: ${input} <br> Output: ${output}`;
    historyList.prepend(listItem);  // Prepend the new item to the top of the list
}
