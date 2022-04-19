import { useContext } from 'react';
import s from './style.module.scss';
import ToolBar from '../../components/tool-bar';
import DrawingBoard from '../../components/drawing-board';
import OperateBar from '../../components/operate-bar';
import { DrawingContext } from '../../context/drawing-context';
import { VIEW_SIZE } from '../../constants';
import ColorPicker from '../../components/color-picker';

const Home = () => {
    const { board, pencilColor, setPencilColor } = useContext(DrawingContext);

    return (
        <div className={s.home}>
            <ToolBar />
            <div className={s.main}>
                <div className={s.info} style={{ width: VIEW_SIZE }}>
                    <div className={s.color}>
                        <ColorPicker
                            color={pencilColor}
                            onColorChange={setPencilColor} />
                        &nbsp;
                        选择颜色
                    </div>
                    <div className={s.data}>
                        宽: {board.width}&emsp;X&emsp;
                        高: {board.height}
                    </div>
                </div>
                <DrawingBoard />
            </div>
            <OperateBar />
        </div>
    )
}

export default Home;