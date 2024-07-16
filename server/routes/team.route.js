import express from "express";
import { addUserTeam, createTeam, getTeams, getUsersWithTeams } from "../controllers/team.controller.js";

const router = express.Router();
// Create a new team
router.post('/create', createTeam)
// Add a user to a team
router.post('/:teamId/add-user', addUserTeam)
// Get a team's details
// router.get('/:teamId', getTeams)
// Get a all teams
router.get('/getTeams', getTeams)
router.get('/teams', getUsersWithTeams) 
export default router;