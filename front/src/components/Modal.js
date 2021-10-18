import './modal.scss';


function Modal({funOk, funOtm, text}) {
  

  return (
    <div className="modal">
        <div className="modal__body">
            <div className="modal__content">
                <span className="modal__close" onClick={funOtm}> &#9587; </span>
                <div className="modal__title">{text.title}</div>
                <div className="modal__text">{text.text}</div>
                
                <span className="modal_knopka" onClick={funOk}> Ok </span>
                <span className="modal_knopka" onClick={funOtm}> Отмена </span>
            </div>
        </div>
      
    </div>
  );
}

export default Modal;
