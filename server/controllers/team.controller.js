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

export const getUsersWithTeams = async (req, res) => {
  try {
    const teams = await Team.find()
        .populate({
          path: 'members',
          select: 'username profilePicture',
        })
        .exec();
        const allUsers = await AppUser.find({}, 'username profilePicture').exec();
        // Get all member IDs from the teams
    const teamMemberIds = teams.reduce((acc, team) => {
      return acc.concat(team.members.map(member => member._id.toString()));
    }, []);

    // Filter users who are not in the teamMemberIds
    const remainingUsers = allUsers.filter(user => !teamMemberIds.includes(user._id.toString()));

    // Combine teams and remaining users into a single response
    res.json({ teams, remainingUsers });
} catch (error) {
    console.error('Error fetching teams with member details:', error);
    throw error;
}
};
