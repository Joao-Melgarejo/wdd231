const byuiCourse = {
  code: "WDD 231",
  name: "Web Frontend Development I",
  sections: [
    {
      sectionNumber: 1,
      instructor: "Brother Johnson",
      enrolled: 28,
      room: "STC 353",
    },
    {
      sectionNumber: 2,
      instructor: "Sister Smith",
      enrolled: 31,
      room: "STC 347",
    },
    {
      sectionNumber: 3,
      instructor: "Brother Brown",
      enrolled: 26,
      room: "Online",
    },
  ],

  changeEnrollment(sectionNumber, add = true) {
    const section = this.sections.find(
      (section) => section.sectionNumber === sectionNumber,
    );

    if (!section) {
      return;
    }

    if (add) {
      section.enrolled += 1;
    } else if (section.enrolled > 0) {
      section.enrolled -= 1;
    }
  },
};

export default byuiCourse;
