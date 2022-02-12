const router = require("express").Router();
const Group = require("../models/Group");
const User = require("../models/User");
const Message = require("../models/Message");

// create
router.post("/createMessage", async (req, res) => {
  try {
    (!req.body || req.body == "") &&
      res.status(500).send("update request body");

    const newMessage = new Message({
      text: req.body?.text,
      fileUrl: req.body?.fileUrl,
      fileType: req.body?.fileType,
      creater: req.body.createrId,
      onReplyTo: req.body?.replyedMsgId,
    });
    await Group.findById(req.query.groupId, async (err, firstResp) => {
      err && res.status(500).send(err);
      if (
        !firstResp.isChannel ||
        (firstResp.isChannel && firstResp.admin == req.body.createrId)
      )
        await newMessage.save(async (err, secondResp) =>
          err
            ? res.status(500).send(err)
            : await Group.findByIdAndUpdate(
                req.query.groupId,
                {
                  $addToSet: { messages: secondResp._id },
                },
                { new: true },
                (err, lastResp) =>
                  err
                    ? res.status(500).send(err)
                    : res.status(201).send(secondResp)
              )
                .clone()
                .catch((err) => res.status(501).send(err))
        );
      else if (firstResp.isChannel && firstResp.admin !== req.body.createrId)
        res.status(403).send("Not Allowed");
    })
      .clone()
      .catch((err) => res.status(501).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});
// edit text

router.put("/:createId/edit", async (req, res) => {
  try {
    (!req.body || req.body == "") &&
      res.status(500).send("update request body");
    Message.findById(req.body?.msgId, async (err, firstResp) => {
      err && res.status(500).send(err);
      firstResp.creater != req.params.createId
        ? res.status(403).send("Not Allowed!")
        : await Message.findByIdAndUpdate(
            req.body?.msgId,
            { $set: { text: req.body?.text } },
            { new: true },
            (err, lastResp) =>
              err ? res.status(500).send(err) : res.status(201).send(lastResp)
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

// forward

router.put("/forward", async (req, res) => {
  try {
    (!req.body || req.body == "") &&
      res.status(500).send("update request body");
    await Group.findById(req.query.groupId, async (err, firstResp) => {
      err && res.status(500).send(err);
      if (
        !firstResp.isChannel ||
        (firstResp.isChannel && firstResp.admin == req.body.forwarderId)
      )
        await Group.findByIdAndUpdate(
          req.query.groupId,
          { $addToSet: { messages: req.body?.msgId } },
          { new: true },
          async (err, firstResp) =>
            err
              ? res.status(500).send(err)
              : await Message.findByIdAndUpdate(
                  req.body?.msgId,
                  { $set: { forwardBy: req.body.forwarderId } },
                  { new: true },
                  (err, lastResp) =>
                    err
                      ? res.status(500).send(err)
                      : res.status(201).send(lastResp)
                )
                  .clone()
                  .catch((err) => res.status(501).send(err))
        )
          .clone()
          .catch((err) => res.status(501).send(err));
      else if (firstResp.isChannel && firstResp.admin !== req.body.forwarderId)
        res.status(403).send("Not Allowed");
    })
      .clone()
      .catch((err) => res.status(501).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete

router.delete("/:createrId/delete", async (req, res) => {
  try {
    (!req.body || req.body == "") &&
      res.status(500).send("update request body");
    Message.findById(req.body?.msgId, async (err, firstResp) => {
      err && res.status(500).send(err);
      firstResp.creater != req.params.createrId
        ? res.status(403).send("Not Allowed!")
        : await Message.findByIdAndDelete(req.body?.msgId, (err, lastResp) =>
            err
              ? res.status(500).send(err)
              : res.status(200).send("Message has been deleted!")
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

module.exports = router;
