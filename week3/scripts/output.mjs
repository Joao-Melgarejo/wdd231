export function setTitle(course) {
  const courseTitle = document.querySelector("#course-title");

  courseTitle.textContent = `${course.code}: ${course.name}`;
}

export function renderSections(sections) {
  const sectionsBody = document.querySelector("#sections");

  sectionsBody.innerHTML = "";

  sections.forEach((section) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${section.sectionNumber}</td>
      <td>${section.instructor}</td>
      <td>${section.enrolled}</td>
      <td>${section.room}</td>
    `;

    sectionsBody.appendChild(row);
  });
}
