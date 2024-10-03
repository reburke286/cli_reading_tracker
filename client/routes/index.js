const fetch = require("node-fetch");
const { getAuthor } = require("../../server/controllers/author-controller");
module.exports = {
  async fetchAuthor(id) {
    let author = await fetch(`${process.env.LOCAL_URL}/api/authors/${id}`).then(
      (resp) => resp.json()
    );
    return author;
  },
  async fetchAuthors() {
    let authors = await fetch(`${process.env.LOCAL_URL}/api/authors`).then(
      (resp) => resp.json()
    );
    return authors;
  },
  async saveAuthor(body) {
    await fetch(`${process.env.LOCAL_URL}/api/authors`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
  },
  async updateAuthor(id) {
    let author = await fetch(`${process.env.LOCAL_URL}/api/authors/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((resp) => resp.json());
    return author;
  },
  async deleteAuthor(id) {
    await fetch(`${process.env.LOCAL_URL}/api/authors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
  },
  fetchBooks() {
    fetch(`/api/books`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  fetchBook(id) {
    fetch(`/api/books/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  saveBook(book) {
    fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: book,
    });
  },
  updateBook(book) {
    fetch(`/api/books/${book.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: book,
    });
  },
  deleteBook(id) {
    fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  fetchUsers() {
    fetch(`/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  fetchUser(id) {
    fetch(`/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  saveUser() {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    });
  },
  updateUser(id) {
    fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    });
  },
  deleteUser(id) {
    fetch(`/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
