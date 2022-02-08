import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectShowSettingGroup } from "../features/displaySlice";
import { selectCurrentGroup, setSelectedGroup } from "../features/groupSlice";
import { LOGIN, selectUser } from "../features/userSlice";
import { getCurrentGroupFunc, getCurrentUserFunc } from "../requestAxios";

// useLoadUser
export const useLoadCurrentUser = () => {
  const distach = useDispatch();
  const user = useSelector(selectUser);
  const selectedGroup = useSelector(selectCurrentGroup);
  useEffect(() => {
    const loadUser = async () => {
      const resp = await getCurrentUserFunc(user._id);
      resp.status == 200 && distach(LOGIN(resp.data));
    };
    loadUser();
  }, []);
};

// useLoadGroup

export const useLoadCurrentGroup = () => {
  const dispatch = useDispatch();
  const selectedGroup = useSelector(selectCurrentGroup);
  const showSettingGroup = useSelector(selectShowSettingGroup);

  useEffect(() => {
    const loadGroup = async () => {
      const resp = await getCurrentGroupFunc(selectedGroup?._id);
      resp.status == 200 && dispatch(setSelectedGroup(resp.data));
    };
    loadGroup();
  }, [showSettingGroup]);
};

// useLoadGroupmessages

// useLoadUsers
