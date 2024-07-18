import '../../styles/modal.scss';
export default function Modal({isOpen, onClose, children}) {
  return (
    <div className={`popup_modal ${isOpen ? 'active' : ''}`}>
        <div className='modal_overlay' onClick={onClose}></div>
        <div className='modal_content'>
            <button className='close' onClick={onClose}>
            <span>Close</span>
            </button>
            {children}
        </div>
    </div>
  );
}