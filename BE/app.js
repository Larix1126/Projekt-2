const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const app = express();
const port = 3000;

app.use("/images", express.static("public"));

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/user", (req, res) => {
  fs.readFile("database/Users.json", "utf8", (err, data) => {
    if (err) res.status(500).send("Server Internal Error");
    else res.send(data);
  });
});

app.get("/friends", (req, res) => {
  fs.readFile("database/Friends.json", "utf8", (err, data) => {
    if (err) res.status(500).send("Server Internal Error");
    else res.send(data);
  });
});

app.get("/posts", (req, res) => {
  fs.readFile("database/Posts.json", "utf8", (err, data) => {
    if (err) res.status(500).send("Server Internal Error");
    else res.send(data);
  });
});

app.get("/comments", (req, res) => {
  fs.readFile("database/Comments.json", "utf8", (err, data) => {
    if (err) res.status(500).send("Server Internal Error");
    else res.send(data);
  });
});

app.get("/reactions", (req, res) => {
  fs.readFile("database/Reactions.json", "utf8", (err, data) => {
    if (err) res.status(500).send("Server Internal Error");
    else res.send(data);
  });
});

app.post("/generateAvatars", (req, res) => {
  fs.readFile("database/Users.json", "utf8", (err, data) => {
    fs.readdir("public", (err, files) => {
      const users = JSON.parse(data);
      const usersWithAvatars = users.map((user) => {
        return {
          ...user,
          avatarUrl: `http://localhost:3000/images/${
            files[Math.floor(Math.random() * files.length)]
          }`,
        };
      });
      fs.writeFile(
        "database/Users.json",
        JSON.stringify(usersWithAvatars),
        (err) => {
          if (err) res.status(500).send("Server Internal Error");
          else res.send("OK");
        }
      );
    });
  });
});

app.post("/addPostsAndAuthorsToComments", (req, res) => {
  fs.readFile("database/Posts.json", "utf8", (err, data1) => {
    fs.readFile("database/Comment.json", "utf8", (err, data2) => {
      fs.readFile("database/Users.json", "utf8", (err, data3) => {
        const posts = JSON.parse(data1);
        const comments = JSON.parse(data2);
        const users = JSON.parse(data3);
        const commentsWithData = comments.map((i) => ({
          ...i,
          userId: users[Math.floor(Math.random() * users.length)].id,
          postId: posts[Math.floor(Math.random() * posts.length)].id,
        }));
        fs.writeFile(
          "database/Comments.json",
          JSON.stringify(commentsWithData),
          (err) => {
            if (err) res.status(500).send("Server Internal Error");
            else res.send("OK");
          }
        );
      });
    });
  });
});

app.post("/generateReactions", (req, res) => {
  fs.readFile("database/Posts.json", "utf8", (err, data1) => {
    fs.readFile("database/Users.json", "utf8", (err, data2) => {
      const posts = JSON.parse(data1);
      const users = JSON.parse(data2);
      const likes = [];
      for (let i = 0; i < posts.length; i++) {
        for (let j = Math.random() * 10; j > 0; j--) {
          likes.push({
            userId: users[Math.floor(Math.random() * users.length)].id,
            postId: posts[i].id,
            reaction: randomReaction(),
          });
        }
      }
      fs.writeFile("database/Reactions.json", JSON.stringify(likes), (err) => {
        if (err) res.status(500).send("Server Internal Error");
        else res.send("OK");
      });
    });
  });
});

const randomReaction = () => {
  const reactions = [
    "like",
    "love",
    "haha",
    "wow",
    "sad",
    "angry",
    "poop",
    "fuck",
  ];
  return reactions[Math.floor(Math.random() * reactions.length)];
};
