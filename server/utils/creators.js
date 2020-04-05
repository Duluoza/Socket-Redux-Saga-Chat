const { v4: uuidv4 } = require('uuid');

const createChat = ({ messages = [], name = "Community", users = [], creator = "admin" } = {}) => (
    {
        id: uuidv4(),
        name,
        messages,
        users,
        creator,
        newMessage: false
    }
)

const createUser = ({name = "", socketId = null } = {})=>(
	{
		id: uuidv4(),
		name,
		socketId
		
	}
)

module.exports = {
    createChat,
    createUser
}