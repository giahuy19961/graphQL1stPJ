import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client'
import { getAuthors, getBooks } from '../../graphql/query'
import { addSingleBook } from '../../graphql/mutate'

const FormAddBook = () => {
    const { loading, error, data } = useQuery(getAuthors)
    const [addBook, dataMutation] = useMutation(addSingleBook)
    const [formAddBook, setFormAddBook] = useState({
        name: "",
        genre: "",
        authorId: "",
    })
    const { name, genre, authorId } = formAddBook
    const handleChange = (e) => {
        setFormAddBook({ ...formAddBook, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addBook({
            variables: {
                name,
                genre,
                authorId,
            },
            refetchQueries: [{ query: getBooks }]
        })
        setFormAddBook({ ...formAddBook, [e.target.name]: "" })
    }

    const renderAuthorOption = (authors) => {
        return authors?.map((author) => {
            return <option value={author.id}>{author.name}</option>
        })
    }
    return (
        <>
            <h1 className="my-2">Add new book</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Control className="my-2" name="name" placeholder="Name" value={name} onChange={handleChange} />
                <Form.Control className="my-2" name="genre" placeholder="Genre" value={genre} onChange={handleChange} />
                <select className="select-menu" onChange={handleChange} name="authorId">
                    <option value="" selected disabled hidden>Select Author</option>
                    {(!loading && !error) ? renderAuthorOption(data.authors) : <div>Loading...</div>}

                </select>
                <Button onClick={handleSubmit} className="btn btn-success my-2">Add Book</Button>
            </Form >
        </>
    )
}

export default FormAddBook
