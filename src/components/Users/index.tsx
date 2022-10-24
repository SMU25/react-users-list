import React, { ChangeEventHandler, FC, ReactNode } from "react";

const PLACEHOLDER_SEARCH_INPUT = "Знайти користувача";
const NAME_SEND_INVITATION_BUTTON = "Відправити запрошення";

interface Props {
  children?: ReactNode;
  invites: number[];
  searchValue: string;
  updateSearchValue: ChangeEventHandler;
  onClickSendInvites: VoidFunction;
}

export const Users: FC<Props> = ({
  children,
  invites,
  searchValue,
  updateSearchValue,
  onClickSendInvites,
}) => (
  <>
    <div className="search">
      <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
      </svg>
      <input
        value={searchValue}
        type="text"
        placeholder={PLACEHOLDER_SEARCH_INPUT}
        onChange={updateSearchValue}
      />
    </div>
    {children}
    {Boolean(invites.length) && (
      <button onClick={onClickSendInvites} className="send-invite-btn">
        {NAME_SEND_INVITATION_BUTTON}
      </button>
    )}
  </>
);
