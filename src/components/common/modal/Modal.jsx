import cn from "classnames";
import styles from "./styles.module.scss";
import SectionHeader from "../../shared/SectionHeader";
import { useState } from "react";
import { useEffect } from "react";

const Modal = ({ title, notice, children, toggler }) => {

  const [showModal, setShowModal] = useState(toggler);
  useEffect(() =>{
    setShowModal(toggler)
  },[toggler])
  return (
    <>
      {showModal ? (
        <>
          <div
            className={cn(styles.modal_backdrop)}
            onClick={() => setShowModal(false)}
          ></div>
          <div className={cn(styles.modal_container)}>
            <div className={cn(styles.modal_content)}>
                <SectionHeader title={title} />
                <div>
                  {notice ? <p>Notice: {notice}</p> : null}
                  <div>{children}</div>
                </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
