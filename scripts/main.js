import {state} from './state.js';
import {firstSemesterCourses, secondSemesterCourses, getCourses, renderCourses} from './course.js';
import { calculateGpa, calculateCgpa } from './calculation.js';

renderCourses();

//first and second semester toggle 
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

//handles the level selection logic, if the user selects a level that is not 100L, then an input field to insert previous cgpa is displayed on the page
const levelSelectElement = document.getElementById('level-input');
const previousCgpaContainer = document.getElementById('previous-cgpa-group');

levelSelectElement.addEventListener('change', ()=> {
  state.currentLevel = Number(levelSelectElement.value);
  state.currentLevel === 100? previousCgpaContainer.classList.add('hidden'): previousCgpaContainer.classList.remove('hidden');
});

document.querySelector('.cgpa-submit-button').addEventListener('click', ()=> {
  const previousCgpaInput = document.getElementById('previous-cgpa');
  state.previousCgpa =  Number(previousCgpaInput.value);
});

const semesterElement = document.getElementById('js-semester-select');
semesterElement.addEventListener('change', (event)=> {
  state.semester = event.target.value;
  renderCourses();
});

document.getElementById('js-add-button').addEventListener('click', ()=> {
  getCourses();
  renderCourses();
});

document.getElementById('js-calculate').addEventListener('click', ()=> {
  renderGpa();
});

//this block of code just displays the gpa for a semester on the page
function renderGpa() {
  const gpa = calculateGpa();
  document.querySelector('.js-cgpa-container').innerHTML = `
    GPA: ${gpa.toFixed(2)}
  `
}

//calculates the cgpa when the cgpa button is clicked
document.getElementById('cgpa-button').addEventListener('click', ()=> {
  const cgpa = calculateCgpa();
  console.log(cgpa.toFixed(2));
});