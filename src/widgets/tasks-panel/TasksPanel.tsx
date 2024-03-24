import { Button, Flex, Text } from "@chakra-ui/react";

import { CreateTaskForm } from "../create-task-form";
import { Modal } from "@/shared/ui/Modal";
import styles from "./TasksPanel.module.scss";
import { taskStore } from "@/entities/task";
import { useState } from "react";

export const TasksPanel = () => {
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const { tasks } = taskStore.useTaskStore((state) => ({
    tasks: state.tasks
  }));

  const newTaskClickHandler = () => {
    setIsNewTaskModalOpen(true);
  };

  const closeNewTaskModalHandler = () => {
    setIsNewTaskModalOpen(false);
  };

  const newTaskSubmitHandler = () => {
    setIsNewTaskModalOpen(false);
  };

  return (
    <div>
      <Modal
        isOpen={isNewTaskModalOpen}
        onClose={closeNewTaskModalHandler}
        header={"New task"}
        classNames={{
          header: styles.modal__header
        }}
      >
        <CreateTaskForm onSubmit={newTaskSubmitHandler} />
      </Modal>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        w={"100%"}
        columnGap={"15px"}
      >
        <Button colorScheme="blue" onClick={newTaskClickHandler}>
          + New task
        </Button>
        <Text fontSize={14}>
          Total tasks:{" "}
          <Text fontSize={16} as={"b"}>
            {tasks.length}
          </Text>
        </Text>
      </Flex>
    </div>
  );
};
