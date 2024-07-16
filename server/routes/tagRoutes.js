import   express from "express";
const router = express.Router();


// Mock data for tags
const tags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'];

router.get('/', (req, res) => {
  res.json(tags);
});

export default router