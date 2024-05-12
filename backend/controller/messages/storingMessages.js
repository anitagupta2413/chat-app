const user = require("../../model/user/user");

const updateRecipient = async (req, res) => {
  const { sendBy, receivedBy, message, timeStamp, status } = req.body;
  try {
    const recipient = await user.findOneAndUpdate(
      { _id: receivedBy, "messages.pairId": sendBy },
      {
        $push: {
          "messages.$.message": {
            timeStamp: timeStamp,
            message: message,
            status: status,
          },
        },
      }
    );

    if (!recipient) {
      // If the senderId doesn't exist in received array, create a new object
      await user.updateOne(
        { _id: receivedBy },
        {
          $push: {
            messages: {
              pairId: sendBy,
              message: [
                {
                  timeStamp: timeStamp,
                  message: message,
                  status: status,
                },
              ],
            },
          },
        }
      );
    }

    res
      .status(200)
      .json({ success: true, message: "message received successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ success: true, message: "error in receiving message" });
  }
};

const updateSender = async (req, res) => {
  const { sendBy, receivedBy, message, timeStamp, status } = req.body;
  try {
    const sender = await user.findOneAndUpdate(
      {
        _id: sendBy,
        "messages.pairId": receivedBy,
      },
      {
        $push: {
          "messages.$.message": {
            timeStamp: timeStamp,
            message: message,
            status: status,
          },
        },
      }
    );

    if (!sender) {
      // If the senderId doesn't exist in received array, create a new object
      sender = await user.updateOne(
        { _id: sendBy },
        {
          $push: {
            messages: {
              pairId: receivedBy,
              message: [
                {
                  timeStamp: timeStamp,
                  message: message,
                  status: status,
                },
              ],
            },
          },
        }
      );
    }
    
    res
      .status(200)
      .json({ success: true, message: 'message sent successfully'});
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "error storing in the message" });
  }
};

module.exports = {
  updateRecipient,
  updateSender,
};
