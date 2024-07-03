import express from "express";
import { addUserTeam, createTeam, getTeams } from "../controllers/team.controller.js";

const router = express.Router();
// Create a new team
router.post('/create', createTeam)
// Add a user to a team
router.post('/:teamId/add-user', addUserTeam)
// Get a team's details
router.get('/:teamId', getTeams)
// Get a all teams
router.get('/teams', getTeams)
export default router;