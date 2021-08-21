import React from 'react'
import { Card } from 'react-bootstrap'

const Book = ({ book, setBookDetail, bookDetail }) => {
    return (
        <Card onClick={() => setBookDetail(book.id)} className={`${bookDetail === book.id ? "book-select" : ""} book`}>
            <Card.Body>
                {book.name}
            </Card.Body>
        </Card>
    )
}

export default Book
