// import { translate } from "./grade";

const translate = {
    'A': 12/12,
    'A-': 11/12,
    'B+': 10/12,
    'B': 9/12,
    'B-': 8/12,
    'C+': 7/12,
    'C': 6/12,
    'C-': 5/12,
    'D+': 4/12,
    'D': 3/12,
    'F': 0/12,
};

const formElement = document.getElementById('new-post');
const addCourseElement = document.getElementById('add-new');
const calculateElement = document.getElementById('submit');
const gpaElement = document.getElementById('gpa-display');

let numCourses = 1;
let gpaTotal = 0;
let creditTotal = 0;

addCourseElement.addEventListener('click', () => {
    numCourses++;
    const newCourse = document.createElement('div');
    newCourse.className = 'form-content';
    newCourse.innerHTML = `
    <div>
        <label for="course-grade${numCourses}"> Course Grade: </label>
        <select name="course-grade${numCourses}" id="course-grade${numCourses}">
            <option value="-">-</option>
            <option value="A">A</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="B-">B-</option>
            <option value="C+">C+</option>
            <option value="C">C</option>
            <option value="C-">C-</option>
            <option value="D+">D+</option>
            <option value="D">D</option>
            <option value="F">F</option>
        </select>
    </div>
    <div>
        <label for="course-credit${numCourses}"> Course Credit(s): </label>
        <select name="course-credit${numCourses}" id="course-credit${numCourses}">
            <option value="-">-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
        </select>
    </div>
    <h3 class="cancel"> X </h3>
    `;
    formElement.insertBefore(newCourse, addCourseElement);

    const cancelElement = formElement.children[numCourses-1].children[2];
    const handleClickCancel = function(){
        formElement.removeChild(cancelElement.parentNode);
        cancelElement.removeEventListener('click', handleClickCancel);
        numCourses--;
    }
    cancelElement.addEventListener('click', handleClickCancel);
});

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    for(let i = 0; i < numCourses; i++){
        const gradeElement = formElement.children[i].children[0].children[1];
        const creditElement = formElement.children[i].children[1].children[1];
        const grade = gradeElement.options[gradeElement.selectedIndex].value;
        const credit = creditElement.options[creditElement.selectedIndex].value;
        if(grade === '-' || credit === '-'){
            alert('Must select all options');
            return;
        }
        gpaTotal += translate[grade] * Number(credit);
        creditTotal += Number(credit);
    }
    gpaElement.textContent = `${(4*gpaTotal/creditTotal).toFixed(3)}`;
    gpaTotal = 0;
    creditTotal = 0;
});