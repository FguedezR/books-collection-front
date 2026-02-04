const btnUsers = document.getElementById("btn-users");
const btnBooks = document.getElementById("btn-books");
const container = document.getElementById("container");
const loader = document.getElementById("loader");

const API_URL = "http://localhost:3000";

// mostrar y ocultar usuario
const toggleLoader = () => loader.classList.toggle("hidden");

// pintar usuario
const printUsers = (users) => {
  container.innerHTML = "";
  users.forEach((user) => {
    container.innerHTML += `
            <div class="card">
                <h3>Usuario: ${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Libros: ${user.books.join(", ")}</p>
                <p>Wishlist: ${user.wishlist.join(", ")}</p>
            </div>
        `;
  });
};

// pintar Libros
const printBooks = (books) => {
  container.innerHTML = "";
  books.forEach((book) => {
    container.innerHTML += `
            <div class="card">
                <img src="${book.image}" alt="${book.title}">
                <h3>Libro${book.title}</h3>
                <p>✍️<b>Autor:</b> ${book.author}</p>
                <p><b>Publicado:</b> ${book.year}</p>
            </div>
        `;
  });
};

// eventos
btnUsers.addEventListener("click", async () => {
  toggleLoader();
  try {
    const res = await fetch(`${API_URL}/users`);
    const data = await res.json();
    printUsers(data);
  } catch (err) {
    alert("Error conectando al servidor");
  } finally {
    toggleLoader();
  }
});

btnBooks.addEventListener("click", async () => {
  toggleLoader();
  try {
    const res = await fetch(`${API_URL}/books`);
    const data = await res.json();
    printBooks(data);
  } catch (err) {
    alert("Error conectando al servidor");
  } finally {
    toggleLoader();
  }
});
