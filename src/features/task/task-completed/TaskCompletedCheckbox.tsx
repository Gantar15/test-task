import { useEffect, useState } from "react";

import { Checkbox } from "@chakra-ui/react";
import { taskStore } from "@/entities/task";

interface TaskCompletedCheckboxProps {
  id: number;
  completed: boolean;
}
export const TaskCompletedCheckbox = ({
  id,
  completed
}: TaskCompletedCheckboxProps) => {
  const { update } = taskStore.useTaskStore((state) => ({
    update: state.update
  }));
  const [isChecked, setIsChecked] = useState(completed);

  const toggleCheckboxHandler = () => {
    setIsChecked((currentState) => !currentState);
    update(id, { completed: !completed });
  };

  useEffect(() => {
    setIsChecked(completed);
  }, [completed]);

  return <Checkbox isChecked={isChecked} onChange={toggleCheckboxHandler} />;
};
