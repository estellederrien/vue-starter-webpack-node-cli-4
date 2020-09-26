// -----------------------------------      MIDDLEWARE FUNCTIONS -------------------------------------------
module.exports = {
    /*
     * LOGGED IN  MIDDLEWARE FUNCTION USED IN WEB SERVICES  - Cette function est un middleware qui s'insère dans les webservices cruds controle si on est identifié grace à la variable de sessions
     * @params req.session.loggedIn - TRUE OR FALSE
     * @return NEXT()
     * @error  Status 403
     */
    requiresLoggedIn(req, res, next) {
        if (!req.session.loggedIn) {
            console.log(" FORBIDDEN CAUSE YOU ARE NOT LOGGED IN  ")
            res.status(403).send({ errorCode: "403" })
            return
        } else {
            next() // continue the process
        }
    },
    // -----------------------------------middleware CONTROL -------------------------------------------
    /*
     * middleware CHECK MIDDLEWARE FUNCTION USED IN WEB SERVICES - CHECKING IF WE ARE ALLOWED TO FIRE A WEB SERVICE  - Cette function est un middleware qui s'insère dans les webservices cruds et controle si on a la permission d'exécuter un web service
     * @params ARRAY - middleware
     * @return NEXT()
     * @error  Status 403
     */
    permission_valid(permission) {
        return function(req, res, next) {
            if (!req.session.user.permissions.includes(permission)) {
                console.log(" FORBIDDEN CAUSE THE PERMISSION IS MISSING ")
                res.status(403).send({ errorCode: "403" })
                return
            } else {
                next() // continue the process
            }
        }
    },
    // -----------------------------------middleware CREATION  -------------------------------------------
    /*
     * middleware CREATIONS : WHEN A USER IS CREATED, THESES middleware ARE JOINED TO HIS ACCOUNT (MONGODB ATLAS JSON OBJECT )
     * @params JSON OBJECT - USER
     * @return ARRAY - middleware
     * @error  NONE
     */
    create_middleware: function(user) {
        var middleware
        switch (user.role) {
            case "viewer":
                middleware = [
                    "READ_DASHBOARD",
                    "READ_USERS",
                    "READ_MESSAGES",
                    "READ_FILE",
                    "READ_JOB",
                    "READ_JOBS",
                    "CREATE_MESSAGE",
                    "READ_MESSAGES",
                    "UPDATE_MESSAGE",
                    "DELETE_MESSAGE",
                ]
                break
            case "user":
                middleware = [
                    "READ_DASHBOARD",
                    "CREATE_USER",
                    "READ_USER",
                    "UPDATE_USER",
                    "DELETE_USER",
                    "READ_USERS",
                    "CREATE_FILE",
                    "READ_FILE",
                    "UPDATE_FILE",
                    "DELETE_FILE",
                    "READ_JOB",
                    "READ_JOBS",
                    "CREATE_MESSAGE",
                    "READ_MESSAGES",
                    "UPDATE_MESSAGE",
                    "DELETE_MESSAGE",
                ]
                break
            case "manager":
                middleware = [
                    "READ_DASHBOARD",
                    "CREATE_USER",
                    "READ_USER",
                    "UPDATE_USER",
                    "DELETE_USER",
                    "READ_USERS",
                    "CREATE_FILE",
                    "READ_FILE",
                    "UPDATE_FILE",
                    "DELETE_FILE",
                    "CREATE_JOB",
                    "READ_JOB",
                    "UPDATE_JOB",
                    "DELETE_JOB",
                    "READ_JOBS",
                    "CREATE_MESSAGE",
                    "READ_MESSAGES",
                    "UPDATE_MESSAGE",
                    "DELETE_MESSAGE",
                    "CREATE_GROUP",
                    "READ_GROUP",
                    "UPDATE_GROUP",
                    "DELETE_GROUP",
                    "READ_GROUPS",
                ]
                break
            case "administrator":
                middleware = [
                    "READ_DASHBOARD",
                    "CREATE_USER",
                    "READ_USER",
                    "UPDATE_USER",
                    "DELETE_USER",
                    "READ_USERS",
                    "CREATE_FILE",
                    "READ_FILE",
                    "UPDATE_FILE",
                    "DELETE_FILE",
                    "CREATE_JOB",
                    "READ_JOB",
                    "DELETE_JOB",
                    "READ_JOBS",
                    "CREATE_MESSAGE",
                    "READ_MESSAGES",
                    "UPDATE_MESSAGE",
                    "DELETE_MESSAGE",
                    "CREATE_GROUP",
                    "READ_GROUP",
                    "UPDATE_GROUP",
                    "DELETE_GROUP",
                    "READ_GROUPS",
                ]
                break
            default:
                middleware = ["READ_DASHBOARD", "READ_USERS"]
        }
        return middleware
    },
}