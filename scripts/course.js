const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: true,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces basic programming concepts, problem solving, variables, decision structures, loops, and functions.",
    technology: ["Python"],
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: true,
    certificate: "Web and Computer Programming",
    description:
      "This course focuses on writing programs using functions, parameters, return values, logic, and structured problem solving.",
    technology: ["Python"],
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: true,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces object-oriented programming principles such as classes, objects, encapsulation, inheritance, and abstraction.",
    technology: ["C#"],
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces web development fundamentals including HTML, CSS, responsive design, accessibility, and basic website structure.",
    technology: ["HTML", "CSS"],
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true,
    certificate: "Web and Computer Programming",
    description:
      "This course focuses on adding dynamic behavior to websites using JavaScript, DOM manipulation, events, arrays, objects, and local storage.",
    technology: ["HTML", "CSS", "JavaScript"],
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    completed: false,
    certificate: "Web and Computer Programming",
    description:
      "This course builds frontend development skills using responsive design, JavaScript modules, APIs, JSON data, forms, accessibility, and performance best practices.",
    technology: ["HTML", "CSS", "JavaScript", "JSON", "APIs"],
  },
];

const courseCards = document.querySelector("#course-cards");
const totalCredits = document.querySelector("#total-credits");
const courseDetails = document.querySelector("#course-details");

const allButton = document.querySelector("#all");
const wddButton = document.querySelector("#wdd");
const cseButton = document.querySelector("#cse");

function displayCourseDetails(course) {
  courseDetails.innerHTML = `
    <button id="close-modal" class="close-modal" type="button" aria-label="Close course details">❌</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits:</strong> ${course.credits}</p>
    <p><strong>Certificate:</strong> ${course.certificate}</p>
    <p><strong>Description:</strong> ${course.description}</p>
    <p><strong>Technology Stack:</strong> ${course.technology.join(", ")}</p>
  `;

  courseDetails.showModal();

  const closeModal = document.querySelector("#close-modal");
  closeModal.addEventListener("click", () => {
    courseDetails.close();
  });
}

courseDetails.addEventListener("click", (event) => {
  if (event.target === courseDetails) {
    courseDetails.close();
  }
});

function displayCourses(courseList) {
  courseCards.innerHTML = "";

  courseList.forEach((course) => {
    const courseCard = document.createElement("button");
    courseCard.type = "button";
    courseCard.classList.add("course-card");

    if (course.completed) {
      courseCard.classList.add("completed");
      courseCard.textContent = `✓ ${course.subject} ${course.number}`;
    } else {
      courseCard.textContent = `${course.subject} ${course.number}`;
    }

    courseCard.addEventListener("click", () => {
      displayCourseDetails(course);
    });

    courseCards.appendChild(courseCard);
  });

  const credits = courseList.reduce(
    (total, course) => total + course.credits,
    0,
  );

  totalCredits.textContent = `The total credits for courses listed below is ${credits}`;
}

allButton.addEventListener("click", () => {
  displayCourses(courses);
});

wddButton.addEventListener("click", () => {
  const wddCourses = courses.filter((course) => course.subject === "WDD");
  displayCourses(wddCourses);
});

cseButton.addEventListener("click", () => {
  const cseCourses = courses.filter((course) => course.subject === "CSE");
  displayCourses(cseCourses);
});

displayCourses(courses);
