import { Strategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

const { JWT_PRIVATE } = process.env;

export const createPassportInstance = () => {
  passport.use(
    new Strategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_PRIVATE
      },
      (jwt_payload, done) => {
        done(null, { id: jwt_payload.id, email: jwt_payload.email });
      }
    )
  );
};
