import { Loader } from "@/shared/ui/Loader";
import { withSuspense } from "@/shared/lib/react";

const TasksList = () => {
  return <div>TasksList</div>;
};

export const SuspensedPopularTags = withSuspense(TasksList, {
  fallback: <Loader />
});
