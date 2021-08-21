const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')



async function startApolloServer() {
    // Load schema and resolver
    const typeDefs = require('./schema/index')
    const resolvers = require('./resolver/index')
    // Load Db Methods
    const mongoDbMethods = require('./data/db')
    const connectDB = async () => {
        try {
            await mongoose.connect("mongodb+srv://giahuy:1207@cluster0.q9hip.mongodb.net/graphqlEx?retryWrites=true&w=majority",
                {
                    useCreateIndex: true,
                    useFindAndModify: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            console.log("Mongodb connected successfully!")
        } catch (error) {
            console.log(error);
            process.exit(1)
        }
    }
    connectDB()
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
            mongoDbMethods
        })
    })
    await server.start();

    const app = express()
    server.applyMiddleware({ app })


    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
    })

    return { server, app }
}

// run app with Apollo
startApolloServer()

