import styles from "./FullPageError.module.scss";

type FullPageErrorProps = {
  error: Error;
};

export function FullPageError(props: FullPageErrorProps) {
  const { error } = props;

  return (
    <div className={styles["outer-wrapper"]}>
      <div className={styles["inner-wrapper"]}>
        <div className="container">
          <h1 className="logo-font">Something went wrong:</h1>
          <p>{error.message}</p>
        </div>
      </div>
    </div>
  );
}
