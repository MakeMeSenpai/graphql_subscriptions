import logo from './logo.svg';
import './App.css';
// dependencies
import { useLazyQuery } from '@apollo/client'
import PostsForChannel from './queries/PostsForChannel'

function App() {
  const [loadPosts, { called, loading, data }] = useLazyQuery(
    PostsForChannel,
    { 
      variables: { channel: 'Main'},
      fetchPolicy: "network-only",
      pollInterval: 3000
    }
  )
  if (called && loading) {
    return <div>loading...</div>
  }
  if (!called) {
    return <button onClick={() => loadPosts()}>Load Posts</button> 
  }
  return (
    <div className="App">
      {data.posts.map(post => {
        const { message, date } = post
        return <p>{message} {date}</p>
      })}
    <button onClick={() => loadPosts()}>Load Posts</button> 
    </div>
  );
}

export default App;
