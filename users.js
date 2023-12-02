console.log("from users file");
var userAge = 25;
var userName ="RAM"

// module.exports = userAge;
// module.exports = userName;

const sendUSerData = () => {
    console.log("send user data");
}


module.exports = {
    userAge,
    userName,
    sendUSerData
}
// module.exports  = sendUSerData;