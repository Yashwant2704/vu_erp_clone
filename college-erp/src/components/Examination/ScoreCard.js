import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import '../Examination/ScoreCard.css';
const ScoreCard = () => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [studentDetails, setStudentDetails] = useState({});

  const handleStudentDetailsSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setStudentDetails(data);
    document.getElementById('studentDetails').style.display = 'none';
    document.getElementById('courseDetails').style.display = 'block';
  };

  const handleCourseDetailsSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setCourseDetails([...courseDetails, data]);
    event.target.reset();
    calculateAndDisplaySGPA();
    calculateAndDisplayCGPA();
  };

  const calculateAndDisplaySGPA = () => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    courseDetails.forEach(course => {
      const gradeValue = course.grade.toUpperCase();
      const credits = parseInt(course.credits);

      if (!isNaN(credits)) {
        totalCredits += credits;
        switch (gradeValue) {
          case 'O':
            totalGradePoints += 10 * credits;
            break;
          case 'A+':
            totalGradePoints += 9 * credits;
            break;
          case 'A':
            totalGradePoints += 8 * credits;
            break;
          case 'B+':
            totalGradePoints += 7 * credits;
            break;
          case 'B':
            totalGradePoints += 6 * credits;
            break;
          case 'C':
            totalGradePoints += 5 * credits;
            break;
          case 'P':
            totalGradePoints += 4 * credits;
            break;
          case 'F':
            totalGradePoints += 0 * credits;
            break;
          default:
            // Invalid grade
            break;
        }
      }
    });

    const sgpa = totalCredits !== 0 ? totalGradePoints / totalCredits : 0;
    document.getElementById('sgpaValue').textContent = sgpa.toFixed(2);
  };

  const calculateAndDisplayCGPA = () => {
    const totalSGPA = parseFloat(document.getElementById('sgpaValue').textContent);
    const totalSemesters = 1; // Just for now, calculating CGPA for the current semester
    const cgpa = totalSemesters !== 0 ? totalSGPA / totalSemesters : 0;
    document.getElementById('cgpaValue').textContent = cgpa.toFixed(2);
  };

  const generatePDF = () => {
    const studentName = studentDetails.studentName;
    const examMonth = studentDetails.examMonth;
    const examYear = studentDetails.examYear;
    const registrationYear = studentDetails.registrationYear;

    const sgpaDisplay = document.getElementById('sgpaValue');
    const cgpaDisplay = document.getElementById('cgpaValue');
    const gradeCard = document.getElementById('gradeCard');

    if (!sgpaDisplay || !cgpaDisplay || !gradeCard || courseDetails.length === 0) {
      console.error("Required elements for PDF generation not found or data missing");
      return;
    }

    const pdfContent = `
      <div style="margin: 0.5in;">
        <h2 style="text-align: center;">Grade Card</h2>
        <table style="margin: auto;">
          <tr>
            <td>Student Name:</td>
            <td>${studentName}</td>
          </tr>
          <tr>
            <td>PRN:</td>
            <td>${studentDetails.prn}</td>
          </tr>
          <tr>
            <td>Seat No:</td>
            <td>${studentDetails.seat}</td>
          </tr>
          <tr>
            <td>Year:</td>
            <td>${studentDetails.year}</td>
          </tr>
          <tr>
            <td>Semester:</td>
            <td>${studentDetails.semester}</td>
          </tr>
          <tr>
            <td>Exam Month:</td>
            <td>${examMonth}</td>
          </tr>
          <tr>
            <td>Exam Year:</td>
            <td>${examYear}</td>
          </tr>
          <tr>
            <td>Year of Registration:</td>
            <td>${registrationYear}</td>
          </tr>
        </table>
      </div>
      <div style="margin: 0.5in;">
        ${gradeCard.outerHTML}
      </div>
      <div style="margin: 1in; text-align: center;">
        <table style="margin: 0.5in;">
          <tr>
            <td>SGPA</td>
            <td>CGPA</td>
          </tr>
          <tr>
            <td>${sgpaDisplay.textContent}</td>
            <td>${cgpaDisplay.textContent}</td>
          </tr>
        </table>
      </div>
    `;

    const options = {
      filename: 'grade_card.pdf',
      image: { type: 'png', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(pdfContent).set(options).outputPdf('bloburl').then(function (pdfUrl) {
      window.open(pdfUrl, '_blank');
    });
  };

  return (
    <div className='container'>
      <section id="studentDetails">
        <h2>Student Details</h2>
        <form id="studentDetailsForm" onSubmit={handleStudentDetailsSubmit}>
          <label htmlFor="prn">PRN:</label>
          <input type="text" id="prn" name="prn" required />
          <label htmlFor="seat">Seat No:</label>
          <input type="number" id="seat" name="seat" required />
          <label htmlFor="year">Year:</label>
          <input type="text" id="year" name="year" required />
          <label htmlFor="semester">Semester:</label>
          <input type="text" id="semester" name="semester" required />
          <label htmlFor="studentName">Student Name:</label>
          <input type="text" id="studentName" name="studentName" required />
          <label htmlFor="examMonth">Exam Month:</label>
          <input type="text" id="examMonth" name="examMonth" required />
          <label htmlFor="examYear">Exam Year:</label>
          <input type="text" id="examYear" name="examYear" required />
          <label htmlFor="registrationYear">Year of Registration:</label>
          <input type="text" id="registrationYear" name="registrationYear" required />
          <button type="submit">Next</button>
        </form>
      </section>

      <section id="courseDetails" style={{ display: 'none' }}>
        <h2>Course Details</h2>
        <form id="ourseDetailsForm" onSubmit={handleCourseDetailsSubmit}>
<label htmlFor="courseCode">Course Code:</label>
<input type="text" id="courseCode" name="courseCode" required />
<label htmlFor="courseTitle">Course Title:</label>
<input type="text" id="courseTitle" name="courseTitle" required />
<label htmlFor="credits">Credits:</label>
<input type="number" id="credits" name="credits" required />
<label htmlFor="grade">Grade:</label>
<input type="text" id="grade" name="grade" required />
<button type="submit">Add Course</button>
</form>
<table id="gradeCard">
      <thead>
        <tr>
          <th>Course Code</th>
          <th>Course Title</th>
          <th>Credits</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {courseDetails.map((course, index) => (
          <tr key={index}>
            <td>{course.courseCode}</td>
            <td>{course.courseTitle}</td>
            <td>{course.credits}</td>
            <td>{course.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <div id="sgpaDisplay">SGPA: <span id="sgpaValue">0.00</span></div>
    <div id="cgpaDisplay">CGPA: <span id="cgpaValue">0.00</span></div>
    <button id="generateGradeCard" onClick={generatePDF}>Generate Grade Card</button>
  </section>

  {/* Container for PDF content */}
  <div id="pdfContent" style={{ display: 'none' }}>
    <div id="studentInfo"></div>
    <table id="pdfGradeCard">
      <tbody>
        {courseDetails.map((course, index) => (
          <tr key={index}>
            <td>{course.courseCode}</td>
            <td>{course.courseTitle}</td>
            <td>{course.credits}</td>
            <td>{course.grade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
);
};
export default ScoreCard;