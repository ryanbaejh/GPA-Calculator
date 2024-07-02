
function openSection(sectionId) {
    let section = document.getElementById(sectionId);
    section.style.display = "block";  // Or "flex" or "grid" depending on your layout
}

function closeSection(sectionId) {
    let section = document.getElementById(sectionId);
    section.style.display = "none";
}

function addClass(){
    let container = document.getElementById("input-field-1").parentNode;
    let fieldLength = container.getElementsByClassName("inputfield").length;
    let inputField = document.getElementById("input-field-1");
    let clone = inputField.cloneNode(true);
    clone.id = "input-field-" + (fieldLength + 1);
    let classNumber = fieldLength + 1;
    let inputs = clone.getElementsByTagName("input");
    inputs[0].placeholder = "Class "+ classNumber;
    inputs[0].value = "";
    inputs[1].value = "";
    inputs[2].value = "";
    let addButton = document.getElementById("add-btn");
    container.insertBefore(clone, addButton);
}

function removeClass(){
    let container = document.getElementById("input-field-1").parentNode;
    let fieldLength = container.getElementsByClassName("inputfield").length;
    let removedClassNum = "input-field-" + fieldLength;
    let removedClass = document.getElementById(removedClassNum);
    console.log("Removed: " + removedClass);
    if(fieldLength != 1){
        removedClass.remove();
    }
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
