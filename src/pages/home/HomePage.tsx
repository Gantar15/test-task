import { useTaskStore } from "./home.store";

export const HomePage = () => {
  const { tasks, create, getRange, isTasksLoading } = useTaskStore();

  return (
    <div onClick={() => getRange(0, 10)}>
      <h1>{JSON.stringify(tasks)}</h1>
      {isTasksLoading ? <h1>Loading...</h1> : null}
    </div>
  );
};
