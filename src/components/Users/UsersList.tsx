import React, { FC, memo } from "react";
import { IUser } from "src/types/types";
import { Skeleton } from "./Skeleton";
import { User } from "./User";

interface Props {
  users: IUser[];
  invites: number[];
  isLoading: boolean;
  searchValue: string;
}

const UsersList: FC<Props> = ({ users = [], invites = [], isLoading }) => {
  if (isLoading)
    return (
      <div className="skeleton-list">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      </div>
    );

  return (
    <ul className="users-list">
      {users.map(({ id, ...user }) => (
        <User isInvite={invites.includes(id)} key={id} id={id} {...user} />
      ))}
    </ul>
  );
};

export default memo(UsersList);
