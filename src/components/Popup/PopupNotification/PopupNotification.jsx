import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./PopupNotification.css";
import PropTypes from "prop-types";
const PopupNotification = ({
  triggerText,
  modalTitle,
  content,
  confirmText,
  confirmAction,
  cancelText,
  cancelAction,
  triggerClassName,
  confirmClassName,
  cancelClassName,
}) => (
  <Popup
    trigger={
      <button className={triggerClassName || "button"}>{triggerText}</button>
    }
    modal
    nested
  >
    {(close) => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="header"> {modalTitle} </div>
        <div className="content">{content}</div>
        <div className="actions">
          <button
            className={confirmClassName || "button"}
            onClick={() => {
              confirmAction();
              close();
            }}
          >
            {confirmText}
          </button>
          <button
            className={cancelClassName || "button"}
            onClick={() => {
              if (cancelAction) cancelAction();
              close();
            }}
          >
            {cancelText}
          </button>
        </div>
      </div>
    )}
  </Popup>
);

PopupNotification.propTypes = {
  triggerText: PropTypes.string,
  modalTitle: PropTypes.string,
  content: PropTypes.string,
  confirmText: PropTypes.string,
  confirmAction: PropTypes.func,
  cancelText: PropTypes.string,
  cancelAction: PropTypes.func,
  triggerClassName: PropTypes.string,
  confirmClassName: PropTypes.string,
  cancelClassName: PropTypes.string,
};
export default PopupNotification;
