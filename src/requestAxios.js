import { async } from "@firebase/util";
import axios from "./axios";

export const signInFunc = async (formData) => {
  try {
    const formInputs = {};
    [...formData.current.elements].forEach((element) => {
      formInputs[element.name] = element.value;
    });
    if (!formInputs.email || !formInputs.password) return 404;
    const resp = await axios.post("/auth/login", {
      username: formInputs.email,
      password: formInputs.password,
    });

    return resp;
  } catch (error) {
    return { status: 400, error: error };
  }
};

export const signUpFunc = async (formData) => {
  try {
    const formInputs = {};
    [...formData.current.elements].forEach((element) => {
      formInputs[element.name] = element.value;
    });
    if (!formInputs.email || !formInputs.password) return 404;
    const resp = await axios.post("/auth/register", {
      email: formInputs.email,
      fullName: formInputs.fullName,
      password: formInputs.password,
    });

    return resp;
  } catch (error) {
    return { status: 400, error: error };
  }
};

export const updateProfileFunc = async (id, formData, url) => {
  try {
    const formInputs = {};
    [...formData.current.elements].forEach((element) => {
      (element.name !== "imgFile" || element.name == "") &&
        (formInputs[element.name] = element.value);
    });

    const uploadingInput = {};
    formInputs.fullName != "" &&
      (uploadingInput["fullName"] = formInputs.fullName);
    formInputs.password != "" &&
      (uploadingInput["password"] = formInputs.password);
    formInputs.NewPassword != "" &&
      (uploadingInput["newPassword"] = formInputs.NewPassword);
    formInputs.customeId != "" &&
      (uploadingInput["customeId"] = formInputs.customeId);
    url != "" && (uploadingInput["imgUrl"] = url);

    const resp = await axios.put(`/auth/update/${id}`, uploadingInput);

    return resp;
  } catch (error) {
    return { status: 400, error: error };
  }
};

export const delUserFunc = async (id, password) => {
  try {
    const resp = await axios.delete(`/auth/delete/${id}`, {
      data: {
        password: password,
      },
    });

    return resp;
  } catch (error) {
    return { status: 400, error: error };
  }
};

export const createGroupFunc = async (id, dataForm, url) => {
  try {
    const resp = await axios.post(`/groups/${id}/create`, {
      name: dataForm[0],
      imgUrl: url,
      isChannel: dataForm[1],
      isPrivate: dataForm[2],
    });
    const resp_ = await axios.get(`/groups/${resp.data._id}`);
    return resp_;
  } catch (err) {
    return { status: 400, error: err };
  }
};

export const getCurrentUserFunc = async (id) => {
  const resp = await axios.get(`/auth/profile/${id}`);
  return resp;
};

export const getCurrentGroupFunc = async (id) => {
  const resp = await axios.get(`/groups/${id}`);
  return resp;
};

export const updateGroupSettingFunc = async (
  groupId,
  adminId,
  groupName,
  url
) => {
  try {
    const uploadData = {};
    url != "" && (uploadData["imgUrl"] = url);
    groupName != "" && (uploadData["name"] = groupName);
    const resp = await axios.put(
      `/groups/${adminId}/update?groupId=${groupId}`,
      uploadData
    );
    const resp_ = await axios.get(`/groups/${groupId}`);
    return resp_;
  } catch (error) {
    return { status: 400, error: error };
  }
};

export const delGroupFunc = async (adminId, groupId) => {
  try {
    const resp = await axios.delete(`/groups/${adminId}/?groupId=${groupId}`);
    return resp;
  } catch (error) {
    return { status: 400, error: error };
  }
};

export const createMsgFunc = async (
  userId,
  groupId,
  msgText,
  url,
  fileType,
  onReplyTo
) => {
  try {
    if (url == "" && msgText == "") return { status: 400 };
    const uploadData = { createrId: userId };
    msgText != "" && (uploadData["text"] = msgText);
    url != "" && (uploadData["fileUrl"] = url);
    url != "" && (uploadData["fileType"] = fileType);
    onReplyTo != "" && (uploadData["replyedMsgId"] = onReplyTo);

    const resp = await axios.post(
      `/messages/createMessage?groupId=${groupId}`,
      uploadData
    );
    if (resp.status == 201) {
      const resp_ = await axios.get(`/groups/${groupId}`);
      return resp_;
    }

    return resp;
  } catch (error) {
    return { status: 400, error: error };
  }
};

export const deleteMsgFunc = async (userId, msgId, groupId) => {
  try {
    const resp = await axios.delete(`/messages/${userId}/delete`, {
      data: { msgId: msgId },
    });
    if (resp.status == 200) {
      const resp_ = await axios.get(`/groups/${groupId}`);
      return resp_;
    }
    return resp;
  } catch (error) {
    return { status: 400, error: error };
  }
};

export const editMsgFunc = async (userId, msgId, text, groupId) => {
  try {
    const resp = await axios.put(`/messages/${userId}/edit`, {
      msgId: msgId,
      text: text,
    });
    if (resp.status == 201) {
      const resp_ = await axios.get(`/groups/${groupId}`);
      return resp_;
    }
  } catch (error) {
    return { status: 400, error: error };
  }
};
