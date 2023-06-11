import Image from "../common/Image";
import "./User.scss";

const User = ({ data }) => {
  return (
    <div className="user">
      <h4 className="user__label">{data.title}</h4>
      <div>
        <Image classname="user__image" altText={data.username} />
      </div>
      <p>
        <span border="">{data.city} |</span>
        <span>{data.date}</span>
      </p>
      <h5 className="user__body-description">{data.description}</h5>
    </div>
  );
};

export default User;
