import { useContext } from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { DrawingContext } from '../../context/drawing-context';
import { selectionOperates, SELECTION_TYPE } from '../../constants';
import { getIndexByCoords } from '../../utils';
import ColorPicker from '../color-picker';

const Selection = () => {
    const { 
        selection, 
        pxSize, 
        bucketColor: { r, g, b, a }, 
        setBucketColor,
        pxData, 
        setPxData 
    } = useContext(DrawingContext);
    const { startX, startY, endX, endY } = selection;
    const left = startX > endX ? endX : startX;
    const top = startY > endY ? endY : startY;
    const width = Math.abs(startX - endX);
    const height = Math.abs(startY - endY);

    const handleBucket = (color) => {
        const newData = pxData.slice();
        for (let i = left + (pxSize / 2); i < left + width; i += pxSize) {
            for (let j = top + (pxSize / 2); j < top + height; j += pxSize) {
                const [x, y] = getIndexByCoords(i, j, pxSize);
                newData[x][y] = color;
            }
        }
        setPxData(newData);
    }

    if (width === 0 || height === 0) return null;

    return (
        <div 
            className={s.wrapper} 
            style={{
                left,
                top,
                width,
                height,
            }}>
            {
                selection.status === 1 && (
                    <div className={s.operate}>
                        {
                            selectionOperates.map(item => (
                                <div 
                                    key={item.id}
                                    className={cn(s.item, item.disabled && s.itemDisabled)}
                                    onMouseDown={e => e.stopPropagation()}
                                    onClick={() => {
                                        if (item.id === SELECTION_TYPE.BUCKET) {
                                            handleBucket([r, g, b, a]);
                                        }
                                        if (item.id === SELECTION_TYPE.CLEAR) {
                                            handleBucket([0, 0, 0, 0]);
                                        }
                                    }}>
                                    <div className={s.itemIcon}>{item.icon}</div>
                                    <div className={s.itemName}>{item.name}</div>
                                    {
                                        item.id === SELECTION_TYPE.BUCKET && (
                                            <ColorPicker
                                                color={{ r, g, b, a }}
                                                onColorChange={(color) => {
                                                    setBucketColor(color);
                                                    handleBucket([color.r, color.g, color.b, color.a]);
                                                }} />
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            }  
        </div>
    )
}

export default Selection;