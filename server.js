const { ApolloServer, gql, PubSub } = require('apollo-server');
const pubsub = new PubSub();

const typeDefs = gql`
	type Post {
		message: String!
		date: String!
	}

	type Channel {
		posts: [Post!]!
	}

	type Query {
		channel: [Channel!]!
	}

	type Mutation {
		addPost(channel: String!, message: String!): Post!
		addChannel(channelName: String!): Channel!
	}

	type Subscription {
		newPost(channel: String!): Post!
		newChannel: Channel!
    }`

const data = [
    { channel: 'channel1', posts: [ { message: 'hello world', date: new Date() } ] },
	{ channel: 'channel2', posts: [ { message: 'dlrow olleh', date: new Date() } ] }
]

const resolvers = {
	Query: {
		channel: () => {
			return data
		}
	},
	Mutation: {
		addPost: (_, { channel }, { message }) => {
			const post = { message, date: new Date() }
			data.filter(channel).push(post)
			pubsub.publish('NEW_POST', { newPost: post }) // Publish!
			return post
		},
		addChannel: (_, { channelName }) => {
			const channel = {channel: channelName, post: []}
			data.push(channel)
			return channel
		}
	},
	Subscription: {
		newPost: {
			subscribe: () => pubsub.asyncIterator('NEW_POST')
		},
		newChannel: {
			subscribe: () => pubsub.asyncIterator('NEW_CHANNEL')
		}
	}
}

const server = new ApolloServer({ 
	typeDefs, 
	resolvers 
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});