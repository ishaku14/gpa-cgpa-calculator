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

  if(!coursecode || !unit || !grade) {
    alert('Please fill all the fields');
    return;
  }

  if(state.semester === 'first') {
    firstSemesterCourses.push({
      coursecode,
      unit,
      grade
    });
    
  } else if (state.semester === 'second') {
    secondSemesterCourses.push({
      coursecode,
      unit,
      grade
    });
  }

  localStorage.setItem('firstSemesterCourses', JSON.stringify(firstSemesterCourses));
  localStorage.setItem('secondSemesterCourses', JSON.stringify(secondSemesterCourses));

  courseCodeElement.value = '';
  unitElement.value = '';
  gradeElement.value = '';
}

//this rendercourses function displays the courses on the page dependinng on the semester that is active
export function renderCourses() {
  let coursesHtml = '';

  const courses = state.semester === 'first'? firstSemesterCourses: secondSemesterCourses;

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

  document.querySelectorAll('.js-delete-icon').forEach((button, i) => {
    button.addEventListener('click', ()=> {
      courses.splice(i, 1);
      localStorage.setItem(courses === firstSemesterCourses? 'firstSemesterCourses': 'secondSemesterCourses', JSON.stringify(courses));
      console.log(firstSemesterCourses)
      renderCourses();
    });
  });
}