const user = require("../../model/user/user");
const { ObjectId } = require("mongodb");

const fetchMessages = async (req, res) => {
  const { userId, pairId } = req.query;
  await user
    .aggregate([
      {
        $match: {
          _id: ObjectId.createFromHexString(userId),
        },
      },
      {
        $unwind: "$messages",
      },
      {
        $match: {
          "messages.pairId": pairId,
        },
      },
      {
        $project: {
          message: "$messages.message",
          _id: 0,
        },
      },
    ])
    .then((response) => {
      res.json({ response });
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  fetchMessages,
};