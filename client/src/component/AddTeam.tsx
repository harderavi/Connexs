import { useEffect, useState } from "react";
import InputText from "./ui/InputText";
import Button from "./ui/Button";
import { BiPlus } from "react-icons/bi";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface Team {
  name: string;
}

const AddTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [message, setMessage] = useState("");
  const handleCreateTeam = async () => {
    if (teamName === "") {
      return setMessage("Name field is required");
    }
    const response = await fetch(`${API_BASE_URL}/api/team/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: teamName }),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
    } else {
      console.log("Team created succesfully");
      fetchTeams();
      setTeamName("");
    }
  };
  const fetchTeams = async () => {
    console.log("Team fetech");
    const response = await fetch(`${API_BASE_URL}/api/team/teams`, {
      method: "GET",
    });
    const data = await response.json();

    if (!response.ok) {
      console.error(data.message);
    } else {
      setTeams(data);
    }
  };
  // Function to generate a color based on a string input
function stringToColor(str: string) {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Convert hash to hex color
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return `#${"00000".substring(0, 6 - color.length)}${color}`;
  }
  useEffect(() => {
    fetchTeams();
  }, []);
  return (
    <div className="max-w-sm mx-auto">
      <div>
        <h2 className="uppercase">Teams</h2>
        {teams && (
          <ul className=" relative">
            {teams.map((team) => (
              <li className="flex gap-x-2 mb-2"><span className="text-white w-6 h-6 flex justify-center items-center rounded-full text-xs uppercase" style={{ backgroundColor: stringToColor(team.name) }}>{team.name.slice(0, 2)}</span> {team.name}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
      <h2><BiPlus/> Add a team</h2>
      <div className="flex flex-col gap-3">

      <InputText
        label="Team Name"
        type="text"
        name="teamname"
        onChange={(e) => setTeamName(e.target.value)}
        value={teamName}
        />
      <Button clickHandle={handleCreateTeam} className='w-full' >Save</Button>
        </div>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default AddTeam;
