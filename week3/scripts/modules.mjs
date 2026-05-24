import byuiCourse from "./course.mjs";
import { setSectionSelection } from "./sections.mjs";
import { setTitle, renderSections } from "./output.mjs";

setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);

document.querySelector("#enrollStudent").addEventListener("click", () => {
  const sectionNumber = Number(document.querySelector("#sectionNumber").value);

  byuiCourse.changeEnrollment(sectionNumber);
  renderSections(byuiCourse.sections);
});

document.querySelector("#dropStudent").addEventListener("click", () => {
  const sectionNumber = Number(document.querySelector("#sectionNumber").value);

  byuiCourse.changeEnrollment(sectionNumber, false);
  renderSections(byuiCourse.sections);
});

document.querySelector("#currentyear").textContent = new Date().getFullYear();
