
"use strict";

// IMPORTANT:
// Replace this with the academy's real WhatsApp number.
// Format: country code + mobile number, digits only.
// Example format: 919876543210
const WHATSAPP_NUMBER = "917892527138";

 

const teachers = [
  {
    name: "Geetha Poojari",
    role: "FOUNDER & PRINCIPAL",
    image: "images/teacher.png",
    bio: "Senior Bharatanatyam teacher with 20+ years of experience. Certified in Bharatanatyam board examinations, with Vidvat qualifications in Music and Yoga."
  },
  {
    name: "Smt. Akshara",
    role: "BHARATANATYAM INSTRUCTOR",
    image: "images/assis.png",
    bio: "Bharatanatyam instructor with 10 years of teaching experience. Completed classical dance examinations through the Gandharva Mahavidyalaya board."
  },
  {
    name: "Smt. Gagana",
    role: "STUDENT TRAINING",
    image: "images/image.png",
    bio: "Classically trained dancer who has completed official board examinations through Gandharva Mahavidyalaya. Assists with student training and provides personal attention."
  }
];


 
const studentGroups = [
  {
    name: "Vidvat",
    description: "Advanced learning",
    students: ["Ichara ", " Sharvya ","Manognya","Lisha"]
  },
  {
    name: "Senior",
    description: "Senior-level students",
    students: ["Ananya", "Kavya","Sanjana","Meera","Lakshmi","Revathi","Impana","Khyathi","Yuktha","Amrutha"]
  },
  {
    name: "Junior",
    description: "Junior-level students",
    students: ["Spoorthi", " Priya","Ramya","Bhavya","Rachana","Swathi","Nandhini","Riya","Shursti","Asha"]
  },
  {
    name: "Beginners",
    description: "Foundational training",
    students: ["Ramitha", "VishnuPriya","Pallavi","Saanika","ManuShree"]
  },
  {
    name: "New Joiners",
    description: "Recently enrolled students",
    students: ["Yashika", "Shree Gowri","Swathi","Nithya","Poornima"]
  }
];


const schedule = [
  {
    level: "Vidvat",
    days: "Saturday",
    time: "9:00–11:00 AM",
    teacher: "Principal Teacher"
  },
  {
    level: "Senior",
    days: "Saturday",
    time: "4:00–5:30 PM",
    teacher: "Senior Instructor"
  },
  {
    level: "Junior",
    days: "Sunday",
    time: "10:00–11:00 AM",
    teacher: "Senior Instructor"
  },
  {
    level: "Beginners",
    days: "Wednesday & Friday",
    time: "5:00–6:00 PM",
    teacher: "Assistant Instructor"
  },
  {
    level: "New Joiners",
    days: "Sunday",
    time: "11:30 AM–12:30 PM",
    teacher: "Assistant Instructor"
  }
];

const teacherList = document.getElementById("teacherList");
const categoryFilters = document.getElementById("categoryFilters");
const studentList = document.getElementById("studentList");
const scheduleBody = document.getElementById("scheduleBody");

// Footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Display teacher profiles
teachers.forEach(teacher => {
  const card = document.createElement("article");
  card.className = "teacher-card";

  const photo = document.createElement("div");
  photo.className = "teacher-image";
  photo.setAttribute("role", "img");
  photo.setAttribute("aria-label", "Teacher profile photograph");

  photo.style.backgroundImage =
    `url("${teacher.image}")`;

  const info = document.createElement("div");
  info.className = "teacher-info";

  const role = document.createElement("div");
  role.className = "teacher-role";
  role.textContent = teacher.role;

  const name = document.createElement("h3");
  name.textContent = teacher.name;

  const bio = document.createElement("p");
  bio.textContent = teacher.bio;

  info.append(role, name, bio);
  card.append(photo, info);
  teacherList.appendChild(card);
});

// Display the student category buttons
const allFilter = document.createElement("button");
allFilter.type = "button";
allFilter.className = "category-btn active";
allFilter.textContent = "All Categories";
allFilter.dataset.category = "all";
categoryFilters.appendChild(allFilter);

studentGroups.forEach(group => {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "category-btn";
  button.textContent = group.name;
  button.dataset.category = group.name;

  categoryFilters.appendChild(button);
});

// Render student cards for a selected category
function renderStudents(category = "all") {
  studentList.replaceChildren();

  const groups = category === "all"
    ? studentGroups
    : studentGroups.filter(group => group.name === category);

  groups.forEach(group => {
    const card = document.createElement("article");
    card.className = "student-card";

    const title = document.createElement("h3");
    title.textContent = group.name;

    const description = document.createElement("p");
    description.className = "student-count";
    description.textContent = group.description;

    const list = document.createElement("ul");

    group.students.forEach(student => {
      const item = document.createElement("li");
      item.textContent = student;
      list.appendChild(item);
    });

    card.append(title, description, list);
    studentList.appendChild(card);
  });
}

categoryFilters.addEventListener("click", event => {
  const button = event.target.closest(".category-btn");

  if (!button) return;

  categoryFilters.querySelectorAll(".category-btn")
    .forEach(item => {
      item.classList.toggle("active", item === button);
    });

  renderStudents(button.dataset.category);
});

// Display the class timetable
schedule.forEach(item => {
  const row = document.createElement("tr");

  [item.level, item.days, item.time, item.teacher]
    .forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

  scheduleBody.appendChild(row);
});

// Trial class enquiry
const bookingForm = document.getElementById("bookingForm");
const formMessage = document.getElementById("formMessage");

bookingForm.addEventListener("submit", event => {
  event.preventDefault();
  formMessage.textContent = "";

  if (!bookingForm.reportValidity()) return;

  const name = document.getElementById("studentName").value.trim();
  const age = document.getElementById("ageGroup").value;
  const level = document.getElementById("experience").value;
  const preferredTime = document.getElementById("preferredTime").value;
  const phone = document.getElementById("phone").value.trim();

  if (!name || !/^[6-9]\d{9}$/.test(phone)) {
    formMessage.textContent =
      "Please enter a name and a valid 10-digit Indian mobile number.";
    return;
  }

  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    formMessage.textContent =
      "Please configure the academy's WhatsApp number in script.js.";
    return;
  }

  const message = [
    "Namaste! I would like to enquire about a Bharatanatyam trial class.",
    "",
    `Student name: ${name}`,
    `Age group: ${age}`,
    `Current level: ${level}`,
    `Preferred batch: ${preferredTime}`,
    `Contact number: ${phone}`,
    "",
    "Please share the available trial class dates and details.",
    "Thank you!"
  ].join("\n");

  const url = "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);

  // Open WhatsApp; the visitor must review and send the message.
  window.open(url, "_blank", "noopener,noreferrer");

  formMessage.textContent =
    "Your enquiry is ready. Review the message in WhatsApp and press Send.";
});

renderStudents();
