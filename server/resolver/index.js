const { books, authors } = require("../data/static")
const Author = require("../models/Author")
const Book = require("../models/Book")

const resolvers = {
    //QUERY
    Query: {
        books: async (parent, args, { mongoDbMethods }) => await mongoDbMethods.getAllBooks(),
        book: async (parent, { id }, { mongoDbMethods }) => await mongoDbMethods.getBookById(id),
        authors: async (parent, args, { mongoDbMethods }) => await mongoDbMethods.getAllAuthors(),
        author: async (parent, { id }, { mongoDbMethods }) => await mongoDbMethods.getAuthorById(id),
    },
    Book: {
        author: async ({ authorId }, args, { mongoDbMethods }) => await mongoDbMethods.getAuthorById(authorId),
    },
    Author: {
        books: async ({ id }, args, { mongoDbMethods }) => await mongoDbMethods.getAllBooks({ authorId: id })
    },

    //MUTATION
    Mutation: {
        createAuthor: async (parent, args, { mongoDbMethods }) => await mongoDbMethods.createAuthor(args),
        createBook: async (parent, args, { mongoDbMethods }) => await mongoDbMethods.createBook(args),
    }

}

module.exports = resolvers