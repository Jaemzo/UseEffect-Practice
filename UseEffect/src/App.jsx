import { useEffect, useState } from "react";

function App() {
  const [results, setResults] = useState(null);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (date === "") return;
    fetch(
      `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${date} `,
    )
      .then((res) => res.json())
      .then((results) => {
        setResults(results);
      })
      .catch((err) => console.error(err));
  }, [date]);

  return (
    <div>
      <h2>Zero</h2>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value.split("-").join(""))}
      ></input>
      <div>{JSON.stringify(results, 2)}</div>
    </div>
  );
}

export default App;
