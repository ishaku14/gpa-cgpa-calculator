import {state} from './state.js'

export const firstSemesterCourses = JSON.parse(localStorage.getItem('firstSemesterCourses')) || [];
export const secondSemesterCourses = JSON.parse(localStorage.getItem('secondSemesterCourses')) || [];

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
    firstSemesterCourses.push({coursecode, unit, grade});
    showMessage('Course Added successfully!', 'success')
  } else {
    secondSemesterCourses.push({coursecode, unit, grade});
  }

  //persists the courses to local storage
  localStorage.setItem('firstSemesterCourses', JSON.stringify(firstSemesterCourses));
  localStorage.setItem('secondSemesterCourses', JSON.stringify(secondSemesterCourses));

  //clears the input fields after adding a course
  courseCodeElement.value = '';
  unitElement.value = '';
  gradeElement.value = '';
}

//renders the courses on the page
export function renderCourses() {
  let coursesHtml = '';

  //selects the appropriate courses array based on the current semester in state
  const courses = state.semester === 'first'? firstSemesterCourses: secondSemesterCourses;

  //generates the html for each course
  courses.forEach((course, i) => {
    coursesHtml += `
      <div class="course">
        <div>${i + 1}.</div>
        <div>${course.coursecode}</div>
        <div>${course.unit}</div>
        <div>${course.grade}</div>
        <img src="icons/delete-icon.svg" alt="delete icon" class="delete-icon js-delete-icon">
      </div>
    `;
  });
  document.querySelector('.js-course-display-container').innerHTML = coursesHtml;

  //adds event listeners to the delete icons for each course
  document.querySelectorAll('.js-delete-icon').forEach((button, i) => {
    button.addEventListener('click', ()=> {
      courses.splice(i, 1);
      localStorage.setItem(courses === firstSemesterCourses? 'firstSemesterCourses': 'secondSemesterCourses', JSON.stringify(courses));
      console.log(firstSemesterCourses)
      renderCourses();
    });
  });
}

function showMessage(text, type) {
  const messageElm = document.querySelector('.js-message');
  
  messageElm.innerText = text;
  messageElm.className = `pop-up-message js-message ${type}`;

  setTimeout(() => {
    messageElm.innerText = '';
  }, 1000);

}