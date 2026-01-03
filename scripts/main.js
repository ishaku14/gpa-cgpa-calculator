import { state } from './state.js';
import { getCourses, renderCourses } from './course.js';
import { renderResults } from './calculation.js'

renderCourses();
renderResults();


//handles semester selection from dropdown
const semesterElement = document.getElementById('js-semester-select');
semesterElement.addEventListener('change', (event)=> {
  state.semester = event.target.value;
  renderCourses();
  renderResults();
});

//adds a course when the add button is clicked
document.getElementById('js-add-button').addEventListener('click', ()=> {
  getCourses();
  renderCourses();
  renderResults();
});
