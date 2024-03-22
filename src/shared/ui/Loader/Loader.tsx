import { Spinner } from "../Spinner";
import styles from "./Loader.module.scss";

type LoaderProps = {
  size?: "small" | "medium" | "large" | "full";
};

export function Loader(props: LoaderProps) {
  const { size = "medium" } = props;
  const className = `${styles.wrapper} ${styles[`loader-${size}`]}`;

  return (
    <div className={className}>
      <Spinner />
    </div>
  );
}
