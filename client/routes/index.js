async function fetchAuthor(id) {
  let author = await fetch(`${process.env.LOCAL_URL}/api/authors/${id}`).then(
    (resp) => resp.json()
  );
  return author;
}
async function fetchAuthors() {
  let authors = await fetch(`${process.env.LOCAL_URL}/api/authors`).then(
    (resp) => resp.json()
  );
  return authors;
}
async function saveAuthor(body) {
  await fetch(`${process.env.LOCAL_URL}/api/authors`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((resp) => resp.json())
    .then((res) => res);
}
async function updateAuthor(id) {
  let author = await fetch(`${process.env.LOCAL_URL}/api/authors/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
  return author;
}
async function deleteAuthor(id) {
  await fetch(`${process.env.LOCAL_URL}/api/authors/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
}
async function saveBook(body) {
  await fetch(`${process.env.LOCAL_URL}/api/books`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}
async function fetchBook(id) {
  let book = await fetch(`${process.env.LOCAL_URL}/api/books/${id}`).then(
    (resp) => resp.json()
  );
  return book;
}
async function fetchBooks() {
  const response = await fetch(`http://localhost:3001/api/books`);
  if (!response.ok) {
    const message = `An error has occurred: ${response.statusText}`;
    console.error(message);
    return;
  }
  const books = await response.json();
  if (!books) {
    console.warn(`book with id ${id} not found`);
    navigate("/");
    return;
  }
  console.log(books)
  return books;
}
async function updateBook(book) {
  fetch(`/api/books/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: book,
  });
}
async function deleteBook(id) {
  fetch(`/api/books/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
async function fetchUsers() {
  fetch(`/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
async function fetchUser(id) {
  fetch(`/api/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
async function saveUser() {
  fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: user,
  });
}
async function updateUser(id) {
  fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: user,
  });
}
async function deleteUser(id) {
  fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

module.exports = {fetchAuthor, fetchAuthors, updateAuthor, saveAuthor, deleteAuthor, fetchBooks, fetchBook, saveBook, updateBook, deleteBook}