import { state } from './state.js';
import { getCourses, renderCourses } from './course.js';
import { renderResults } from './calculation.js'

renderCourses();
renderResults();


//toggles between the two semesters
const semesterRadioElms = document.querySelectorAll('input[name="semester"]');

semesterRadioElms.forEach(radio => {
  radio.addEventListener('change', () => {
    if(radio.checked) {
      state.semester = radio.value;
      renderCourses();
      renderResults();
    }
  })
});

//adds a course when the add button is clicked
document.getElementById('js-add-button').addEventListener('click', ()=> {
  getCourses();
  renderCourses();
  renderResults();
});
