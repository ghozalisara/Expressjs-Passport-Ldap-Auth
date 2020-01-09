
import passport from 'passport';
import path from 'path';
import Debug from 'debug';


const debug = Debug('app');


export const authenticate = (req, res, next) => {
    passport.authenticate('ldapauth', { session: true }, (err, user, info) => {

        if (err) {
            debug("auth err", err);
            return next(err);
        }
        if (!user) {
            console.log(user)
            res.render(path.join(__dirname, './../../views/login'), {
                message: "Nom d'utilisateur ou Mot de passe incorrect"
            });
        }
        else {

            debug("---------------new user-----------------------", user.uid);
            if (!hasRole(user)) {
                res.render(path.join(__dirname, './../../views/login'), {
                    message: "Vous n'avez pas accès à cet environnement"
                });
            }
            else {
                var search = searchUser(user, req);
                if (search) delete req.sessionStore.sessions[search];

                req.logIn(user, (err) => {
                    if (err) return next(err);
                });
                res.redirect('/')
            }


        }

    })(req, res, next);
};


export const isAuthenticated = (req, res, next) => {

    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

function hasRole(user) {
    //return user.memberOf.includes('GED');
    return true;
}
function searchUser(user, req) {


    var sessions = req.sessionStore.sessions;
    var res = null;
    if (sessions) {


        for (var elem in sessions) {


            if (JSON.parse(sessions[elem]).passport)
                if (JSON.parse(sessions[elem]).passport.user.sAMAccountName === user.sAMAccountName) {

                    res = elem;
                    break;
                }


        }

    }
    return res;

}

