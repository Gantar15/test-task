import { type GenericError } from "@/shared/api/api.types";
import styles from "./FullPageError.module.scss";

type FullPageErrorProps = {
  error: GenericError<any>;
};

export function FullPageError(props: FullPageErrorProps) {
  const { error } = props;

  return (
    <div className={styles["outer-wrapper"]}>
      <div className={styles["inner-wrapper"]}>
        <div className="container">
          <h1 className="logo-font">Something went wrong:</h1>
          <p>{error.explanation}</p>
        </div>
      </div>
    </div>
  );
}
