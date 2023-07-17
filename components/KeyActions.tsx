import { useHotkeys } from "react-hotkeys-hook";

type KeyActionsProps = {
  onLeft: () => void;
  onRight: () => void;
  onEsc: () => void;
};

const KeyActions = ({ onLeft, onRight, onEsc }: KeyActionsProps) => {
  useHotkeys("left", () => {
    onLeft();
  });
  useHotkeys("right", () => {
    onRight();
  });
  useHotkeys("esc", () => {
    onEsc();
  });

  return <></>;
};

export default KeyActions;
