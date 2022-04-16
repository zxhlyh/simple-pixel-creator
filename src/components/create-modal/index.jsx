import s from './style.module.scss';
import { useContext } from 'react';
import Modal from '../modal';
import { DrawingContext } from '../../context/drawing-context';

const CreateModal = () => {
    const { 
        setOperate,
    } = useContext(DrawingContext);

    return (
        <Modal onCancel={() => setOperate('')}>
            <div className={s.wrapper}>
                <div className={s.title}>画板设置</div>
                <div>
                    width: <input />
                </div>
                <div>
                    height: <input />
                </div>
                <div>确定</div>
            </div>
        </Modal>
    )
}

export default CreateModal;