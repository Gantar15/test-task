import { useEffect, useState } from "react";

import DeleteIcon from "@/shared/assets/icons/delete.svg";
import { Loader } from "@/shared/ui/Loader";
import styles from "./DeleteTask.module.scss";
import { taskStore } from "@/entities/task";

interface DeleteTaskProps {
  id: number;
}
export const DeleteTask = ({ id }: DeleteTaskProps) => {
  const { delete: deleteTask, isDeleting } = taskStore.useTaskStore(
    (state) => ({
      delete: state.delete,
      isDeleting: state.isTaskDeleting
    })
  );
  const [isThisTaskDeleting, setIsThisTaskDeleting] = useState(false);

  const clickHandler = () => {
    deleteTask(id);
    setIsThisTaskDeleting(true);
  };

  useEffect(() => {
    if (!isDeleting) {
      setIsThisTaskDeleting(false);
    }
  }, [isDeleting]);

  return (
    <div className={styles["delete-task"]}>
      {isDeleting && isThisTaskDeleting ? (
        <Loader size="extra-small" />
      ) : (
        <DeleteIcon
          fill="#e94f3d"
          className={styles["delete-task__icon"]}
          onClick={clickHandler}
          width={20}
          height={20}
        />
      )}
    </div>
  );
};
