import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { getAuthors } from '../../graphql/query'
import { addSingleAuthor } from '../../graphql/mutate'
import { useMutation } from '@apollo/client'

const FormAddAuthor = () => {
    const [formAddAuthor, setFormAddAuthor] = useState({
        name: "",
        age: 0,

    })
    const [addAuthor, dataMutation] = useMutation(addSingleAuthor)
    const { name, age } = formAddAuthor
    const handleChange = (e) => {
        setFormAddAuthor({ ...formAddAuthor, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, parseInt(age))
        addAuthor({
            variables: {
                name,
                age: parseInt(age),
            },
            refetchQueries: [{ query: getAuthors }]
        })
        setFormAddAuthor({ ...formAddAuthor, [e.target.name]: "" })
    }
    return (
        <>
            <h1 className="my-2">Create new Author</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Control className="my-2" name="name" placeholder="Name" value={name} onChange={handleChange} />
                <Form.Control className="my-2" name="age" type="number" placeholder="Age" value={age} onChange={handleChange} />
                <Button className="my-2" onClick={handleSubmit} className="btn btn-success" >Add Author</Button>
            </Form>
        </>
    )
}

export default FormAddAuthor
