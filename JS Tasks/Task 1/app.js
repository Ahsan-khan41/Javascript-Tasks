const AtmMachine = () => {
    const preferredNotes = Number(document.querySelector('#prefered-notes').value);
    var inputMoney = document.querySelector('#money').value;
    var result = document.querySelector('#result');
    result.innerHTML = '' // whenever function restarts it sets results to 0

    const notes = [500, 100, 50, 20, 10, 5, 1];   // notes
    let notesCount = 0; // number of notes
    let notesCountArr = []
    let notesGiven = []
    let notesIndex = 0; // tells index of notes array
    // let totalMoney = 0;

    const resultArray = []

    if (preferredNotes <= inputMoney && 100 <= inputMoney && inputMoney <= 100000) {
        notes.splice(notes.indexOf(preferredNotes), 1); // remove the preferred note from array
        notes.unshift(preferredNotes); // adds it as the first element, to manage it precisely!
        console.log("notes", notes)

        for (let i = 0; inputMoney > 0; i++) {

            if (inputMoney < notes[notesIndex]) {
                notesIndex++;
                notesCount = 0;
            }
            else {
                inputMoney = inputMoney - notes[notesIndex];
                notesCount = notesCount + 1;
                if (inputMoney < notes[notesIndex] || notesCount == 200) {
                    resultArray.push(inputMoney)
                    notesCountArr.push(notesCount);
                    notesGiven.push(notes[notesIndex]);
                    // console.log("result array", resultArray)
                    notesCount = 0;
                    if (preferredNotes == 1 && resultArray[resultArray.length - 1] < 5 && resultArray[resultArray.length - 1] != 0) {
                        var temp = 5 - resultArray[resultArray.length - 1]
                        // console.log('temp', temp)
                        notesCountArr.splice(0, 1, notesCountArr[0] - temp)
                        inputMoney = inputMoney + temp
                        // console.log("new input", inputMoney)
                        if (notesIndex<notes.length-1){
                            notesIndex += 1;
                        }
                       
                    }
                    else {
                        notesCount = 0;
                        notesIndex += 1;
                    }
                    console.log("e", notesCountArr);
                    console.log("w", notesGiven)
                }
            }
        }


    } else {
        alert('Kindly select Right Choice & Limit (100 - 100,000)')
    }

    if (checkIfDuplicateExists(notesGiven)) {
        newValue = notesCountArr[notesCountArr.length-1] + notesCountArr[notesCountArr.length-2]
        notesGiven.pop()
        notesCountArr.pop()
        notesCountArr.splice(notesCountArr.length-1, 1, newValue)
    }
    for (let i = 0; i < notesGiven.length; i++) {
        result.innerHTML += `<div> ${notesCountArr[i]} note(s) of ${notesGiven[i]}</div>`
        // console.log('input: ', inputMoney);
    }
}

//new function added to check duplicate values
function checkIfDuplicateExists(arr) {
    return new Set(arr).size !== arr.length
}
