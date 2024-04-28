const user = require('../../model/user/user');

const updateRecipient = async (newMessage, senderId, receiverId) => {
    try {
        const recipient = await user.findOneAndUpdate(
            { _id: receiverId, "received.receivedFrom": senderId },
            {
                $push: {
                    "received.$.messages": {
                        timeStamp: new Date(),
                        message: newMessage
                    }
                }
            }
        );

        if (!recipient) {
            // If the senderId doesn't exist in received array, create a new object
            await user.updateOne(
                { _id: receiverId },
                {
                    $push: {
                        received: {
                            receivedFrom: senderId,
                            messages: [{
                                timeStamp: new Date(),
                                message: newMessage
                            }]
                        }
                    }
                }
            );
        }

        console.log("Recipient updated successfully");
    } catch (error) {
        console.error("Error updating recipient:", error);
    }
}

const updateSender = async (newMessage, senderId, receiverId) => {
    try {
        const sender = await user.findOneAndUpdate(
            { _id: senderId, "sent.sendTo": senderId },
            {
                $push: {
                    "sent.$.messages": {
                        timeStamp: new Date(),
                        message: newMessage
                    }
                }
            }
        );

        if (!recipient) {
            // If the senderId doesn't exist in received array, create a new object
            await user.updateOne(
                { _id: senderId },
                {
                    $push: {
                        received: {
                            sendTo: receiverId,
                            messages: [{
                                timeStamp: new Date(),
                                message: newMessage
                            }]
                        }
                    }
                }
            );
        }

        console.log("Recipient updated successfully");
    } catch (error) {
        console.error("Error updating recipient:", error);
    }
}

module.exports = {
    updateRecipient,
    updateSender
}