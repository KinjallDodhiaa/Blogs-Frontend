const baseUrl =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:3001"
    : "https://kinjals-blog.herokuapp.com";

export default baseUrl;