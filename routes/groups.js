const router = require("express").Router();
const Group = require("../models/Group");
const User = require("../models/User");
const Message = require("../models/Message");

// create
router.post("/:adminId/create", async (req, res) => {
  try {
    (!req.body || req.body == "") &&
      res.status(500).send("update request body");

    const newGroup = new Group({
      name: req.body?.name,
      imgUrl: req.body?.imgUrl,
      isChannel: req.body?.isChannel,
      admin: req.params.adminId,
      members: [req.params.adminId],
    });
    await newGroup.save(async (err, firstResp) =>
      err
        ? res.status(500).send(err)
        : await User.findByIdAndUpdate(
            req.params.adminId,
            {
              $addToSet: { groups: firstResp._id },
            },
            (err, secondResp) =>
              err ? res.status(500).send(err) : res.status(201).send(firstResp)
          )
            .clone()
            .catch((err) => res.status(501).send(err))
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

// add members

router.put("/:adminId/addMembers", async (req, res) => {
  try {
    (!req.body || req.body == "") &&
      res.status(500).send("update request body");
    await Group.findById(req.query.groupId, async (err, resp) => {
      err && res.status(500).send(err);
      resp.admin != req.params.adminId && res.status(403).send("Not Allowed");
    })
      .clone()
      .catch((err) => res.status(501).send(err));
    await Group.findByIdAndUpdate(
      req.query.groupId,
      {
        $addToSet: { members: req.body?.userId },
      },
      { new: true },
      (err, resp) =>
        err ? res.status(500).send(err) : res.status(201).send(resp)
    )
      .clone()
      .catch((err) => res.status(501).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// remove members

router.put("/:adminId/deleteMembers", async (req, res) => {
  try {
    (!req.body || req.body == "") &&
      res.status(500).send("update request body");
    await Group.findById(req.query.groupId, async (err, firstResp) => {
      if (err) res.status(500).send(err);
      else {
        firstResp.admin != req.params.adminId &&
          res.status(403).send("Not Allowed");
        await Group.findByIdAndUpdate(
          req.query.groupId,
          {
            $set: {
              members: firstResp.members.filter(
                (member) => member != req.body?.userId
              ),
            },
          },
          { new: true },
          (err, lastResp) =>
            err ? res.status(500).send(err) : res.status(201).send(lastResp)
        )
          .clone()
          .catch((err) => res.status(501).send(err));
      }
    })
      .clone()
      .catch((err) => res.status(501).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// update setting
router.put("/:adminId/update", async (req, res) => {
  try {
    (!req.body || req.body == "") &&
      res.status(500).send("update request body");

    await Group.findById(req.query.groupId, async (err, firstResp) => {
      err && res.status(500).send(err);
      firstResp.admin != req.params.adminId
        ? res.status(403).send("Not Allowed")
        : await Group.findByIdAndUpdate(
            req.query.groupId,
            {
              $set: {
                name: req.body?.name,
                imgUrl: req.body?.imgUrl,
              },
            },
            { new: true },
            (err, secondResp) =>
              err ? res.status(500).send(err) : res.status(201).send(secondResp)
          )
            .clone()
            .catch((err) => res.status(501).send(err));
    })
      .clone()
      .catch((err) => res.status(501).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete

router.delete("/:adminId/", async (req, res) => {
  try {
    await Group.findById(req.query.groupId, async (err, firstResp) => {
      if (err) res.status(500).send(err);
      else {
        firstResp.admin != req.params.adminId &&
          res.status(403).send("Not Allowed");

        for (const msg of firstResp.messages) {
          await Message.deleteOne({ _id: msg })
            .clone()
            .catch((err) => res.status(501).send(err));
        }
        // for (const member of firstResp.members) {
        //   await User.findById(member, async (err, secondResp) =>
        //     err
        //       ? res.status(500).send(err)
        //       : await User.findByIdAndUpdate(
        //           member,
        //           {
        //             $set: {
        //               groups: secondResp.groups.filter(
        //                 (group) => group != firstResp._id
        //               ),
        //             },
        //           },
        //           { new: true },
        //           (err, thirdResp) => err && res.status(500).send(err)
        //         )
        //           .clone()
        //           .catch((err) => res.status(501).send(err))
        //   );
        // }
        await Group.deleteOne({ _id: firstResp._id }, (err, lastResp) =>
          err ? res.status(500).send(err) : res.status(200).send(lastResp)
        )
          .clone()
          .catch((err) => res.status(501).send(err));
      }
    })
      .clone()
      .catch((err) => res.status(501).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// search for group

// get group with messages and users
router.get("/:groupId", async (req, res) => {
  await Group.findById(req.params?.groupId)
    .populate([
      {
        path: "messages",
        model: "Message",
        populate: [
          { path: "creater", model: "User" },
          { path: "forwardBy", model: "User" },
          { path: "onReplyTo", model: "Message" },
        ],
      },
      { path: "members", model: "User" },
    ])
    .exec((err, fristResp) =>
      err ? res.status(500).send(err) : res.status(200).send(fristResp)
    );
});

// get users

module.exports = router;
