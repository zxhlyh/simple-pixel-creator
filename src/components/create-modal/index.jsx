import s from './style.module.scss';
import { useContext, useState } from 'react';
import Modal from '../modal';
import { DrawingContext } from '../../context/drawing-context';

const CreateModal = () => {
    const { 
        setOperate,
        setBoard,
        board,
    } = useContext(DrawingContext);
    const [width, setWidth] = useState(board.width);
    const [height, setHeight] =useState(board.height);

    const handleWidthInput = e => {
        const { value } = e.target;

        setWidth(+value);
    }

    const handleHeightInput = e => {
        const { value } = e.target;

        setHeight(+value);
    }

    const handleNewBoard = () => {
        setBoard({
            width,
            height,
        });
        setOperate('');
    }

    return (
        <Modal onCancel={() => setOperate('')}>
            <div className={s.wrapper} onClick={e => e.stopPropagation()}>
                <div className={s.title}>新建画板</div>
                <div className={s.line}>
                    宽: <input type='number' onChange={handleWidthInput} value={width} />
                </div>
                <div className={s.line}>
                    高: <input type='number' onChange={handleHeightInput} value={height} />
                </div>
                <div className={s.button} onClick={handleNewBoard}>确定</div>
            </div>
        </Modal>
    )
}

export default CreateModal;