import { gql } from "@apollo/client";

const getBooks = gql`
 query getBookQuery {
     books {
         name,
         id
     }  
 }

`

const getSingleBook = gql`
  query getBookQuery($id:ID!) {
      book(id:$id){
          id,
          name,
          genre,
          author{
              id,
              name,
              age,
              books{
                  id,
                  name
                  }
        }
      }
  }
`

const getAuthors = gql`
   query getAuthorQuery { 
       authors{
           name,
           age,
           id
       }

   }
`

export { getBooks, getSingleBook, getAuthors }