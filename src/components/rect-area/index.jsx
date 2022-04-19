import { useContext, useRef, useState, useEffect } from 'react';
import s from './style.module.scss';
import { DrawingContext } from '../../context/drawing-context';
import { getIndexByCoords, getTwoDimensionsZeroArray } from '../../utils';

const RectArea = ({
    getRectAreaData,
}) => {
    const { 
        board,
        pxSize,
        pencilColor: { r, g, b, a },
        selection,
    } = useContext(DrawingContext);
    const canvasRef = useRef(null);
    const canvasContextRef = useRef(null);
    const [pxData, setPxData] = useState([]);
    const { startX, startY, endX, endY } = selection;
    const left = startX > endX ? endX : startX;
    const top = startY > endY ? endY : startY;
    const width = Math.abs(startX - endX);
    const height = Math.abs(startY - endY);

    const initBoard = ()  => {
        canvasContextRef.current = canvasRef.current.getContext('2d');
    }

    useEffect(() => {
        getRectAreaData(pxData);
    }, [pxData])
    useEffect(() => {
        initBoard();
    }, [pxSize]);

    const drawing = () => {
        pxData.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (col[0] === 0 && col[1] === 0 && col[2] === 0 && col[3] === 0) {
                    canvasContextRef.current.clearRect(rowIndex * pxSize, colIndex * pxSize, pxSize, pxSize);
                } else {
                    canvasContextRef.current.fillStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${col[3]})`;
                    canvasContextRef.current.fillRect(rowIndex * pxSize, colIndex * pxSize, pxSize, pxSize);
                }
            })
        })
    }

    const handleChangePxData = () => {
        if (width === 0 || height === 0) return;
        const newData = getTwoDimensionsZeroArray(board.width, board.height);
        for (let i = 0; i < newData.length; i++) {
            for (let j = 0; j < newData[i].length; j++) {
                const [firstX, firstY] = getIndexByCoords(left, top, pxSize);
                const [lastX, lastY] = getIndexByCoords(left + width, top + height, pxSize);
                    
                const inRect = i >= firstX && i <= lastX -1 && j >= firstY && j <= lastY -1;
                const equalXY = i === firstX || i === lastX -1 || j === firstY || j === lastY - 1;
                if (inRect && equalXY) {
                    newData[i][j] = [r, g, b, a];
                } else {
                    newData[i][j] = [0, 0, 0, 0];
                }
            }
        }
        setPxData(newData);
    }

    useEffect(() => {
        if (selection.status === 0) {
            handleChangePxData();
        } else {
            setPxData(getTwoDimensionsZeroArray(board.width, board.height));
        }
    }, [selection]);

    useEffect(() => {
        drawing();
    }, [pxData]);

    return (
        <canvas 
            className={s.canvas}
            width={board.width * pxSize}
            height={board.height * pxSize}
            ref={canvasRef} />
    )
}

export default RectArea;