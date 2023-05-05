import { useEffect, useState } from "react";
import { users } from "../../api/users";
import { useParams } from "react-router-dom";
import { CardComponent } from "../card/userCard";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState<any>([]);

  useEffect(() => {
    users
      .getById({ id })
      .then((response) => {
        setUser(response.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="container margin">
      <CardComponent
        id={user.id}
        first_name={user.first_name}
        email={user.email}
        password={user.password}
      />
    </div>
  );
};

export default UserDetails;
