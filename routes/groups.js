const router = require("express").Router();
const Group = require("../models/Group");
const User = require("../models/User");
const Message = require("../models/Message");
const { route } = require("./messages");

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
      resp.admin != req.params.adminId
        ? res.status(403).send("Not Allowed")
        : await Group.findByIdAndUpdate(
            req.query.groupId,
            {
              $addToSet: { members: req.body?.userId },
            },
            { new: true },
            async (err, resp) =>
              err
                ? res.status(500).send(err)
                : await User.findByIdAndUpdate(
                    req.body?.userId,
                    { $addToSet: { groups: req.query?.groupId } },
                    { new: true },
                    (err, lastResp) =>
                      err
                        ? res.status(500).send(err)
                        : res.status(201).send(resp)
                  )
                    .clone()
                    .catch((err) => res.status(501).send(err))
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

// remove members

router.put("/:adminId/deleteMembers", async (req, res) => {
  try {
    (!req.body || req.body == "") &&
      res.status(500).send("update request body");
    await Group.findById(req.query.groupId, async (err, firstResp) => {
      if (err) res.status(500).send(err);
      else {
        firstResp.admin != req.params.adminId
          ? res.status(403).send("Not Allowed")
          : await Group.findByIdAndUpdate(
              req.query.groupId,
              {
                $set: {
                  members: firstResp.members.filter(
                    (member) => member != req.body?.userId
                  ),
                },
              },
              { new: true },
              async (err, secondResp) =>
                err
                  ? res.status(500).send(err)
                  : await User.findById(
                      req.body?.userId,
                      async (err, thirdResp) =>
                        err
                          ? res.status(500).send(err)
                          : await User.findByIdAndUpdate(
                              req.body?.userId,
                              {
                                $set: {
                                  groups: thirdResp.groups.filter(
                                    (group) => group != req.query?.groupId
                                  ),
                                },
                              },
                              { new: true },
                              (err, lastResp_) =>
                                err
                                  ? res.status(500).send(err)
                                  : res.status(200).send(secondResp)
                            )
                              .clone()
                              .catch((err) => res.status(501).send(err))
                    )
                      .clone()
                      .catch((err) => res.status(501).send(err))
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

// leave a member
router.delete("/deleteMember", async (req, res) => {
  await Group.findById(req.query.groupId, async (err, firstResp) =>
    err
      ? res.status(500).send(err)
      : await Group.findByIdAndUpdate(
          req.query.groupId,
          {
            $set: {
              members: firstResp.members.filter(
                (member) => member != req.query.userId
              ),
            },
          },
          { new: true },
          async (err, secondResp) =>
            err
              ? res.status(500).send(err)
              : await User.findById(req.query?.userId, async (err, thirdResp) =>
                  err
                    ? res.status(500).send(err)
                    : await User.findByIdAndUpdate(
                        req.query?.userId,
                        {
                          $set: {
                            groups: thirdResp.groups.filter(
                              (group) => group != req.query?.groupId
                            ),
                          },
                        },
                        { new: true },
                        (err, lastResp_) =>
                          err
                            ? res.status(500).send(err)
                            : res.status(200).send(secondResp)
                      )
                        .clone()
                        .catch((err) => res.status(501).send(err))
                )
                  .clone()
                  .catch((err) => res.status(501).send(err))
        )
          .clone()
          .catch((err) => res.status(501).send(err))
  )
    .clone()
    .catch((err) => res.status(501).send(err));
});

// create private chat

router.post("/privateChat", async (req, res) => {
  const newGroup = new Group({
    isPrivate: true,
    name: `private-[${req.body.firstUserId},${req.body.secondUserId}]`,
    members: [req.body.firstUserId, req.body.secondUserId],
    admin: req.body.firstUserId,
  });
  const firstFilter = {
    isPrivate: true,
    name: `private-[${req.body.firstUserId},${req.body.secondUserId}]`,
  };
  const secondFilter = {
    isPrivate: true,
    name: `private-[${req.body.secondUserId},${req.body.firstUserId}]`,
  };
  await Group.findOne(firstFilter, async (err, firstResp) => {
    if (err) res.status(500).send(err);
    else {
      !firstResp
        ? await Group.findOne(secondFilter, async (err, firstResp_) => {
            if (err) res.status(500).send(err);
            else {
              !firstResp_
                ? await newGroup.save(async (err, secondResp) =>
                    err
                      ? res.status(500).send(err)
                      : await User.findByIdAndUpdate(
                          req.body.firstUserId,
                          {
                            $addToSet: { groups: secondResp._id },
                          },
                          { new: true },
                          async (err, thirdResp) =>
                            err
                              ? res.status(500).send(err)
                              : await User.findByIdAndUpdate(
                                  req.body.secondUserId,
                                  {
                                    $addToSet: { groups: secondResp._id },
                                  },
                                  { new: true },
                                  (err, forthResp) =>
                                    err
                                      ? res.status(500).send(err)
                                      : res.status(200).send(secondResp)
                                )
                                  .clone()
                                  .catch((err) => res.status(501).send(err))
                        )
                          .clone()
                          .catch((err) => res.status(501).send(err))
                  )
                : res.status(200).send(firstResp_);
            }
          })
            .clone()
            .catch((err) => res.status(501).send(err))
        : res.status(200).send(firstResp);
    }
  })
    .clone()
    .catch((err) => res.status(501).send(err));
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
