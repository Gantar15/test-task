import styles from "./Loader.module.scss";

type LoaderProps = {
  size?: "extra-small" | "small" | "medium" | "large" | "full";
};

export function Loader(props: LoaderProps) {
  const { size = "small" } = props;
  const className = `${styles.wrapper} ${styles[`loader_${size}`]}`;

  return (
    <div className={className}>
      <div className={styles["lds-ring"]}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
