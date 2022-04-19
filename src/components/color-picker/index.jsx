import { useContext, useState, useCallback, useEffect } from 'react';
import s from './style.module.scss';
import { SketchPicker } from 'react-color';

const ColorPicker = ({
    color: { r, g, b, a },
    onColorChange,
}) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const handleCloseColorPicker = useCallback(() => {
        setShowColorPicker(false);
    }, []);
    useEffect(() => {
        window.addEventListener('click', handleCloseColorPicker);

        return () => window.removeEventListener('click', handleCloseColorPicker);
    }, []);

    return (
        <div 
            className={s.wrapper}
            style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})` }}
            onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(true);
            }}>
            {
                showColorPicker && (
                    <div className={s.popup}>
                        <SketchPicker
                            color={{ r, g, b, a }}
                            onChangeComplete={v => {
                                onColorChange(v.rgb);
                            }} />
                    </div>
                )
            }
        </div>
    )
}

export default ColorPicker;