/////////////////////////////////////////////
//// API endpoints for managing exercises //
///////////////////////////////////////////

const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// Your Challenge: Make five routes. Each will use mongojs methods
// to interact with your mongoDB database, as instructed below.
// You will be using express Router and Mongoose
// -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/

// 1. get all exercise logs on record
// GET: /
// ========================================

router.get("/", async (req, res) => {
  try {
    const exercise = await Exercise.find();
    res.send(exercise);
  } catch (err) {
    console.log(err);
    res.send("Cannot find collection");
  }
});

// 2. add a new exercise log
// POST: /add
// ========================================
router.post("/add", async (req, res) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.send(exercise);
  } catch (err) {
    console.log(err);
    res.send("Cannot Add Collection");
  }
});
// 3. retrieve a specfic exercise log
// GET: /:id
// ========================================
router.get("/:id", async (req, res) => {
  try {
    const eId = await Exercise.findById(req.params.id);
    res.send(eId);
  } catch (err) {
    console.log(err);
    res.send("Cannot get Id");
  }
});
// 4. delete a specfic exercise log
// DELETE: /:id
// ========================================
router.delete("/:id", async (req, res) => {
  try {
    const deleteBy = await Exercise.deleteOne({ _id: req.params.id });
    console.log(`${deleteBy} has been deleted`);
    res.send(deleteBy);
  } catch (err) {
    console.log(err);
    res.send(`cannot delete ${deleteBy}`);
  }
});
// 5. retrieve a specific exercise log and update it
// with information sent by client on req body
// POST: /update/:id
// ========================================

router.post("/update/:id", async (req, res) => {
  try {
    const post = await Exercise.findById(req.params.id);
    post.set(req.body);
    const result = await post.save();
    res.send(result);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
