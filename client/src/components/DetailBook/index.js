import React from 'react'
import { Card } from 'react-bootstrap'
import { useQuery } from '@apollo/client'
import { getSingleBook } from '../../graphql/query'

const DetailBook = ({ bookDetail }) => {
    const { loading, error, data } = useQuery(getSingleBook, {
        variables: {
            id: bookDetail
        }
    })
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error loading books</div>
    const { author, name, genre } = data.book
    return (
        <>
            <h1 className="my-2">DetailBook</h1>
            <Card className="book my-2" >
                <Card.Body >
                    <Card.Title className="row">
                        <span className="col-6 text-start"> Detail books :</span>
                        <span className="col-6">  {name}</span>

                    </Card.Title>
                    <Card.Title className="row">
                        <span className="col-6 text-start"> Genre :</span>
                        <span className="col-6">  {genre}</span>
                    </Card.Title>
                    <Card.Title className="row">
                        <span className="col-6 text-start"> Author:</span>
                        <span className="col-6">{author.name}</span>
                    </Card.Title>
                    <Card.Title className="row">
                        <span className="col-6 text-start"> Author age:</span>
                        <span className="col-6">{author.age}</span>
                    </Card.Title>
                    <ul >
                        <p className="text-start font-weight-bold">List book of this Author:</p>

                        {author.books?.map((book) => {
                            return <li className="text-start " key={book.id}>{book.name}</li>
                        })}
                    </ul>
                </Card.Body>
            </Card >
        </>
    )
}

export default DetailBook
