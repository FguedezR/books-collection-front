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
  if (!Array.isArray(users)) return;

  users.forEach((user) => {
    // nombres en español que suelen venir en estas APIs
    const nombreCompleto = `${user.nombre || user.name || "Sin nombre"} ${user.apellidos || ""}`;
    const email = user.email || user.correo || "No disponible";

    // colección y wishlist pueden venir como arrays de objetos o strings
    const libros = Array.isArray(user.coleccionLibros)
      ? user.coleccionLibros.join(", ")
      : "Vacía";
    const wishlist = Array.isArray(user.wishlist)
      ? user.wishlist.join(", ")
      : "Vacía";

    container.innerHTML += `
            <div class="card">
                <h3>👤 ${nombreCompleto}</h3>
                <p>📧 <b>Email:</b> ${email}</p>
                <p>📚 <b>Colección:</b> ${libros}</p>
                <p>⭐ <b>Wishlist:</b> ${wishlist}</p>
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
                <img src="${book.imagen}" alt="${book.title}">
                <h3><strong>${book.titulo}</strong></h3>
                <p><strong>Autor:</strong> ${book.autor}</p>
                <p><b>Publicado:</b> ${book.fechaPublicacion}</p>
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

    console.log("Datos recibidos de libros:", data);

    printBooks(data);
  } catch (err) {
    console.error(err);
    alert("Error conectando al servidor");
  } finally {
    toggleLoader();
  }
});
