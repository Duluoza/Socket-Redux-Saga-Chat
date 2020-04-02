const { v4: uuidv4 } = require('uuid');

const createChat = ({ messages = [], name = "Community", users = [] } = {}) => (
    {
        id: uuidv4(),
        name,
        messages,
        users,
    }
)

module.exports = {
	createChat
}