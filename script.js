
let previousSections = [];
let currentSection = "main-page";
const backBtn = document.getElementsByClassName("back-btn");
const saveBtn = document.getElementsByClassName("save-btn");


//Add Year Button Vars
const addYrBtn = document.getElementById('add-year-btn');
const yrContainer = document.getElementById('year-container');
const yrTemplate = document.getElementById('yr-template');
const editBtn = document.getElementsByClassName("edit-btn");

//Semester Calculator Vars
const classContainer = document.getElementById("class-container");
const classTemplate = document.getElementById("class-template");

//Class Calculator Vars
const asmntContainer = document.getElementById("assignment-container");
const asmntTemplate = document.getElementById("assignment-template");

function start(){
    closeSection("save-area");
    const classNum = 3;
    const asmntNum = 3;
    for(let i=0; i<classNum; i++){
        addClass();
    }
    for(let i=0; i<asmntNum; i++){
        addAssignment();
    }
    addYear();
    
}

function moveTo(to){
    closeSection(currentSection);
    console.log(currentSection + "closed")
    previousSections.push(currentSection);
    openSection(to);
    console.log(to + "opened")
    currentSection = to;
}

function openSection(sectionId) {
    let section = document.getElementById(sectionId);
    section.style.display = "block"; 
}

function closeSection(sectionId) {
    let section = document.getElementById(sectionId);
    section.style.display = "none";
}

function moveBack(){
    previousSection = previousSections.pop();
    closeSection(currentSection);
    openSection(previousSection);
    currentSection = previousSection;
}

document.querySelectorAll('.back-btn').forEach(button => {
    button.addEventListener('click', function() {
        moveBack();
        closeSection("save-area")
    });
});

document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function(){
        openSection("save-area");
    })
})

addYrBtn.addEventListener('click', function(){
    addYear();
})

function addYear(){
    const clone = document.importNode(yrTemplate.content, true);
    const fieldLength = yrContainer.getElementsByClassName("new-year").length;
    let yearNumber = fieldLength + 1;
    clone.querySelector(".year-title").textContent = "Year " + yearNumber;
    yrContainer.insertBefore(clone, addYrBtn);
}

function addClass(){
    const clone = document.importNode(classTemplate.content, true);
    const fieldLength = classContainer.getElementsByClassName("inputfield").length;
    let classNumber = fieldLength + 1;
    clone.querySelector(".class-name").placeholder = "Class " + classNumber;
    classContainer.appendChild(clone);
}

function removeClass(){
    const inputs = classContainer.getElementsByClassName("inputfield");
    if (inputs.length > 1) {
        classContainer.removeChild(inputs[inputs.length - 1]);
    }
}

function clearClass(){
    const inputFields = classContainer.getElementsByClassName("inputfield");
    Array.from(inputFields).forEach(fields => {
        let inputs = fields.getElementsByTagName("input");
        Array.from(inputs).forEach(input => {
            input.value = "";
        });
    })
}

function addAssignment(){
    const clone = document.importNode(asmntTemplate.content, true);
    const fieldLength = asmntContainer.getElementsByClassName("inputfield").length;
    let assignmentNumber = fieldLength + 1;
    clone.querySelector(".assignment-name").placeholder = "Assignment " + assignmentNumber;
    asmntContainer.appendChild(clone);
}

function removeAssignment(){
    const inputs = asmntContainer.getElementsByClassName("inputfield");
    if (inputs.length > 1) {
        asmntContainer.removeChild(inputs[inputs.length - 1]);
    }
}

function clearAssignment(){
    const inputFields = asmntContainer.getElementsByClassName("inputfield");
    Array.from(inputFields).forEach(fields => {
        let inputs = fields.getElementsByTagName("input");
        Array.from(inputs).forEach(input => {
            input.value = "";
        });
    })
}

function calculateGPA(){
    let container = document.getElementById("input-field-1").parentNode;
    let gradeInputs = container.getElementsByClassName("grade-val");
    let creditInputs = container.getElementsByClassName("credit-val");
    let calculatedMessage = document.getElementById("final-gpa-message");

    //Calculate Grade*Credit
    let qualityPoints = 0;
    let totalQP = 0;
    for(let i = 0; i < gradeInputs.length; i++){
        let rawGrade = gradeInputs[i].value;
        let grade = parseFloat(gradeInputs[i].value);
        if(isNaN(rawGrade)){
            if(rawGrade == 'A'||rawGrade == 'a'){
                grade = 4.0;
            }
            else if(rawGrade == 'B+'||rawGrade == 'b+'){
                grade = 3.5;
            }
            else if(rawGrade == 'B'||rawGrade == 'b'){
                grade = 3.0;
            }
            else if(rawGrade == 'C+'||rawGrade == 'c+'){
                grade = 2.5;
            }
            else if(rawGrade == 'C'||rawGrade == 'c'){
                grade = 2.0;
            }
            else if(rawGrade == 'D'||rawGrade == 'd'){
                grade = 1.0;
            }
            else if(rawGrade == 'F'||rawGrade == 'f'){
                grade = 0;
            }
        }
        let credits = parseFloat(creditInputs[i].value);
        if(!isNaN(grade) && !isNaN(credits)){
            qualityPoints = grade*credits;
            totalQP += qualityPoints;
            console.log(qualityPoints);
        }
    }
    console.log(totalQP);

    //Calculate Total Grade
    let totalGradeVal = 0;
    for(let i = 0; i < gradeInputs.length; i++){
        let grade = parseFloat(gradeInputs[i].value);
        if(!isNaN(grade)){
            totalGradeVal += grade;
        }
    }
    console.log("totalGrade: " + totalGradeVal);

    //Calculate Total Credits
    let totalCreditVal = 0;
    for(let i = 0; i < creditInputs.length; i++){
        credits = parseFloat(creditInputs[i].value);
        if(!isNaN(credits)){
            totalCreditVal += credits;
        }
    }
    console.log("totalCredits: " + totalCreditVal);

    //Calculate Final GPA
    let finalGPA = totalQP/totalCreditVal;
    calculatedMessage.innerText = "Your final GPA is: ";
    calculatedMessage.innerText += finalGPA;
    
    
}

function calculateGrade() {
    const container = document.getElementById("a-input-field").parentNode;
    const gradeInputs = container.getElementsByClassName("grade-val");
    const weightInputs = container.getElementsByClassName("weight-val");
    let calculatedMessage = document.getElementById("final-grade-message");
    let finalGrade = 0;

    for (let i = 0; i < gradeInputs.length; i++) {
        let rawGrade = gradeInputs[i].value;
        let weight = weightInputs[i].value;
        let asmntGrade = 0;
        let numericWeight;
        if (rawGrade.includes('/')) {
            const [numerator, denominator] = rawGrade.split('/').map(Number);
            if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
                console.log("wrong input");
                continue;  
            }
            asmntGrade = (numerator / denominator) * 100;
        } else {
            asmntGrade = parseFloat(rawGrade);
        }
        if (weight.includes('/')) {
            const [numerator, denominator] = weight.split('/').map(Number);
            if (isNaN(numerator) || isNaN(denominator) || denominator === 0) {
                console.log("wrong input");
                continue;  
            }
            numericWeight = numerator / denominator;
        } else {
            numericWeight = parseFloat(weight);
            if (numericWeight > 1) {
                numericWeight = numericWeight / 100;
            }
        }

        finalGrade += numericWeight * asmntGrade;
    }

    calculatedMessage.innerText = "Your final grade is: " + finalGrade;
}



start();
