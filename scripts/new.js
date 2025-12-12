main.js

import {state} from './state.js';
import {firstSemesterCourses, secondSemesterCourses, getCourses, renderCourses} from './course.js';
import { calculateGpa, calculateCgpa } from './calculation.js';

const levelSelectElement = document.getElementById('level-input');
const levelWarningElm = document.getElementById('level-warning')
const previousCgpaContainer = document.getElementById('previous-cgpa-group');
const previousCgpaInput = document.getElementById('previous-cgpa');
const prevCgpaWarningElm = document.getElementById('prev-cgpa-warning');
const firstSemToggleElm = document.querySelector('.first-semester-courses');
const secondSemToggleElm = document.querySelector('.second-semester-courses');
const resultsCardElm = document.querySelector('.results-card');
const firstSemGpaElm = document.getElementById('sem1-gpa');
const secondSemGpaElm = document.getElementById('sem2-gpa');
const cgpaDisplayElm = document.getElementById('result-cgpa');

renderCourses();

//handles enabling/disabling of action buttons based on level selection
const addCourseBtn = document.getElementById('js-add-button');
const calculateGpaBtn = document.getElementById('js-calculate');
const calculateCgpaBtn = document.getElementById('cgpa-button');

//initially disable buttons and show warning
[addCourseBtn, calculateGpaBtn, calculateCgpaBtn].forEach(btn => btn.disabled = true);

// Listen for level selection
levelSelectElement.addEventListener('change', () => {
  const selectedLevel = Number(levelSelectElement.value);
  state.currentLevel = selectedLevel;

  if(selectedLevel) {
    // Enable buttons when a level is selected
    [addCourseBtn, calculateGpaBtn, calculateCgpaBtn].forEach(btn => btn.disabled = false);
    levelWarningElm.style.display = 'none';
  } else {
    // Disable buttons if no level is selected
    [addCourseBtn, calculateGpaBtn, calculateCgpaBtn].forEach(btn => btn.disabled = true);
    levelWarningElm.style.display = 'block';
  }

  // Show/hide previous CGPA input for 200L+ students
  state.currentLevel === 100? previousCgpaContainer.classList.add('hidden'): previousCgpaContainer.classList.remove('hidden');
});


//handles previous cgpa submission
previousCgpaInput.addEventListener('input', () => {
  
  const prevCgpa = previousCgpaInput.value.trim();

  if(isNaN(prevCgpa) || prevCgpa < 0 || prevCgpa > 5) {
    prevCgpaWarningElm.textContent = `Please enter a valid CGPA between 0.00 and 5.00`;
    // previousCgpaInput.value = '';
    state.previousCgpa = null;
    prevCgpaWarningElm.style.display = 'block';
  } else if(prevCgpa === '') {
    prevCgpaWarningElm.textContent = `Please Enter your previous CGPA to continue!`;
    state.previousCgpa = null;
    prevCgpaWarningElm.style.display = 'block';
  } else {
    state.previousCgpa = Number(parseFloat(prevCgpa).toFixed(2));
    prevCgpaWarningElm.style.display = 'none';
  }
});

//handles semester toggle buttons
firstSemToggleElm.addEventListener('click', () => {
  state.semester = 'first';
  renderCourses();
});

secondSemToggleElm.addEventListener('click', () => {
  state.semester = 'second';
  renderCourses();
});

//handles semester selection from dropdown
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
  if(firstSemesterCourses.length === 0 && secondSemesterCourses.length === 0) {
    alert('No courses added!\nPlease add courses to calculate GPA.');
    return;
  }

  const firstSemGpa = calculateGpa('first') || 0;
  const secondSemGpa = calculateGpa('second') || 0;

  firstSemGpaElm.textContent = firstSemGpa.toFixed(2);
  secondSemGpaElm.textContent = secondSemGpa.toFixed(2);
  
  resultsCardElm.style.display = 'block';
}

///calculates the cgpa when the cgpa button is clicked
document.getElementById('cgpa-button').addEventListener('click', ()=> {
  const cgpa = calculateCgpa();

  if(firstSemesterCourses.length === 0 && secondSemesterCourses.length === 0) {
    alert('No courses added!\nPlease add courses to calculate CGPA.');
    return;
  }

  cgpaDisplayElm.textContent = cgpa.toFixed(2);
});