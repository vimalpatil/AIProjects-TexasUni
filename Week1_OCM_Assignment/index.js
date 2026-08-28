const courses = [
  {
    id: 1,
    title: "Modern JavaScript from Scratch",
    category: "programming",
    price: 29,
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d"
  },
  {
    id: 2,
    title: "UI Design Fundamentals",
    category: "design",
    price: 24,
    image: "https://plus.unsplash.com/premium_photo-1661412938808-a0f7be3c8cf1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "Business Strategy Basics",
    category: "business",
    price: 35,
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  },
  {
    id: 4,
    title: "React for Beginners",
    category: "programming",
    price: 32,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "Creative Branding Essentials",
    category: "design",
    price: 27,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
  }
];

let displayedCourses = [];

const courseListEl = document.getElementById("courseList");
const filterEl = document.getElementById("categoryFilter");
const themeToggleBtn = document.getElementById("themeToggle");

function createCourseCard(course) {
  const card = document.createElement("div");
  card.className = "course-card";

  card.innerHTML = `
    <img src="${course.image}" alt="${course.title}" />
    <div class="course-content">
      <h3>${course.title}</h3>
      <p>Category: ${course.category}</p>
      <p class="price">$${course.price}</p>
    </div>
  `;

  return card;
}

function loadCourses() {
  displayedCourses = courses;
  renderCourses(displayedCourses);
}
// Event listener to filter courses based on selected category
filterEl.addEventListener("change", () => {
  const selectedCategory = filterEl.value;
  if (selectedCategory === "all") {
    displayedCourses = courses;
  } else {
    displayedCourses = courses.filter(course => course.category === selectedCategory);
  }
  renderCourses(displayedCourses);
});
loadCourses();

function renderCourses(list) {
  courseListEl.innerHTML = "";
  list.forEach(course => {
    const card = createCourseCard(course);
    courseListEl.appendChild(card);
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggleBtn.textContent = isDarkMode ? "☀️ Light" : "🌙 Dark";
}

filterEl.addEventListener("change", () => {
  const selectedCategory = filterEl.value;
  if (selectedCategory === "all") {
    displayedCourses = courses;
  } else {
    displayedCourses = courses.filter(course => course.category === selectedCategory);
  }
  renderCourses(displayedCourses);
});

themeToggleBtn.addEventListener("click", toggleTheme);

loadCourses();
