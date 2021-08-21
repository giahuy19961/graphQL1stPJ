const Book = require('../models/Book')
const Author = require('../models/Author')

const mongoDbMethods = {
    getAllBooks: async (id = null) => id === null ? await Book.find() : await Book.find(id),
    getAllAuthors: async () => await Author.find(),
    getBookById: async id => await Book.findById(id),
    getAuthorById: async id => await Author.findById(id),
    createAuthor: async agrs => {
        const newAuthor = new Author(agrs)
        return await newAuthor.save()
    },
    createBook: async agrs => {
        const newBook = new Book(agrs)
        return await newBook.save()
    }
}


module.exports = mongoDbMethods