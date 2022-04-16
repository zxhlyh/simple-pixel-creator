import s from './style.module.scss';
import { cloneElement } from 'react';

const Modal = ({
    children,
    onCancel,
}) => {
    return (
        <div className={s.modal} onClick={onCancel}>
            {cloneElement(children, {onClick: e => e.stopPropagation() })}
        </div>
    )
}

export default Modal;