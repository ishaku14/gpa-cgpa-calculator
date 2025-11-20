import {state} from './state.js';
import { firstSemesterCourses, secondSemesterCourses } from './course.js';

export function calculateGpa() {
  //selects the appropriate courses array based on the current semester in state
  const courses = state.semester === 'first'? firstSemesterCourses: secondSemesterCourses;

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

  //calculates total units and total grade points
  courses.forEach((course, i) => {
    totalUnits += course.unit;
    totalGradePoints += gradeScale[course.grade] * course.unit;
  });

  //calculates semester gpa
  const semesterGpa = totalGradePoints / totalUnits;

  return semesterGpa;
}

export function calculateCgpa() {
  //combines courses from both semesters
  const courses = [...firstSemesterCourses, ...secondSemesterCourses];

  let totalUnits = 0;
  let totalGradePoints = 0;
  const gradeScale = {A: 5, B: 4, C: 3, D: 2, E: 1, F: 0};
  
  //calculates total units and total grade points
  courses.forEach((course, i) => {
    totalUnits += course.unit;
    totalGradePoints += gradeScale[course.grade] * course.unit;
  });

  //calculates cgpa
  let cgpa = totalUnits > 0? totalGradePoints/totalUnits: 0;

  //if previous cgpa exists and current level is not 100, averages the previous cgpa with the current cgpa
  if(state.previousCgpa && state.currentLevel !== 100) {
    cgpa = (state.previousCgpa + cgpa) / 2;
  }

  return cgpa;
}