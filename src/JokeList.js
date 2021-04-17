import React, { useEffect } from "react";
import Joke from "./Joke";
import "./JokeList.css";

/** List of jokes. */
function JokeList({jokes, isLoading, setNewJokes, setIsLoading, vote}){

  //const [votes, setVotes] = useState()
  
  useEffect(function() {
    setNewJokes();
  }, [])

   /* empty joke list, set to loading state, and then call getJokes */
  function generateNewJokes() {
    console.log("hit generate new jokes");
    setIsLoading(true);
    console.log("isLoading?", isLoading);
    setNewJokes();
  }

  let sortedJokes = [...jokes].sort((a, b) => b.votes - a.votes);
  if (isLoading) {
    return (
      <div className="loading">
        <i className="fas fa-4x fa-spinner fa-spin" />
      </div>
    )
  }

  return (
    <div className="JokeList">
        <button
          className="JokeList-getmore"
          onClick={generateNewJokes}
        >
          Get New Jokes
        </button>

        {sortedJokes.map(j => (
          <Joke
            text={j.joke}
            key={j.id}
            id={j.id}
            votes={j.votes}
            vote={vote}
          />
        ))}
      </div>
  );
}



export default JokeList;
