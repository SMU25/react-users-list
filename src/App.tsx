import React, { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import { IUser } from "src/types/types";
import "./index.scss";
import { AppContext } from "./context";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
import UsersList from "./components/Users/UsersList";
import { API_URL_USERS } from "./constants/urls";

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [invites, setInvites] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const updateSearchValue = useCallback(
    ({ target }) => setSearchValue(target.value.toLocaleLowerCase()),
    [setSearchValue]
  );

  useEffect(() => {
    try {
      axios
        .get(API_URL_USERS)
        .then(({ data: { data: users } }) => setUsers(users));
    } catch (e) {
      console.log(e.message);
      alert("Помилка при отриманні користувачів");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const filteredUserWithSearchValue = useMemo(
    () =>
      users?.filter(({ first_name, last_name, email }) => {
        const fullName = `${first_name} ${last_name}`;
        const filteredByValues = [fullName, email];

        return filteredByValues.some((item: string) =>
          item.toLocaleLowerCase().includes(searchValue)
        );
      }),
    [searchValue, users]
  );

  const onClickInvite = useCallback(
    (id: number) => {
      if (invites.includes(id)) {
        setInvites((prev) =>
          prev.filter((inviteId: number) => inviteId !== id)
        );
      } else {
        setInvites((prev) => [...prev, id]);
      }
    },
    [invites]
  );

  const onClickSendInvites = useCallback(() => {
    setSuccess(true);
  }, []);

  const onClickBack = useCallback(() => {
    setSuccess(false);
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={onClickInvite}>
        {success ? (
          <Success count={invites.length} />
        ) : (
          <Users
            invites={invites}
            searchValue={searchValue}
            updateSearchValue={updateSearchValue}
            onClickSendInvites={onClickSendInvites}
          >
            <UsersList
              users={filteredUserWithSearchValue || users}
              invites={invites}
              isLoading={isLoading}
              searchValue={searchValue}
            />
          </Users>
        )}
      </AppContext.Provider>
    </div>
  );
}

export default App;
