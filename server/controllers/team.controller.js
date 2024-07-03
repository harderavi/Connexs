import AppUser from "../models/appuser.model.js";
import Team from "../models/team.model.js";

export const createTeam = async(req, res, next)=>{
    const { name, memberIds } = req.body;

    try {
      const team = new Team({
        name,
        members: memberIds,
      });
  
      await team.save();
  
      res.status(201).send({ message: 'Team created successfully', team });
    } catch (err) {
      res.status(500).send({ message: 'Server error' });
    }
}
export const addUserTeam= async (req, res) => {
    const { teamId } = req.params;
    const { memberId } = req.body;
  
    try {
      const team = await Team.findById(teamId);
      if (!team) {
        return res.status(404).send({ message: 'Team not found' });
      }
  
      const user = await AppUser.findById(memberId);
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      team.members.push(memberId);
      await team.save();
  
      res.status(200).send({ message: 'Member added to team', team });
    } catch (err) {
      res.status(500).send({ message: 'Server error' });
    }
  };
export  const getTeams = async (req, res) => {
    try { 
        const teams = await Team.find();
        res.json(teams);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};