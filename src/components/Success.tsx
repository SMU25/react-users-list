import React, { FC } from "react";
import { ReactComponent as SuccessImage } from "src/assets/success.svg";

const HEADING = "Успішно!";
const DESCRIPTION = (count: number) =>
  count <= 1
    ? "1 користувачу відправлено запрошення."
    : `Усім ${count} користувачам відправлено запрошення.`;
const NAME_SEND_INVITATION_BUTTON = "Назад";

interface Props {
  count: number;
}

export const Success: FC<Props> = ({ count }) => {
  return (
    <div className="success-block">
      <SuccessImage />
      <h3>{HEADING}</h3>
      <p>{DESCRIPTION(count)}</p>
      <a href="/">
        <button className="send-invite-btn">
          {NAME_SEND_INVITATION_BUTTON}
        </button>
      </a>
    </div>
  );
};
