const SignInService = require('../services/signInService');


const signIn = async (request, response) => {
    const user = request.body;
    try {
        const accessToken = await SignInService.signIn(user.email, user.passwordHash);

        if(accessToken){
            response.status(200).json(accessToken);
        }else{
            response.status(400).send("Sign in failed, Please check your credentials");
        }

    } catch (error) {
        response.status(500).send(error.message);
        console.log(error);
    }



}

module.exports = {
    signIn
}