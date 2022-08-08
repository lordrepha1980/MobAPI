_dirname                = process.cwd();
const config            = require(_dirname + "/config.json");
const passport          = require('koa-passport');
const JwtStrategy       = require('passport-jwt').Strategy;
const ExtractJwt        = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest:     ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:        config.auth.secret
}

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    return done(null, jwt_payload)
}));
