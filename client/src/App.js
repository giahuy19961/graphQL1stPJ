import logo from './logo.svg';
import './App.css';
import BookList from './components/BookList';
import FormAddBook from './components/FormAddBook';
import FormAddAuthor from './components/FormAddAuthor';
import DetailBook from './components/DetailBook';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useState } from 'react';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

function App() {
  const [bookDetail, setBookDetail] = useState(null)

  return (
    <ApolloProvider client={client}>
      <div className="App">

        <div className="container wrap mt-2">
          <h1 className="my-2 heading">Book List App By Graphql</h1>
          <div className="row my-2">
            <div className="col-6"><FormAddBook /></div>
            <div className="col-6"><FormAddAuthor /></div>
          </div>
          <div className="row">
            <div className="col-6"><BookList setBookDetail={setBookDetail} bookDetail={bookDetail} /></div>
            {bookDetail !== null ?
              <div className="col-6"><DetailBook bookDetail={bookDetail} /></div> : ""}
          </div>
        </div>
      </div>
    </ApolloProvider>

  );
}

export default App;
