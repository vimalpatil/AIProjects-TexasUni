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
];

let displayedCourses = [];

const courseListEl = document.getElementById("courseList");
const filterEl = document.getElementById("categoryFilter");

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
loadCourses();

function renderCourses(list) {
  list.forEach(course => {
    const card = createCourseCard(course);
    courseListEl.appendChild(card);
  });
}

//Implement filtering logic here

loadCourses(); 
