import { useCallback, useContext, useEffect, useState } from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { tools, TOOL_TYPE } from '../../constants';
import { DrawingContext } from '../../context/drawing-context';
import { SketchPicker } from 'react-color';

const ToolBar = () => {
    const { 
        mode, 
        setMode,
        pencilColor,
        setPencilColor,
    } = useContext(DrawingContext);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const handleCloseColorPicker = useCallback(() => {
        setShowColorPicker(false);
    }, []);

    useEffect(() => {
        window.addEventListener('click', handleCloseColorPicker);

        return () => window.removeEventListener('click', handleCloseColorPicker);
    }, []);

    return (
        <div className={s.wrapper}>
            <div className={s.list}>
            {
                tools.map(item => (
                    <div 
                        key={item.id}
                        className={cn(s.item, mode === item.id && s.itemActive, item.disabled && s.itemDisabled)}
                        onClick={() => {
                            if (item.disabled) return;
                            setMode(item.id);
                        }}
                    >
                        {item.icon}&emsp;{item.name}&emsp;
                        {
                            item.id === TOOL_TYPE.PENCIL && (
                                <div 
                                    className={s.itemColor}
                                    style={{ backgroundColor: `rgba(${pencilColor.r}, ${pencilColor.g}, ${pencilColor.b}, ${pencilColor.a})` }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowColorPicker(true);
                                    }}>
                                    {
                                        showColorPicker && (
                                            <div className={s.itemColorPicker}>
                                                <SketchPicker
                                                    color={pencilColor}
                                                    onChangeComplete={v => {
                                                        setPencilColor(v.rgb);
                                                    }} />
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default ToolBar;