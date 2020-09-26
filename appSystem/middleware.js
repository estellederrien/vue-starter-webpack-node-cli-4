// -----------------------------------      MIDDLEWARE FUNCTIONS -------------------------------------------
module.exports = {
    /*
     * CHECKING IF LOGGED IN - FUNCTION USED IN WEB SERVICES  - Cette function est un middleware qui s'insère dans les webservices cruds controle si on est identifié grace à la variable de sessions
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
    /*
     * CHECKING IF PERMISSION VALID - MIDDLEWARE FUNCTION USED IN WEB SERVICES - CHECKING IF WE ARE ALLOWED TO FIRE A WEB SERVICE  - Cette function est un middleware qui s'insère dans les webservices cruds et controle si on a la permission d'exécuter un web service
     * @params req.session.user.permissions
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
    /*
     * PERMISSIONS CREATIONS : WHEN A USER IS CREATED, THESES PERMISSIONS ARE JOINED TO HIS ACCOUNT (MONGODB ATLAS JSON OBJECT )
     * Quand un utilisateur est créé, on lui affecte ces permissions dans son objet json "permissions" sur mongodb ATLAS
     * @params JSON OBJECT - USER
     * @return ARRAY - middleware
     * @error  NONE
     */
    create_permissions: function(user) {
        var permissions
        switch (user.role) {
            case "viewer":
                permissions = [
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
                permissions = [
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
                permissions = [
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
                permissions = [
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
                permissions = ["READ_DASHBOARD", "READ_USERS"]
        }
        return permissions
    },
}