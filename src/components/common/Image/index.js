const Image = ({ classname, altText }) => {
  return (
    <img
      className={`image ${classname ? classname : ""}`}
      src={"https://picsum.photos/160/90"}
      alt={altText}
    />
  );
};

export default Image;
