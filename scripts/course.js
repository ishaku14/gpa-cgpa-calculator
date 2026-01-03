import { state } from './state.js';
import { renderResults } from './calculation.js'
export const courses = JSON.parse(localStorage.getItem('courses')) || {
  firstSemester: [],
  secondSemester: []
};

function saveCourses() {
  localStorage.setItem('courses', JSON.stringify(courses));
}

function showMessage(text, type) {
  const messageElm = document.querySelector('.js-message');
  
  messageElm.innerText = text;
  messageElm.className = `pop-up-message js-message ${type}`;

  setTimeout(() => {
    messageElm.innerText = '';
  }, 1500);
}

export function renderCourses() {
  let coursesHtml = '';

  //selects the appropriate courses array based on the current semester in state
  const course = state.semester === 'first'? courses.firstSemester : courses.secondSemester;

  //generates the html for each course
  course.forEach((course, i) => {
    coursesHtml += `
      <div class="course">
        <div>${i + 1}.</div>
        <div>${course.coursecode}</div>
        <div>${course.unit}</div>
        <div>${course.grade}</div>
        <button class="delete-button js-delete-button">
          <img src="icons/delete-icon.svg" alt="delete icon" class="delete-icon js-delete-icon">
        </button>
      </div>
    `;
  });
  document.querySelector('.js-course-display-container').innerHTML = coursesHtml;

  //adds event listeners to the delete icons for each course
  document.querySelectorAll('.js-delete-button').forEach((button, i) => {
    button.addEventListener('click', ()=> {
      course.splice(i, 1);
      saveCourses();
      renderCourses();
      renderResults();
    });
  });
}

export function getCourses() {
  const courseCodeElement = document.getElementById('js-course-code');
  const unitElement = document.getElementById('js-unit');
  const gradeElement = document.getElementById('js-grade')

  const coursecode = courseCodeElement.value;
  const unit = Number(unitElement.value);
  const grade = gradeElement.value;

  //validates that all fields are filled
  if(!coursecode || !unit || !grade) {
    showMessage('Please fill all the fields', 'error');
    return;
  }

  //pushes the course to the appropriate semester array based on the current semester in state
  if(state.semester === 'first') {
    courses.firstSemester.push({
      coursecode,
      unit,
      grade
    });
  }else {
    courses.secondSemester.push({
      coursecode,
      unit,
      grade
    })
  }
  
  //persists the courses to local storage
  saveCourses();
  
  courseCodeElement.value = '';
  unitElement.value = '';
  gradeElement.value = '';
}