import React, { useEffect } from 'react'
import Book from '../Book'
import { Container, Row, Col } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { getBooks } from '../../graphql/query'

const BookList = ({ setBookDetail, bookDetail }) => {
    const { loading, error, data } = useQuery(getBooks)
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error loading books</div>
    console.log(data)

    const renderCard = (books) => {
        return books?.map((book) => {
            return <Col key={book.id}>
                <Book book={book} setBookDetail={setBookDetail} bookDetail={bookDetail} />
            </Col>
        })
    }

    return (
        <Container>
            <h1 className="my-2">List books</h1>
            <Row>
                {renderCard(data.books)}
            </Row>
        </Container>
    )
}

export default BookList
