const ACCESS_TOKEN = "salam"
const express = require('express')
const app = express()
app.use(express.json({ limit: '50mb' }));
const { body, validationResult } = require('express-validator');
var cors = require('cors')
app.use(cors())
// parse server
//https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/ 
// enable mongod
// sudo systemctl start mongod
var ParseServer = require('parse-server').ParseServer;
var api = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: './cloud/main.js', // Path to your Cloud Code
  appId: 'myAppId',
  masterKey: 'myMasterKey', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
});

app.use('/parse', api);

app.listen(1337, function () {
  console.log('parse-server-example running on port 1337.');
});
var ParseDashboard = require('parse-dashboard');

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
      "appId": "myAppId",
      "masterKey": "myMasterKey",
      "appName": "MyApp"
    }
  ]
});

app.use('/dashboard', dashboard);

app.get('/', function (req, res) {
  res.send({ "message": 'Hello World' })
})

app.post('/', function (req, res) {
  let body = req.body
  res.send({ message: body })
})


// user
app.post('/api/signup',
  body('password').isLength({ min: 5 }),
  body('email').isEmail(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    let body = req.body
    if (body.accesstoken != ACCESS_TOKEN) {
      res.status(400).send({ error: "wrong access token" })
      return
    }
    const user = new Parse.User();
    user.set("username", body.username);
    user.set("password", body.password);
    user.set("email", body.email);
    Parse.User.enableUnsafeCurrentUser()
    user.signUp().then(
      value => {
        res.send({ message: "user have been created" })
      },
      reason => {
        res.status(400).send({ error: `error in signing up, reason: ${reason}` })
      }
    )
  })

app.post('/api/signin', (req, res) => {
  let body = req.body
  Parse.User.enableUnsafeCurrentUser()
  Parse.User.logIn(body.username, body.password)
    .then(
      user => {
        res.send({ message: `${user.get("username")} logged in successfully` })
      },
      reason => {
        res.status(400).send({ error: reason })
      }
    )
})

function getCurrentUser() {
  const currentUser = Parse.User.current();
  if (currentUser) {
    return currentUser
  } else {
    return null
  }
}

app.get("/api/getcurrentuser", (req, res) => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    res.send({ message: currentUser })
  } else {
    res.send({ error: "no user is logged in" })
  }
})

app.get("/api/logout", (req, res) => {
  Parse.User.logOut().then(() => {
    res.send({ message: "logged out successfully" })
  });
})
// add picture
app.post('/api/addnewpic', (req, res) => {
  let body = req.body
  if (getCurrentUser() == null) {
    res.status(400).send({ error: "you are not login" })
    return
  }
  const Post = Parse.Object.extend("Post");
  const post = new Post();
  if (!body.title) {
    res.status(400).send({ error: "choose a title" })
    return
  }
  post.set("title", body.title)

  if (body.descriptin) {
    post.set("descriptin", body.descriptin)
  } else {
    post.set("descriptin", "")
  }

  if (body.tags) {
    //todo do the taggs
  }

  const ImageFile = Parse.Object.extend("ImageFile");
  const imageFile = new ImageFile()
  imageFile.set("file", body.imagefile)
  imageFile.save().then(
    (savedImageFile) => {
      post.set("file", savedImageFile.id)
      post.save().then((savedPost) => {
        res.send({ message: "post created" })
      },
        (error) =>
          res.status(400).send({ error: "choose a title" })
      )
    }
    , (error) =>
      res.status(400).send({ error: "choose a title" })

  )





})

app.get('/api/getallpics', function (req, res) {
  const Post = Parse.Object.extend("Post");
  const query = new Parse.Query(Post);
  query.find().then(
    (results) => {
      var allPosts = []
      for (let i = 0; i < results.length; i++) {
        allPosts.push(results[i])
      }
      res.send({ message: allPosts})
    },
    (error) => {

    }
  )
})

app.listen(3001)