import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShowSettingGroup } from "../features/displaySlice";
import { selectCurrentGroup, setSelectedGroup } from "../features/groupSlice";
import { LOGIN, selectUser, setAllUsers } from "../features/userSlice";
import {
  getCurrentGroupFunc,
  getCurrentUserFunc,
  loadAllUserFunc,
} from "../requestAxios";

// useLoadUser
export const useLoadCurrentUser = () => {
  const distach = useDispatch();
  const user = useSelector(selectUser);
  const selectedGroup = useSelector(selectCurrentGroup);
  useEffect(() => {
    const interval = setInterval(() => {
      const loadUser = async () => {
        const resp = await getCurrentUserFunc(user._id);
        resp.status == 200 && distach(LOGIN(resp.data));
      };
      loadUser();
    }, 2000);
    return () => clearInterval(interval);
  }, []);
};

// useLoadGroup

export const useLoadCurrentGroup = () => {
  const dispatch = useDispatch();
  const selectedGroup = useSelector(selectCurrentGroup);
  const user = useSelector(selectUser);

  useEffect(() => {
    const loadGroup = async () => {
      if (selectedGroup) {
        const resp = await getCurrentGroupFunc(selectedGroup?._id);
        resp.status == 200 && dispatch(setSelectedGroup(resp.data));
      }
    };
    loadGroup();
  }, [user]);
};

// useLoadGroupmessages

// useLoadUsers
export const useLoadAllUsers = () => {
  const dispatch = useDispatch();
  const showSettingGroup = useSelector(selectShowSettingGroup);
  const user = useSelector(selectUser);

  useEffect(() => {
    const loadUsers = async () => {
      const resp = await loadAllUserFunc();
      resp.status == 200 && dispatch(setAllUsers(resp.data));
    };
    loadUsers();
  }, [, user, showSettingGroup]);
};

// cancel click activation

export const useCancelCliking = (ref) => {
  const [isClickedInside, setIsClickedInside] = useState();

  useEffect(() => {
    const handleClickOutSide = (e) => {
      ref.current && !ref.current.contains(e.target)
        ? setIsClickedInside(false)
        : setIsClickedInside(true);
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [ref]);

  return isClickedInside;
};
