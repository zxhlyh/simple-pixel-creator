import { useRef, useEffect, useContext, useState } from 'react';
import s from './style.module.scss';
import cn from 'classnames';
import { colorOperates, COLOR_OPERATE } from '../../constants';
import { DrawingContext } from '../../context/drawing-context';
import Modal from '../modal';

const ExportModal = () => {
    const { 
        setOperate,
        exportColorMode,
        setExportColorMode,
        drawingRef,
        board,
        pxData,
    } = useContext(DrawingContext);
    const canvasRef = useRef(null);
    const canvasContextRef = useRef(null);
    const imageDataRef = useRef(null);
    const [imgUrl, setImgUrl] = useState('');

    const handleCloseModal = () => {
        setOperate('');
        setExportColorMode(COLOR_OPERATE.ORIGINAL);
    }

    const initCanvas = () => {
        canvasContextRef.current = canvasRef.current.getContext('2d');
        imageDataRef.current = canvasContextRef.current.createImageData(board.width, board.height);
    }
    const renderImg = () => {
        const data = imageDataRef.current.data;
        for (let i = 0; i < data.length; i += 4) {
            const y = Math.floor(i / 4 / board.width);
            const x = (i / 4) - y * board.width;
            let color = pxData[x][y];
            if (exportColorMode === COLOR_OPERATE.GRAY) {
                const avg = (color[0] + color[1] + color[2]) / 3;
                color = [avg, avg, avg, color[3]];
            }
            if (exportColorMode === COLOR_OPERATE.INVERT) {
                color = [255 - color[0], 255 - color[1], 255 - color[2], color[3]];
            }
            data[i] = color[0];
            data[i + 1] = color[1];
            data[i + 2] = color[2];
            data[i + 3] = color[3] * 255;
        }
        canvasContextRef.current.putImageData(imageDataRef.current, 0, 0);
        setImgUrl(canvasRef.current.toDataURL());
    }
    useEffect(() => {
        initCanvas();
    }, [])
    useEffect(() => {
        renderImg();
    }, [exportColorMode])

    return (
        <Modal onCancel={handleCloseModal}>
            <div className={s.wrapper}>
                <canvas
                    ref={canvasRef}
                    width={board.width}
                    height={board.height}
                    className={s.canvas} />
                <div className={s.title}>导出 PNG</div>
                {
                    imgUrl && (
                        <div 
                            className={s.preview} 
                            style={{ backgroundImage: `url(${imgUrl})` }} 
                        />
                    )
                }
                <div className={s.footer}>
                    {
                        colorOperates.map(item => (
                            <div
                                key={item.id} 
                                className={cn(s.footerItem, exportColorMode === item.id && s.footerItemActive)}
                                onClick={() => setExportColorMode(item.id)}>
                                {item.name}
                            </div>
                        ))
                    }
                </div>
                <a className={s.download} download href={imgUrl}>下载</a>
            </div>
        </Modal>
    )
};

export default ExportModal;