import { Book } from "../types/book";

export const mockBooks: Book[] = [
  {
    id: "1",
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    price: 59.9,
    release_year: 1954,
    description: "Uma jornada épica pela Terra Média.",
    categories: [{ id: "1", name: "Fantasia" }],
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    price: 39.9,
    release_year: 1949,
    description: "Uma distopia sobre vigilância e controle social.",
    categories: [
      { id: "3", name: "Ficção Científica" },
      { id: "4", name: "Distopia" },
      { id: "100", name: "MOOOO" },
    ],
  },
  {
    id: "3",
    title: "Dom Casmurro",
    author: "Machado de Assis",
    price: 29.9,
    release_year: 1899,
    categories: [
      { id: "5", name: "Romance" },
      { id: "6", name: "Clássico Brasileiro" },
    ],
  },
  {
    id: "4",
    title: "Harry Potter e a Pedra Filosofal",
    author: "J.K. Rowling",
    price: 49.9,
    release_year: 1997,
    categories: [
      { id: "1", name: "Fantasia" },
      { id: "2", name: "Aventura" },
    ],
  },
  {
    id: "5",
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    price: 19.9,
    release_year: 1943,
    categories: [
      { id: "7", name: "Infantil" },
      { id: "8", name: "Fábula" },
    ],
  },
  {
    id: "6",
    title: "A Revolução dos Bichos",
    author: "George Orwell",
    price: 34.9,
    release_year: 1945,
    categories: [
      { id: "4", name: "Distopia" },
      { id: "9", name: "Política" },
    ],
  },
  {
    id: "7",
    title: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    price: 54.9,
    release_year: 1967,
    categories: [
      { id: "10", name: "Realismo Mágico" },
      { id: "5", name: "Romance" },
    ],
  },
  {
    id: "8",
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    price: 44.9,
    release_year: 1813,
    categories: [
      { id: "5", name: "Romance" },
      { id: "11", name: "Drama" },
    ],
  },
  {
    id: "9",
    title: "O Código Da Vinci",
    author: "Dan Brown",
    price: 42.9,
    release_year: 2003,
    categories: [
      { id: "12", name: "Suspense" },
      { id: "13", name: "Mistério" },
    ],
  },
  {
    id: "10",
    title: "A Menina que Roubava Livros",
    author: "Markus Zusak",
    price: 39.9,
    release_year: 2005,
    categories: [
      { id: "5", name: "Romance" },
      { id: "11", name: "Drama" },
    ],
  },
];
