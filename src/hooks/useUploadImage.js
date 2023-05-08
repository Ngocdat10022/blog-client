import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useAuthContext } from "../context/authContext";
const useUploaImage = () => {
  const { currentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(currentUser?.avatar);

  const handleUploadImage = (file) => {
    setLoading(true);
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressBar =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("");
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
          setLoading(false);
        });
      }
    );
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    if (!file) return;
    handleUploadImage(file);
  };

  return { handleChangeImage, loading, image };
};

export default useUploaImage;
