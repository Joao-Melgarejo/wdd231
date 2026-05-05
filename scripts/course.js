const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Web Frontend Development I",
    credits: 2,
    completed: false,
  },
];

const courseCards = document.querySelector("#course-cards");
const totalCredits = document.querySelector("#total-credits");

const allButton = document.querySelector("#all");
const wddButton = document.querySelector("#wdd");
const cseButton = document.querySelector("#cse");

function displayCourses(courseList) {
  courseCards.innerHTML = "";

  courseList.forEach((course) => {
    const courseCard = document.createElement("div");
    courseCard.classList.add("course-card");

    if (course.completed) {
      courseCard.classList.add("completed");
      courseCard.innerHTML = `✓ ${course.subject} ${course.number}`;
    } else {
      courseCard.textContent = `${course.subject} ${course.number}`;
    }

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
