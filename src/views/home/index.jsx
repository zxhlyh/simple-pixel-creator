import { useContext } from 'react';
import s from './style.module.scss';
import ToolBar from '../../components/tool-bar';
import DrawingBoard from '../../components/drawing-board';
import OperateBar from '../../components/operate-bar';
import { DrawingContext } from '../../context/drawing-context';
import ColorPicker from '../../components/color-picker';
import ExportModal from "../../components/export-modal";
import CreateModal from "../../components/create-modal";
import { OPERATE_TYPE } from "../../constants";

const Home = () => {
    const { board, pencilColor, setPencilColor, operate } = useContext(DrawingContext);

    return (
        <div className={s.home}> 
            <div className={s.left}>
                <ToolBar />
            </div>
            <div className={s.main}>
                <div className={s.info}>
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
                <div className={s.board}>
                    <DrawingBoard />
                </div>
            </div>
            <div className={s.right}>
                <OperateBar />
            </div>
            {operate === OPERATE_TYPE.EXPORT && <ExportModal />}
            {operate === OPERATE_TYPE.NEW && <CreateModal />}
        </div>
    )
}

export default Home;