import { useContext, useRef, useState, useEffect } from 'react';
import s from './style.module.scss';
import { DrawingContext } from '../../context/drawing-context';
import { getTwoDimensionsZeroArray, getLineIndexByCoords } from '../../utils';

const LineArea = ({
    getLineAreaData,
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
    const width = Math.abs(startX - endX);
    const height = Math.abs(startY - endY);

    const initBoard = ()  => {
        canvasContextRef.current = canvasRef.current.getContext('2d');
    }

    useEffect(() => {
        getLineAreaData(pxData);
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
        const lines = getLineIndexByCoords({ startX, startY, endX, endY }, pxSize)
        const newData = getTwoDimensionsZeroArray(board.width, board.height);
        for (let i = 0; i < lines.length; i++) {
            newData[lines[i][0]][lines[i][1]] = [r, g, b, a];
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

export default LineArea;