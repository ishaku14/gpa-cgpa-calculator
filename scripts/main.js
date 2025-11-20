import {state} from './state.js';
import {firstSemesterCourses, secondSemesterCourses, getCourses, renderCourses} from './course.js';
import { calculateGpa, calculateCgpa } from './calculation.js';

renderCourses();


//functionality to toggle between first and second semester courses
const firstSemToggleElm = document.querySelector('.first-semester-courses');
const secondSemToggleElm = document.querySelector('.second-semester-courses');

firstSemToggleElm.addEventListener('click', () => {
  state.semester = 'first';
  renderCourses();
});

secondSemToggleElm.addEventListener('click', () => {
  state.semester = 'second';
  renderCourses();
});

//functionality to handle level selection and previous cgpa input
const levelSelectElement = document.getElementById('level-input');
const previousCgpaContainer = document.getElementById('previous-cgpa-group');

levelSelectElement.addEventListener('change', ()=> {
  state.currentLevel = Number(levelSelectElement.value);
  state.currentLevel === 100? previousCgpaContainer.classList.add('hidden'): previousCgpaContainer.classList.remove('hidden');
});

//handles previous cgpa submission
document.querySelector('.cgpa-submit-button').addEventListener('click', ()=> {
  const previousCgpaInput = document.getElementById('previous-cgpa');
  state.previousCgpa =  Number(previousCgpaInput.value);
});

const semesterElement = document.getElementById('js-semester-select');
semesterElement.addEventListener('change', (event)=> {
  state.semester = event.target.value;
  renderCourses();
});

//adds a course when the add button is clicked
document.getElementById('js-add-button').addEventListener('click', ()=> {
  getCourses();
  renderCourses();
});

//calculates the gpa when the calculate gpa button is clicked
document.getElementById('js-calculate').addEventListener('click', ()=> {
  renderGpa();
});

//renders the gpa on the page
function renderGpa() {
  const gpa = calculateGpa();
  document.querySelector('.js-cgpa-container').innerHTML = `
    GPA: ${gpa.toFixed(2)}
  `
}

///calculates the cgpa when the cgpa button is clicked
document.getElementById('cgpa-button').addEventListener('click', ()=> {
  const cgpa = calculateCgpa();
  console.log(cgpa.toFixed(2));
});