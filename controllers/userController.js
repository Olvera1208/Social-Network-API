const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((UserData) => {
        res.json(UserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    )
    .then((user) =>
      !user
        ? res.status(404).json({ message: "No such user with that ID" })
        : res.json(user)
    );
},

  // Delete user 
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No such user with that ID" })
          : Thought.deleteMany(
            { _id: 
            { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and thoughts were deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },
      
  // Add a friend to user array
  addFriend(req, res) {
    console.log('params:', req.params);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove friend from user array
  removeFriend(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, 
      {$pull: 
      {friends: req.params.friendId}},
      {new: true})
    .then((user) => 
    !user
        ? res.status(404).json({message: "No friend with this ID!"})
        : res.json(user)
    ).catch((err) => res.status(500).json(err));
}
}