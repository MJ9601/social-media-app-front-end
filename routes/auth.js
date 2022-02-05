const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// registeration

router.post("/register", async (req, res) => {
  try {
    (!req.body || req.body === "") &&
      res.status(500).send("update the request body!!");

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body?.password, salt);

    const newUser = new User({
      username: req.body.email,
      fullName: req.body.fullName,
      password: hashPass,
    });

    await newUser
      .save(async (err, resp) => {
        err && res.status(501).send(err);
        const { password, ...others } = resp?._doc;
        res.status(201).send(others);
      })
      .clone()
      .catch((err) => res.status(501).send(err));
  } catch (error) {
    res.status(500).send(err);
  }
});

// login

router.post("/login", async (req, res) => {
  try {
    (!req.body || req.body == "") &&
      res.status(500).send("update request body!!");
    await User.findOne({ username: req.body?.username }, async (err, resp) => {
      err && res.status(500).send(err);
      if (!resp) res.status(400).send({ msg: "Wrong Credentials" });
      else {
        await User.findOne({ username: req.body?.username })
          .populate({
            path: "groups",
            model: "Group",
            populate: [
              {
                path: "members",
                Model: "User",
              },
              {
                path: "messages",
                Model: "Message",
              },
            ],
          })
          .exec(async (err, firstResp) => {
            err && res.status(500).send(err);
            !firstResp && res.status(400).send({ msg: "Wrong Credentials" });
            const passValidation = await bcrypt.compare(
              req.body?.password,
              firstResp?.password
            );
            !passValidation &&
              res.status(400).send({ error: "Wrong Credentials" });
            const { password, ...others } = firstResp?._doc;
            res.status(200).send(others);
          });
      }
    })
      .clone()
      .catch((err) => res.status(501).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// updateProfile

router.put("/update/:id", async (req, res) => {
  try {
    (!req.body || req.body === "") &&
      res.status(500).send("update request body");

    await User.findById(req.params.id, async (err, firstResp) => {
      err && res.status(501).send(err);

      let passValidation = await bcrypt.compare(
        req.body?.password,
        firstResp.password
      );
      !passValidation && res.status(400).send("Wrong Credentials!");

      const updatedProfile = {
        fullName: req.body?.fullName,
        imgUrl: req.body?.imgUrl,
        customeId: req.body?.customeId,
      };
      const salt = await bcrypt.genSalt(10);
      if (req.body?.newPassword) {
        const hashPass = await bcrypt.hash(req.body?.newPassword, salt);
        updatedProfile["password"] = hashPass;
      }

      User.findByIdAndUpdate(
        firstResp._id,
        { $set: updatedProfile },
        { new: true }
      )
        .populate({
          path: "groups",
          model: "Group",
          populate: [
            {
              path: "members",
              Model: "User",
            },
            {
              path: "messages",
              Model: "Message",
            },
          ],
        })
        .exec(async (err, secondResp) => {
          err && res.status(500).send(err);
          const { password, ...others } = secondResp?._doc;
          res.status(200).send(others);
        });
    })
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete Profile

router.delete("/delete/:id", async (req, res) => {
  await User.findById(req.params.id, async (err, firstResp) => {
    err && res.status(500).send(err);
    const validPass = await bcrypt.compare(
      req.body.password,
      firstResp.password
    );

    !validPass
      ? res.status(403).send("Wrong Credentials!")
      : await User.findByIdAndDelete(req.params.id, (err, secondResp) =>
          err
            ? res.status(500).send(err)
            : res.status(200).send("Profile has been deleted!")
        )
          .clone()
          .catch((err) => res.status(501).send(err));
  })
    .clone()
    .catch((err) => res.status(501).send(err));
});

// search profile by customeId and username

router.get("/profile", async (req, res) => {
  try {
    !req.query && res.status(404).send("update the Url");
    req.query.customeId &&
      (await User.findOne({ customeId: req.query.customeId }, (err, resp) => {
        err && res.status(500).send(err);
        const { password, groups, username, ...others } = resp._doc;
        res.status(202).send(others);
      })
        .clone()
        .catch((err) => res.status(501).send(err)));

    req.query.fullName &&
      (await User.findOne({ fullName: req.query?.fullName }, (err, resp) => {
        err && res.status(500).send(err);
        const { password, groups, username, ...others } = resp._doc;
        res.status(202).send(others);
      })
        .clone()
        .catch((err) => res.status(501).send(err)));
  } catch (error) {
    res.status(500).send(error);
  }
});

// get all users

router.get("/profiles", async (req, res) => {
  await User.find({}, (err, resp) =>
    err
      ? res.status(500).send(err)
      : res.status(200).send(
          resp.map((user) => ({
            fullName: user.fullName,
            customeId: user.customeId,
            imgUrl: user.imgUrl,
            userId: user._id,
          }))
        )
  )
    .clone()
    .catch((err) => res.status(501).send(err));
});

//get user info

router.get("/profile/:userId", async (req, res) => {
  await User.findById(req.params.userId)
    .populate({
      path: "groups",
      model: "Group",
      populate: [
        {
          path: "members",
          Model: "User",
        },
        {
          path: "messages",
          Model: "Message",
        },
      ],
    })
    .exec((err, resp) => {
      err && res.status(500).send(err);
      const { password, ...others } = resp._doc;
      res.status(200).send(others);
    });
});

module.exports = router;
