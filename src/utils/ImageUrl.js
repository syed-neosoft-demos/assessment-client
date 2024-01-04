import myImg from "../assets/placeholder.jpg";

export const tempImageUrl = (url) => {
  if (url) {
    return `${process.env.REACT_APP_SERVER_BASE_URL}/upload/${url}`;
  } else {
    return myImg;
  }
};
