import { useEffect, useState } from "react";

function App() {
  const [results, setResults] = useState(null);
  const [date, setDate] = useState("");
  const [events, setEvents] = useState([]);
  const [compResults, setCompResults] = useState("");

  useEffect(() => {
    if (date === "") return;
    fetch(
      `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${date} `,
    )
      .then((res) => res.json())
      .then((results) => {
        setResults(results);
        setEvents(results.events);
        console.log(results.events[0]?.competitions[0]?.competitors);
      })
      .catch((err) => console.error(err));
  }, [date]);

  // useEffect(() => {
  //   if (competition === "") return;
  //   fetch(
  //     `https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${competition} `,
  //   )
  //     .then((res) => res.json())
  //     .then((compResults) => {
  //       setCompResults(compResults);
  //     })
  //     .catch((err) => console.error(err));
  // }, [competition]);

  return (
    <div>
      <h2>Zero</h2>
      <input
        type="date"
        onChange={(e) => setDate(e.target.value.split("-").join(""))}
      ></input>
      <div>
        {events.map((c, i) => (
          <Competition key={i} comp={c}></Competition>
        ))}
      </div>
    </div>
  );
}

function Competition({ comp }) {
  const teams = comp.competitions[0]?.competitors;
  const team1 = teams[0];
  const team2 = teams[1];
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <Team team={team1}></Team>
        </div>
        <p>VS.</p>
        <div>
          <Team team={team2}></Team>
        </div>
      </div>
    </>
  );

  //return teams.map((t, i) => <Team key={i} team={t}></Team>);
}

function Team({ team }) {
  console.log(team.records);

  const styles = {
    backgroundColor: "white",
    border: "1px solid black",
    marginTop: "5px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  return (
    <div style={styles}>
      <p style={{ color: `#${team.team.color}` }}>{team.team.displayName}</p>

      <p>{team.records[0]?.summary}</p>

      <img
        style={{ width: "150px" }}
        src={team.team.logo}
        alt={`${team.team.displayName} logo`}
      />

      {team.winner && <span className="winner">WINNER</span>}
    </div>
  );
}

export default App;
