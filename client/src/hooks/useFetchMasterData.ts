// hooks.ts
import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface RoleData {
  id: string;
  name: string;
}

interface FetchRoleData {
  _id: string;
  name: string;
}

export const useFetchRoles = () => {
  const [roleData, setRoleData] = useState<RoleData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/role/getRoles`);
        if (response.ok) {
          const data: FetchRoleData[] = await response.json();
          const transformedRoles: RoleData[] = data.map((role) => ({
            id: role._id,
            name: role.name,
          }));
          setRoleData(transformedRoles);
        } else {
          throw new Error("Failed to fetch roles");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };
    fetchRoles();
  }, []);

  return { roleData, error };
};

export const useFetchTeams = () => {
  const [teamData, setTeamData] = useState<RoleData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/team/getTeams`);
        if (response.ok) {
          const data: FetchRoleData[] = await response.json();
          const transformedTeams: RoleData[] = data.map((team) => ({
            id: team._id,
            name: team.name,
          }));
          setTeamData(transformedTeams);
        } else {
          throw new Error("Failed to fetch teams");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    };
    fetchTeams();
  }, []);

  return { teamData, error };
};
