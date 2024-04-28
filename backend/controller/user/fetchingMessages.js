const fetchSentMessages = async (req , res) => {
    const {userId} = req.body;
}

const fetchReceivedMessage = async (req , res) => {
    const {userId} = req.body
}

module.exports = {
    fetchSentMessages,
    fetchReceivedMessage,
}