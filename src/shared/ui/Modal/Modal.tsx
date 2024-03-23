import React, { useEffect } from "react";

import CloseIcon from "@/shared/assets/icons/close.svg";
import { connectClasses } from "@/shared/lib/react";
import styles from "./Modal.module.scss";

interface IModal {
  children?: React.ReactNode;
  header?: React.ReactNode;
  classNames?: {
    body?: string;
    header?: string;
    title?: string;
    content?: string;
  };
  onClose: () => void;
  isOpen: boolean;
}

export const Modal = ({
  children,
  header,
  isOpen,
  onClose,
  classNames
}: IModal) => {
  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;
    const x = window.scrollX;
    const y = window.scrollY;
    const preventScroll = () => {
      window.scrollTo(x, y);
    };
    window.addEventListener("scroll", preventScroll);
    return () => {
      window.removeEventListener("scroll", preventScroll);
    };
  }, [isOpen]);

  return isOpen ? (
    <div className={styles.modal__back}>
      <div className={connectClasses(styles.modal__body, classNames?.body)}>
        <div
          className={connectClasses(styles.modal__header, classNames?.header)}
        >
          <div
            className={connectClasses(styles.modal__title, classNames?.title)}
          >
            {header}
          </div>
          <button className={styles.modal__close} onClick={handleClose}>
            <CloseIcon fill="#787878" width={20} height={20} />
          </button>
        </div>
        <div
          className={connectClasses(styles.modal__content, classNames?.content)}
        >
          {children}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
