const firebaseConfig = {
    apiKey: "AIzaSyDF5bzFknX5oQ-XBkFdLscs4U3y_SA1Fyo",
    authDomain: "survey-app-a4505.firebaseapp.com",
    projectId: "survey-app-a4505",
    storageBucket: "survey-app-a4505.appspot.com",
    messagingSenderId: "45341949465",
    appId: "1:45341949465:web:91fddcede53ea022953488"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = app.firestore();

const onSurveyFinish = () => {

}

const renderServey = (data) => {
    const serveyForm = document.querySelector('#survey-form');
    const serveyTitle = document.querySelector('#servey-title');
    const serveyDesc = document.querySelector('#servey-description');

    serveyTitle.innerHTML = data.serveyName;
    serveyDesc.innerHTML = data.serveyDesc;
    // console.log(data.surveyArr)

    data.surveyArr.forEach((elem, index) => {
        if (elem.typeOfResponse == 'Multiple') {
            serveyForm.innerHTML += `
            <div class="card container shadow-sm rounded mb-4">
                <div class="row">
                    <div class="container my-3">
                        <h6 class="mb-4">
                        ${index + 1} - ${elem.question}
                        </h6>
                        <div class="form-check px-4 mx-4">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                            ${elem.options[0]}
                            </label>
                        </div>
                        <div class="form-check px-4 mx-4">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                            ${elem.options[1]}
                            </label>
                        </div>
                        <div class="form-check px-4 mx-4">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                            ${elem.options[2]}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            `
        } else if (elem.typeOfResponse == 'Single') {
            serveyForm.innerHTML += `
            <div class="card container shadow-sm rounded mb-4">
                <div class="row">
                    <div class="container my-3">
                        <h6 class="mb-4">
                        ${index + 1} - ${elem.question}
                        </h6>
                        <div class="form-check mx-4">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                                value="option1">
                            <label class="form-check-label" for="exampleRadios1">
                                Yes
                            </label>
                        </div>
                        <div class="form-check mx-4">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                value="option2">
                            <label class="form-check-label" for="exampleRadios2">
                                No
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            `
        } else if (elem.typeOfResponse == 'Data') {
            serveyForm.innerHTML += `
            <div class="card container shadow-sm rounded mb-4">
                <div class="row">
                    <div class="container my-3">
                        <h6 class="mb-4">
                        ${index + 1} - ${elem.question}
                        </h6>
                        <div class="input-group">
                            <span class="input-group-text">Write here</span>
                            <textarea class="form-control" aria-label="With textarea"></textarea>
                        </div>
                    </div>
                </div>
            `
        }
    })
    serveyForm.innerHTML += `
    <div class="col-sm-12 mb-4">
            <div class="card shadow-sm rounded">
                <button class="btn btn-primary" onclick="onSurveySubmit()">Submit Servey</button>
            </div>
        </div>
    `
}

const getServeyData = () => {
    db.collection("serveys").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const surveyData = doc.data();
            console.log(surveyData);
            renderServey(surveyData);
        });
    });
}

const setAvailaibleSurveys = () => {
    const surveysAvailable = document.querySelector('#surveysAvailable');
    let surveysData;

    db.collection("serveys").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            surveysData = doc.data()
            console.log(surveysData.serveyName);
            surveysAvailable.innerHTML += `
            <tbody>
                        <tr>
                            <th scope="row">${surveysData.serveyName}</th>
                            <td>${surveysData.createdBy}</td>
                            <td></td>
                            <td></td>
                            <td><a href="./takingServey.html"><button class="btn btn-outline-primary">Start
                                        Survey</button></a></td>
                        </tr>
                    </tbody>
            `
        });
    }).catch((err) => {
        console.log(err);
    })

}



