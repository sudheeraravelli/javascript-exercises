// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth': {
        'clientID': '751206001725710', // your App ID
        'clientSecret': 'eace8577d16431903703266d0a8b8acc', // your App Secret
        'callbackURL': 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'googleAuth': {
        'clientID': '179066839298-ikspohtkrganrcsi9vpb400m2sca1s9m.apps.googleusercontent.com',
        'clientSecret': 'cAywrknr3xqY4nFUFx5MctUo',
        'callbackURL': 'http://localhost:3000/auth/google/callback'
    }

};