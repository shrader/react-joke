import React, { Component, useState } from "react";
import axios from "axios";
import JokeList from "./JokeList";

/** App component. Renders list of jokes. */

function App() {

  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const numJokesToGet = 5;

  async function setNewJokes() {
    try {
      // load jokes one at a time, adding not-yet-seen jokes
      setJokes([]);
      let newJokes =[];
      let seenJokes = new Set();

      while (newJokes.length < numJokesToGet) {
        let res = await axios.get("https://icanhazdadjoke.com", {
          headers: { Accept: "application/json" }
        });
        let { ...joke } = res.data;

        if (!seenJokes.has(joke.id)) {
          seenJokes.add(joke.id);
          newJokes.push({ ...joke, votes: 0 });
        } else {
          console.log("duplicate found!");
        }
      }
      setJokes([...newJokes]);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  function startLoading() {
    setIsLoading(true);
  }

  function mapVote(jokes, id, delta) {
   return jokes.map(j =>
      j.id === id ? { ...j, votes: j.votes + delta } : j
    )
  }

  function vote(id, delta) {
    setJokes(jokes => (mapVote(jokes, id, delta)));
  }




  return (
    <div className="App">
        <JokeList jokes={jokes} isLoading={isLoading} setNewJokes={setNewJokes} setIsLoading={startLoading} vote={vote}/>
      </div>
  )
}



export default App;
