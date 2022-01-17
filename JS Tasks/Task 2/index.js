// takes Name of survey
const modalFunc = () => {
    const serveyName = document.querySelector("#survey-name").value;
    const serveyDescription = document.querySelector("#survey-description").value;
    if ((serveyName && serveyDescription) !== "") {
        let serveyObj = { serveyName: serveyName, serveyDescription: serveyDescription };
        localStorage.setItem('surveyInfo', JSON.stringify(serveyObj));
        window.location  = './createSurvey.html';
    } else {
        document.querySelector("#modal-errors").innerHTML = 'Please fill the required information!'
    }
}

// sidebar that will creates new question
const addQuestion = () => {
    const serveyForm = document.querySelector('#survey-form');
    let quesType = document.querySelector('#question-type').value;
    if (quesType == 'Multiple') {
        serveyForm.innerHTML = `
        <div class="card container shadow-sm rounded mb-4">
            <div class="row">
                        <div class="col-sm-6 py-4">
                            <div>
                                <label for="survey-question" class="form-label"
                                    style="font-weight: 600">Question:</label>
                                <input type="text" placeholder="Write question here" id="survey-question"
                                    class="survey-question form-control">
                            </div>
                            <div class="mt-4">
                                <label for="survey-option" id="ques-options" class="form-label"
                                    style="font-weight: 600">Options:</label>
                                <span>
                                    <input type="text" placeholder="Your option here"
                                        class="survey-option form-control mb-3">
                                    
                                </span>
                            </div>
                        </div>
                        <div class="col-sm-2 py-4">
                            <p style="font-weight: 600">Add Option</p>
                            <button class="btn btn-outline-primary" onclick="addOption()">+ Add</button>
                        </div>
                        <div class="col-sm-4 py-4">
                            <p style="font-weight: 600">Type of Response</p>
                            <div class="mt-3">
                                <select class="form-select mb-3 mt-2" id="typeOfResponse">
                                    <option value="Multiple" selected="selected">Multiple</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6 mb-4">
                            <button class="btn btn-success" onclick="saveQuestionMultiple()">Save</button>
                        </div>
                    </div>
        </div>
        <div class="col-sm-12 mb-4">
            <div class="card shadow-sm rounded">
                <button class="btn btn-primary" onclick="onSurveyFinish()">Finish</button>
            </div>
        </div>
        `
    } else if (quesType == 'Single') {
        serveyForm.innerHTML = `
        <div class="card container shadow-sm rounded mb-4">
            <div class="row">
                <div class="col-sm-6 py-4">
                    <div>
                        <label for="survey-question" class="form-label"
                            style="font-weight: 600">Question:</label>
                        <input type="text" placeholder="Write question here" id="survey-question"
                            class="survey-question form-control">
                    </div>
                </div>
                <div class="col-sm-3 py-4">
                    <p style="font-weight: 600">Fail Response</p>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input fail-response" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                            value="yes" checked>
                        <label class="form-check-label" for="inlineRadio1">Yes</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input fail-response" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                            value="no">
                        <label class="form-check-label" for="inlineRadio2">No</label>
                    </div>
                </div>
                <div class="col-sm-3 py-4">
                    <p style="font-weight: 600">Type of Response</p>
                    <div class="mt-3">
                        <select class="form-select mb-3 mt-2" id="typeOfResponse">
                            <option value="Single" selected="selected">Single</option>
                        </select>
                    </div>
                </div>
                
            </div>
            <div class="row">
                <div class="col-sm-6 mb-4">
                    <button class="btn btn-success" onclick="saveQuestionSingle()">Save</button>
                </div>
        </div>
    </div>
    <div class="col-sm-12 mb-4">
            <div class="card shadow-sm rounded">
                <button class="btn btn-primary" onclick="onSurveyFinish()">Finish</button>
            </div>
        </div>
        `
    } else if (quesType == 'Data') {
        serveyForm.innerHTML = `
        <div class="card container shadow-sm rounded mb-4">
            <div class="row">
                <div class="col-sm-8 py-4">
                    <div>
                        <label for="survey-question" class="form-label"
                            style="font-weight: 600">Question:</label>
                        <input type="text" placeholder="Write question here" id="survey-question"
                            class="survey-question form-control">
                    </div>
                </div>
                <div class="col-sm-4 py-4">
                    <p style="font-weight: 600">Type of Response</p>
                    <div class="mt-3">
                        <select class="form-select mb-3 mt-2" id="typeOfResponse">
                            <option value="Data" selected="selected">Data</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 mb-4">
                    <button class="btn btn-success" onclick="saveQuestionData()">Save</button>
                </div>
            </div>
    </div>
    <div class="col-sm-12 mb-4">
            <div class="card shadow-sm rounded">
                <button class="btn btn-primary" onclick="onSurveyFinish()">Finish</button>
            </div>
        </div>
`
    }
}

// Array that will contain all the objects of Questions in it!
const surveyArr = [];


//add options feature in questions
const addOption = () => {
    const optionDiv = document.querySelector('#ques-options');
    optionDiv.innerHTML += `<input type="text" placeholder="Your option here"
    class="survey-option form-control mb-3 mt-2">`
}

//saves data of Multiple Response Type Question
const saveQuestionMultiple = () => {
    const question = document.querySelector('#survey-question').value;
    const optionsvals = document.querySelectorAll('.survey-option');
    const typeOfResponse = document.querySelector('#typeOfResponse').value;
    const options = []
    for (let i = 0; i < optionsvals.length; i++) {
        options.push(optionsvals[i].value);
    }
    const questionObj = { question, options, typeOfResponse }
    surveyArr.push(questionObj)
    console.log(surveyArr);
}

//saves data of Single Response Type Question
const saveQuestionSingle = () => {
    const question = document.querySelector('#survey-question').value;
    const typeOfResponse = document.querySelector('#typeOfResponse').value;
    const failResponse = document.querySelector('.fail-response').value;
    const questionObj = { question, failResponse, typeOfResponse }
    surveyArr.push(questionObj)
    console.log(surveyArr);
}

//saves data of Dta Response Type Question
const saveQuestionData = () => {
    const question = document.querySelector('#survey-question').value;
    const typeOfResponse = document.querySelector('#typeOfResponse').value;
    const questionObj = { question, typeOfResponse }
    surveyArr.push(questionObj)
    console.log(surveyArr);
}

const onSurveyFinish = () => {
    if (surveyArr.length == 0) {
        alert("please input some questions")
    } else {
        const surveyInfo = JSON.parse(localStorage.getItem('surveyInfo'));
        const serveyName = surveyInfo.serveyName;
        const serveyDesc = surveyInfo.serveyDescription;

        const createdBy = localStorage.getItem('userEmail');
        // console.log(createdBy);

        db.collection("serveys").doc("survey").set({
            serveyName,
            serveyDesc,
            surveyArr,
            createdBy
        })
            .then(()=> {
                console.log("Document successfully written!");
                window.location = './dashboard.html';
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }
}


// function that sets up the dashboard
const setDashboardContent = () => {
    let surveyData;
    db.collection("serveys").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
               surveyData = doc.data();
               setupDashboardData(surveyData)
            });
        }).catch((err) => {
            console.log(err);
        })
}

const setupDashboardData = (surveyData) => {
    let dashboardContent = document.querySelector('#dashboard-content');

    dashboardContent.innerHTML = `<table class="table table-striped card-body">
        <thead>
            <tr>
                <th scope="col" style="color: #0d6efd;">Name</th>
                <th scope="col" style="color: #0d6efd;">CreatedBy</th>
                <th scope="col" style="color: #0d6efd;"></th>
                <th scope="col" style="color: #0d6efd;"></th>
                <th scope="col" style="color: #0d6efd;"></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">${surveyData.serveyName}</th>
                <td>${surveyData.createdBy}</td>
                <td></td>
                <td></td>
                <td>
                    <a href="./takingServey.html"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#0d6efd"
                     >   class="bi bi-file-earmark-text-fill" viewBox="0 0 16 16">
                        <path
                            d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zM4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1h-4z" />
                    </svg></a>
                </td>
            </tr>
        </tbody>
    </table>`
}

const setCreateSurveyPage = () => {
    const surveyTitle = document.querySelector('#survey-title');
    const surveyDesc = document.querySelector('#survey-description');
    const surveyInfo = localStorage.getItem('surveyInfo');
    surveyTitle.innerHTML = JSON.parse(surveyInfo).serveyName;
    surveyDesc.innerHTML = JSON.parse(surveyInfo).serveyDescription;
}



