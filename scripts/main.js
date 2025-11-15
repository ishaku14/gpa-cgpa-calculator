const firstSemesterCourses = [];
const secondSemesterCourses = [];

let currentLevel = null;
let previousCgpa = null;
let semester = 'first'

//handles the level selection logic, if the user selects a level that is not 100L, then an input field to insert previous cgpa is displayed on the page
const levelSelectElement = document.getElementById('level-input');
const previousCgpaContainer = document.getElementById('previous-cgpa-group');

levelSelectElement.addEventListener('change', ()=> {
  currentLevel = Number(levelSelectElement.value);
  currentLevel === 100? previousCgpaContainer.classList.add('hidden'): previousCgpaContainer.classList.remove('hidden');
});

document.querySelector('.cgpa-submit-button').addEventListener('click', ()=> {
  const previousCgpaInput = document.getElementById('previous-cgpa');

  previousCgpa =  Number(previousCgpaInput.value);

});

const semesterElement = document.getElementById('js-semester-select');
semesterElement.addEventListener('change', (event)=> {
  semester = event.target.value;
  renderCourses();
});

function getCourses() {
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

  if(semester === 'first') {
    firstSemesterCourses.push({
      coursecode,
      unit,
      grade
    });
    
  } else if (semester === 'second') {
    secondSemesterCourses.push({
      coursecode,
      unit,
      grade
    });
  }

  courseCodeElement.value = '';
  unitElement.value = '';
  gradeElement.value = '';
}

document.getElementById('js-add-button').addEventListener('click', ()=> {
  getCourses();
  renderCourses();
});

function calculateGpa() {
  const courses = semester === 'first'? firstSemesterCourses: secondSemesterCourses;

  let totalUnits = 0;
  let totalGradePoints = 0;
  const gradeScale = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0
  }

  courses.forEach((course, i) => {
    totalUnits += course.unit;
    totalGradePoints += gradeScale[course.grade] * course.unit;
  });

  const semesterGpa = totalGradePoints / totalUnits;

  return semesterGpa;
}

function calculateCgpa() {
  const courses = [...firstSemesterCourses, ...secondSemesterCourses];

  let totalUnits = 0;
  let totalGradePoints = 0;
  const gradeScale = {A: 5, B: 4, C: 3, D: 2, E: 1, F: 0};
  
  courses.forEach((course, i) => {
    totalUnits += course.unit;
    totalGradePoints += gradeScale[course.grade] * course.unit;
  });

  let cgpa = totalUnits > 0? totalGradePoints/totalUnits: 0;

  if(previousCgpa && currentLevel !== 100) {
    cgpa = (previousCgpa + cgpa) / 2;
  }

  return cgpa;
}

document.getElementById('js-calculate').addEventListener('click', ()=> {
  renderGpa();
});

//this rendercourses function displays the courses on the page dependinng on the semester that is active
function renderCourses() {
  let coursesHtml = '';

  const courses = semester === 'first'? firstSemesterCourses: secondSemesterCourses;

  courses.forEach(course => {
    coursesHtml += `
      <div class="course">
        <div>${course.coursecode}</div>
        <div>${course.unit}</div>
        <div>${course.grade}</div>
        <button class="delete-button js-delete-button">Delete</button>
      </div>
    `;
  });
  document.querySelector('.js-course-display-container').innerHTML = coursesHtml;

  document.querySelectorAll('.js-delete-button').forEach((button, i) => {
    button.addEventListener('click', ()=> {
      courses.splice(i, 1);
      renderCourses();
    });
  });
}

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