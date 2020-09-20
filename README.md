# Vue.js + Node.js + MongoDb Atlas Full stack starter ! 
. CLI v4.0 and Express.<br>
. MongoDb node.js module (no Moongoose)<br>
. Easy to understand CRUD(create,read,update,delete) back end files reminding the Php or Java style.<br>
. Working Mocha Chai unit components testing for Vue.js .<br>
. Shaman Linear regression library. <br>
. Git Commits are automatically Heroku synced .<br>

## Demos
HEROKU LIVE DEMO ->  : https://vuestartergit.herokuapp.com/  

<a href="https://heroku.com/deploy">
  <img  align="right"  src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>


Testing: log in with -> login: admin@admin.com -> password: admin <br />

![ScreenShot](screenshot1.jpeg)

## Desc
This 2020 starter aims is to be able to start any web-app, with all ready generics components, the starter is plugged to a node.js + mongoDb Atlas back end . <br><br>


## LATEST STARTER NEWS ! 
  <br>
  09-19-2020 : The app is now blazin' fast ! We can go forward now !!<br>
  09-19-2020 : The group query was slowing the readUsers web service a lot ! Disabled and making it a background task theses days! ReadUsers is now immediate ! The app will be blazin' fast<br>
  09-10-2020 : The infinity free FTP policy is limiting and blocking at a certain point :  230-Your bandwidth usage is restricted... I am currently searching for another FTP - reading and downloading from FTP is now working<br>
   09-17-2020 : Uploading multiples files to the FTP server is now working, next step is reading files from FTP ...<br>
  08-05-2020 : Uploadings pics is now active on heroku, switching to the tmp directory. next step is activating the ftp files uploading<br>
  08-04-2020 : I'm currently focused on performance issues ( initial loading is too slow)<br>
 08-04-2020 : This app is now automatically synced to heroku, when commiting, its so easy to use !<br>
 08-04-2020 : Pictures are now stored on cloudinary, i'm trying to use the lazy loading module<br>
 08-04-2020 : I'm on  files uploading code refactoring , untill its finished, uploading wont work.<br>
 08-03-2020 : I will add 3 ways of uploading pics and files : By ftp, on cloudinary, and on the node local server, and also do a global code standardisation 
I've been so busy, and Have had to stop for 6 months but I'm back on it !!<br>
  08-03-2020 : I will finally publish the whole code including my 'secret' permissions builder directory.<br>
  Currently in DEV state !<br>
Please allow from 1 month to 3 months for it to get finished. t<br>
 

<br />

## What's in files ?

<b>SERVER.js</b> This is the node.js server: Includes the node.js params, node session module loading and the CRUDS web services loading. <br>
<b>\SRC</b> : This is where you develop the front end vue.js application, this is basically the complete VUE.JS FRONT END application. <br>
<b>\DIST</b> : This is where the built appears when you type NPM RUN BUILD, This is the final front end vue.js app ready for production.<br>
<b>\CRUDS</b> : Each file is a CRUD WEBS SERVICES( create , read, update , delete).<br>
<b>\APPSYSTEM</b> : There, you can find the MongoDb ATLAS Authentication web service (auth.js), and the middleware functions used for webs services permissions control (permissions.js)<br>
<b>\TMP</b> : This is a mandatory directory , used for Heroku files uploads.  <br><br>
<b>\SRC\App.vue</b> : There, you can find the global medias queries CSS styles, making the app fully responsive on all medias, this is an important part ! . </b>




## Not available:
VUEX : It is another starter in another GIT depot of mine<br />

## Available :

1 Users CRUD<br />
1 Auth system<br />
1 Profiles and Permissions management system (Front and Back)<br />
1 Files management - and permissions -system by users<br />
1 Dashboard with some graphicals libs<br />
1 Form validator : (https://vuelidate.js.org/#getting-started)<br />
1 Internal Messaging CRUD<br />
1 Internal Alerts CRUD<br />
1 Node.js Emailing system<br />
1 Anti Flooding by IP System<br />
1 File session store<br />
1 Calendar lib<br />
1 V-dialog lib<br />
1 SOCKET.IO realtime evolutive system <br />
1 Gps positionning lib <br />
1 multi selector : https://vue-multiselect.js.org/ <br />

<br /><br />
## Comin' soon ! ...
1 Drag n drop lib <br />
1 Notifier https://github.com/euvl/vue-notification<br />
1 Node worker-thread ready to go system.<br />
1 vue-range-slider : https://github.com/xwpongithub/vue-range-slider
<br /><br />
Data science  ...<br />
1 Linear solver lib : https://www.npmjs.com/package/javascript-lp-solver and/or https://github.com/jvail/glpk.js<br />
1 Linear multiple regression lib : https://github.com/luccastera/shaman<br />
1 Neural network  : https://github.com/BrainJS/brain.js<br />
1 Probability distribution lib : https://www.npmjs.com/package/probability-distributions<br />
1 Kmeans lib : https://www.npmjs.com/package/node-kmeans<br />
1 Random forest lib : https://github.com/mljs/random-forest<br />
1 AJAX call some to some python matplot scripts - pictures generators from a FLASK server.<br />
<br /><br />
## French : 
Ce starter est directement mis à jour sur HEROKU quand je commite des mises à jour.<br>
Le but de ce starter est de pouvoir commencer n'importe quel application Node.js + Vue.js + MongoDb Atlas , avec tous les modèles de données génériques déjà prêts (utilisateurs, messages, permissions, gestion de fichiers, temps réel avec socket.io, calendriers ...), ainsi que des libs de data science déjà prêtes à être utilisées pour réaliser des régressions mathématiques, un petit réseau de neurone,  et des graphiques . <br> Si vous clonez ce dépot, l'app doit normalement fonctionner instantanément chez vous ... Il peut vous donner des idées, bien sur, il existe peut être de meilleures architectures, par exemple avec Moogoose qui permet de mieux décrirer le modèle de données et ses types, dans l'app.<br /><br>

<b>SERVER.js</b> Il s'agit du serveur node.js: Inclut les paramètres node.js, le chargement du module de gestion des sessions utilisateur et le chargement des services Web CRUDS.<br>
<b>\ SRC:</b> C'est ici que vous développez l'application front-end vue.js, c'est fondamentalement l'application VUE.JS FRONT END complète.<br>
<b>\ DIST:</b> C'est là que le build apparaît lorsque vous tapez NPM RUN BUILD, c'est l'application compressée et optimisée pour la production par webpack.<br>
<b>\ CRUDS:</b> Chaque fichier est un CRUD WEBS SERVICES (créer, lire, mettre à jour, supprimer) un peu comme en java ou en php, sauf que c'est du NODE.JS.<br>
<b>\ APPSYSTEM:</b> Vous y trouverez le service Web d'authentification sur MongoDb Atlas (auth.js) et les fonctions middleware utilisées pour le contrôle des autorisations des services Web (permissions.js)<br>
<b>\ TMP:</b> C'est un répertoire obligatoire pour les téléchargements de fichiers sur Héroku.<br>
<b>\SRC\App.vue</b> : Dans ce fichier, vous pouvez trouver les CSS Medias queries de l'app qui permettent de régler les styles css pour que cela passe sur tous les matériels .</b>

## Project setup
Clone the depot using smargit, then install the node modules at the root of the app, enter :<br>
Clonez ce dépot avec Smartgit, puis installez les modules nodes , en tapant ceci à la racine de l'application, dans une fenêtre windows :
```
#npm install
```

### Compiles and hot-reloads for development on port 8080
When you want to develop the vue.js application, run these 2 commands in 2 differents windows CMD, at the root of the app.
<br /> Then, go in your browser to localhost: 8080, and modify the files in the \ SRC directory
<br /> To modify the BACK END, it is rather in the CRUDS directory<br>
<br />Quand vous voulez developper l'application vue.js, executez ces 2 commandes dans 2 fenêtres différentes CMD sous windows, à la racine de l'application.
<br />Ensuite, rendez vous dans votre navigateur à localhost:8080, et modifiez les fichiers dans le répertoire \SRC
<br />Pour modifier le BACK END, c'est plutôt dans le répertoire CRUDS
```
// Open a cmd window on WINDOWS
#npm run serve //( starting the vue.js dev env running on port 8080, Axios queries are forwarded to port 80 using vue.config.js) 
//Open another CMD window then enter :
#node server.js //(starting the node server running on port 80)
```

### Compiles and minifies for production
When you are satisfied with your development, you generate a BUILD of your vue.js app which is compressed and optimized, it then appears in the \ DIST directory.<br>
<br />Quand vous êtes satisfait de votre développement, vous générez un BUILD de votre app vue.js qui est compressé et optimisé, il apparait alors dans le répertoire \DIST.
```
#npm run build
```
### Run build on port 80
To test your BUILD on port 80, just type localhost: 80 in your browser! In fact, there is only one node server running all the time!<br>
<br />Pour tester votre BUILD sur le port 80 , tapez juste localhost:80 dans votre navigateur ! En fait, il n'y a qu'un seul serveur node qui tourne en permanence !

```
#npm run start
```
### Publishing on HEROKU
It is so simple and automatic, 1. Clone this depot in you github, 2. Simply go to heroku and go to the deploy tab then Manually deploy your app. 3. DOn't even sync the \dist directory, Heroku does it for you !<br>
<br />c'est tellement simple et automatique, 1. Clonez ce dépôt dans votre github, 2. Allez simplement sur heroku et allez dans l'onglet de déploiement puis déployez manuellement votre application. 3. Même pas besoin de taper NPM RUN BUILD, Heroku le fait automatiquement pour vous. Pour gérer cela, c'est sous l'onglet DEPLOY, c'est trop pratique, tout se fait tout seul, on peut ^même paramétrer en SYNC automatique dès qu'on fait un commit, l'app se mets à jour toute seule !.

### Creating your MONGODB ATLAS ACCOUNT
PLease don't use my mongoDb atlas db, open yourself an account ...

### Run your unit tests
```
#npm run test:unit
```

### Lints and fixes files
```
#npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

<a href="https://www.openode.io/">Sponsored and hosted by opeNode.io</a>
