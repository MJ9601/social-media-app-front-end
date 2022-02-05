import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase/config";

export const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(storage, file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) =>
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
      (err) => setError(err),
      async () => setUrl(await getDownloadURL(uploadTask.snapshot.ref))
    );
  }, [file]);

  return { progress, url, error };
};
