const { User, Thought } = require("../models");


module.exports = {
    // Get thoughts
    getThoughts(req, res) {
        Thought.find()
        .select('-__v')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    // Get thought by _id
    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.thoughtId})
        .then((thought) => 
        !thought
            ? res.status(404).json({message: "no thoughts with ID exist"})
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create Thought 
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => {
          User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: req.params.thoughtId } },
            { new: true }
          );
            res.json(thought);
        })
        .catch((err) => res.status(500).json(err));
    },
    // Update Thought 
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.thoughtId}, {$set: req.body}, {new: true})
        .then((thought) =>  
            !thought
                ? res.status(404).json({message: "No Thought with this ID"})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Delete Thought 
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.thoughtId})
        .then((thought) => 
            !thought
                ? res.status(404).json({message: "NO thought with this ID"})
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
}