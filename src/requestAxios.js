import { useSelector } from "react-redux";
import axios from "./axios";
import { selectUser } from "./features/userSlice";

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
    console.log(formInputs);
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
