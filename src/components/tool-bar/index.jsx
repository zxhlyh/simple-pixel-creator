import { useContext } from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { tools } from '../../constants';
import { DrawingContext } from '../../context/drawing-context';

const ToolBar = () => {
    const { 
        mode, 
        setMode,
    } = useContext(DrawingContext);

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
                        {item.icon}&emsp;{item.name}
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default ToolBar;