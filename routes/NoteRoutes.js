const express = require("express");
const router = express.Router();
const Note = require("../models/NotesModel");
// Create a new Note
router.post("/notes", (req, res) => {
  const { noteTitle, noteDescription, priority } = req.body;
  const note = new Note({
    noteTitle,
    noteDescription,
    priority,
  });

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Retrieve all Notes
router.get("/notes", (req, res) => {
  Note.find()
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Retrieve a single Note with noteId
router.get("/notes/:noteId", (req, res) => {
  const noteId = req.params.noteId;

  Note.findById(noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + noteId,
        });
      }
      res.json(note);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Update a Note with noteId
router.put("/notes/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  const { noteTitle, noteDescription, priority } = req.body;

  Note.findByIdAndUpdate(
    noteId,
    {
      noteTitle,
      noteDescription,
      priority,
      dateUpdated: Date.now(),
    },
    { new: true }
  )
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + noteId,
        });
      }
      res.json(note);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete a Note with noteId
router.delete("/notes/:noteId", (req, res) => {
  const noteId = req.params.noteId;

  Note.findByIdAndRemove(noteId)
    .then((note) => {
      if (!note) {
        return res.status(404).send({
          message: "Note not found with id " + noteId,
        });
      }
      res.json({ message: "Note deleted successfully!" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;
