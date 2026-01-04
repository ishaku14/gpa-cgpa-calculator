import { state } from './state.js';
import { courses } from './course.js'

const gradeScale = {
    A: 5,
    B: 4,
    C: 3,
    D: 2,
    E: 1,
    F: 0
  }

export function calculateGpa() {
  let totalUnits = 0;
  let totalGradePoints = 0;
  
  const targetSemester = state.semester === 'first' ? courses.firstSemester : courses.secondSemester;

  //calculates total units and total grade points
  targetSemester.forEach((course, i) => {
    totalUnits += course.unit;
    totalGradePoints += gradeScale[course.grade] * course.unit;
  });

  return totalUnits > 0 ? (totalGradePoints / totalUnits) : 0
}

export function calculateCgpa() {
  let totalGradePoints = 0;
  let totalUnits = 0;
  
  const totalCourses = [...courses.firstSemester, ... courses.secondSemester];
  
  totalCourses.forEach((course, i) => {
    totalUnits += course.unit;
    totalGradePoints += gradeScale[course.grade] * course.unit;
  });
  
  return totalUnits > 0 ? (totalGradePoints / totalUnits) : 0;
}

export const renderResults = () => {
  const cgpaElement = document.getElementById('cgpa');
  const gpaElement = document.getElementById('semester-gpa');
  
  cgpaElement.textContent = calculateCgpa().toFixed(2);

  gpaElement.textContent = state.semester === 'first' ?
    `First Semester GPA: ${calculateGpa().toFixed(2)}` :
    `Second Semester GPA: ${calculateGpa().toFixed(2)}`;
}