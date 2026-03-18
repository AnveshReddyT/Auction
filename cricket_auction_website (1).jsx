import React, { useState } from "react";

const teams = [
  { name: "360Devils", color: "bg-red-50 border-red-200" },
  { name: "TeamX", color: "bg-blue-50 border-blue-200" },
  { name: "RebelSquad", color: "bg-purple-50 border-purple-200" },
  { name: "SimpleStars", color: "bg-green-50 border-green-200" },
];

const initialPlayers = [
  "Jaya Krishna","Vinay Gogineni","Vivek Nanda","Kodanda Naidu Madala","Raj","Tarun","Charan","Dharma","Avinash","Vemu Chowdary","Ramesh","Sreenu","Haji Shaik","Vidya Sagar","Ayyappa","Mandeep (Ramesh)","Pranay Gopalam","Balu Gogineni","Naveen Reddy","Mighty Madan","Survi Sai Kumar","Jayavardhan (Beast)","Naresh","Mallikharjuna (Malli)","Bhanu","Mani","Dileep","Suresh","Ravikanthvennamalla (Bunty)","Vinoth","Shashi","Sandeep Reddy","Vivek Gudavalli","Anvesh","Virinchi","JaiRaj","Ganesh","Venkat","Prudhvi Reddy","Sunil","SaiTeja","Rajesh","Jalandher","Nagesh Parisineti"
].map((name, idx) => ({
  id: idx,
  name,
  sold: false,
  team: null,
  highlight: null,
  skills: { bat: false, bowl: false, field: false }
}));

export default function AuctionApp() {
  const [players, setPlayers] = useState(initialPlayers);

  const assignTeam = (id, teamName) => {
    setPlayers(prev => prev.map(p =>
      p.id === id ? { ...p, sold: true, team: teamName } : p
    ));
  };

  const toggleSkill = (id, skill) => {
    setPlayers(prev => prev.map(p =>
      p.id === id
        ? { ...p, skills: { ...p.skills, [skill]: !p.skills[skill] } }
        : p
    ));
  };

  const setHighlight = (id, type) => {
    setPlayers(prev => prev.map(p =>
      p.id === id ? { ...p, highlight: p.highlight === type ? null : type } : p
    ));
  };

  const remainingPlayers = players.filter(p => !p.sold);
  const teamPlayers = (teamName) => players.filter(p => p.team === teamName);

  const highlightStyle = (type) => {
    if (type === "strong") return "bg-green-100 border-l-4 border-green-500 shadow-sm";
    if (type === "weak") return "bg-red-100 border-l-4 border-red-500 shadow-sm";
    return "bg-gray-50";
  };

  const tableHighlight = (type) => {
    if (type === "strong") return "bg-green-100";
    if (type === "weak") return "bg-red-100";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 p-4">

      <h1 className="text-2xl font-semibold text-center mb-4 tracking-wide">🏏 Elite Auction Dashboard</h1>

      {/* TOP - TEAM TABLES */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        {teams.map(team => (
          <div key={team.name} className={`p-3 rounded-2xl border shadow-sm backdrop-blur ${team.color}`}>
            <h3 className="font-semibold mb-2 text-sm text-gray-700">{team.name}</h3>

            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="text-left">Name</th>
                  <th>Bat</th>
                  <th>Bowl</th>
                  <th>Field</th>
                </tr>
              </thead>
              <tbody>
                {teamPlayers(team.name).map(p => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td>{p.name}</td>
                    <td className="text-center">{p.skills.bat ? "✔" : ""}</td>
                    <td className="text-center">{p.skills.bowl ? "✔" : ""}</td>
                    <td className="text-center">{p.skills.field ? "✔" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-2 gap-4">

        {/* ALL PLAYERS */}
        <div className="bg-white/90 backdrop-blur p-3 rounded-2xl shadow border">
          <h2 className="text-lg mb-2 font-medium">All Players</h2>

          {remainingPlayers.map(p => (
            <div key={p.id} className={`flex items-center justify-between p-2 rounded mb-1 text-xs transition-all duration-150 ${highlightStyle(p.highlight)}`}>

              <span className="w-1/4 truncate font-medium">{p.name}</span>

              <div className="flex gap-1">
                {["bat","bowl","field"].map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(p.id, skill)}
                    className={`px-2 py-0.5 rounded transition ${p.skills[skill] ? "bg-yellow-300" : "bg-gray-200 hover:bg-gray-300"}`}
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {!p.sold && (
                <div className="flex gap-1">
                  <button
                    onClick={() => setHighlight(p.id, "strong")}
                    className="px-2 py-0.5 bg-green-200 hover:bg-green-300 rounded"
                  >
                    ★
                  </button>
                  <button
                    onClick={() => setHighlight(p.id, "weak")}
                    className="px-2 py-0.5 bg-red-200 hover:bg-red-300 rounded"
                  >
                    !
                  </button>
                </div>
              )}

              {!p.sold ? (
                <select
                  onChange={(e) => assignTeam(p.id, e.target.value)}
                  defaultValue=""
                  className="text-xs border rounded px-1 py-1 bg-white hover:border-gray-400"
                >
                  <option value="" disabled>Select</option>
                  {teams.map(t => (
                    <option key={t.name} value={t.name}>{t.name}</option>
                  ))}
                </select>
              ) : (
                <span className="text-gray-400 text-xs">{p.team}</span>
              )}

            </div>
          ))}
        </div>

        {/* AVAILABLE PLAYERS */}
        <div className="bg-white/90 backdrop-blur p-3 rounded-2xl shadow border">
          <h2 className="text-lg mb-2 font-medium">Available Players</h2>

          <table className="w-full text-xs">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="text-left">Name</th>
                <th>Bat</th>
                <th>Bowl</th>
                <th>Field</th>
                <th>Tag</th>
              </tr>
            </thead>
            <tbody>
              {remainingPlayers.map(p => (
                <tr key={p.id} className={`border-b transition ${tableHighlight(p.highlight)}`}>
                  <td className="font-medium">{p.name}</td>
                  <td className="text-center">{p.skills.bat ? "✔" : ""}</td>
                  <td className="text-center">{p.skills.bowl ? "✔" : ""}</td>
                  <td className="text-center">{p.skills.field ? "✔" : ""}</td>
                  <td className="text-center">
                    {p.highlight === "strong" ? "★" : p.highlight === "weak" ? "!" : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
