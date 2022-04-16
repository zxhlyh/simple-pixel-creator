import { useContext } from 'react';
import s from './style.module.scss';
import ToolBar from '../../components/tool-bar';
import DrawingBoard from '../../components/drawing-board';
import OperateBar from '../../components/operate-bar';
import { DrawingContext } from '../../context/drawing-context';

const Home = () => {
    const { board } = useContext(DrawingContext);

    return (
        <div className={s.home}>
            <ToolBar />
            <div className={s.main}>
                <div className={s.info}>
                    宽: {board.width}&emsp;X&emsp;
                    高: {board.height}
                </div>
                <DrawingBoard />
            </div>
            <OperateBar />
        </div>
    )
}

export default Home;