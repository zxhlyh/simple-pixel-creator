import { useContext } from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { operates, OPERATE_TYPE, MAX_PX_SIZE, MIN_PX_SIZE, ZOOM_STEP } from '../../constants';
import { DrawingContext } from '../../context/drawing-context';

const OperateBar = () => {
    const { 
        setOperate,
        setPxSize,
        pxSize,
        initPxData,
    } = useContext(DrawingContext);

    return (
        <div className={s.wrapper}>
            {
                operates.map(item => (
                    <div 
                        key={item.id}
                        className={cn(s.item, item.disabled && s.itemDisabled)}
                        onClick={() => {
                            if (item.disabled) return;
                            setOperate(item.id);
                            if (item.id === OPERATE_TYPE.ZOOM_IN && pxSize + ZOOM_STEP <= MAX_PX_SIZE) {
                                setPxSize(pxSize + ZOOM_STEP)
                            }
                            if (item.id === OPERATE_TYPE.ZOOM_OUT && pxSize - ZOOM_STEP >= MIN_PX_SIZE) {
                                setPxSize(pxSize - ZOOM_STEP)
                            }
                            if (item.id === OPERATE_TYPE.CLEAR) {
                                initPxData();
                            }
                        }}>{item.name}</div>
                ))
            }
        </div>
    )
}

export default OperateBar;