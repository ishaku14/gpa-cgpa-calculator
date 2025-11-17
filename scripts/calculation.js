import {state} from './state.js';
import { firstSemesterCourses, secondSemesterCourses } from './course.js';

export function calculateGpa() {
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

  courses.forEach((course, i) => {
    totalUnits += course.unit;
    totalGradePoints += gradeScale[course.grade] * course.unit;
  });

  const semesterGpa = totalGradePoints / totalUnits;

  return semesterGpa;
}

export function calculateCgpa() {
  const courses = [...firstSemesterCourses, ...secondSemesterCourses];

  let totalUnits = 0;
  let totalGradePoints = 0;
  const gradeScale = {A: 5, B: 4, C: 3, D: 2, E: 1, F: 0};
  
  courses.forEach((course, i) => {
    totalUnits += course.unit;
    totalGradePoints += gradeScale[course.grade] * course.unit;
  });

  let cgpa = totalUnits > 0? totalGradePoints/totalUnits: 0;

  if(state.previousCgpa && state.currentLevel !== 100) {
    cgpa = (state.previousCgpa + cgpa) / 2;
  }

  return cgpa;
}