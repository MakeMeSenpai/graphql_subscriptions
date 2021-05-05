const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();

const typeDefs = gql`
	type Post {
		message: String!
		date: String!
	}

	type Query {
		posts: [Post!]!
	}

	type Mutation {
		addPost(message: String!): Post!
	}

	type Subscription {
		newPost: Post!
    }`

const data = [
    { message: 'hello world', date: new Date() }
]

const resolvers = {
	Query: {
		// Query types
	},
	Mutation: {
		// Mutation types
	},
	Subscription: {
		// Subscription types
	}
}