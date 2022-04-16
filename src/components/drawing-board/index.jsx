import { useRef, useEffect, useContext, useCallback } from 'react';
import s from './style.module.scss';
import { DrawingContext } from '../../context/drawing-context';
import { TOOL_TYPE, VIEW_SIZE } from '../../constants';

const DrawingBoard = () => {
    const canvasRef = useRef(null);
    const canvasBackgroundRef = useRef(null);
    const { 
        mode,
        drawingRef,
        drawingContextRef,
        board,
        pxSize,
        pxData,
        setPxData,
        pencilColor,
    } = useContext(DrawingContext);
    const isDraggingRef = useRef(null);

    const initBoard = ()  => {
        drawingRef.current = canvasRef.current;
        drawingContextRef.current = canvasRef.current.getContext('2d');
        const ctx = canvasBackgroundRef.current.getContext('2d');

        for (let i = 0; i < board.width * pxSize; i += pxSize) {
            for (let j = 0; j < board.height * pxSize; j += pxSize) {
                const row = Math.floor(i / pxSize);
                const col = Math.floor(j / pxSize);
                if (row % 2 === 0) {
                    if (col % 2 === 0) {
                        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
                    } else {
                        ctx.fillStyle = `rgba(204, 204, 204, 1)`;
                    }
                } else {
                    if (col % 2 === 0) {
                        ctx.fillStyle = `rgba(204, 204, 204, 1)`;
                    } else {
                        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
                    }
                }
                ctx.fillRect(i, j, pxSize, pxSize);
            }
        }
    }

    useEffect(() => {
        initBoard();
    }, [pxSize]);
    const changeOnePxData = (left, top) => {
        const x = Math.floor(left / pxSize);
        const y = Math.floor(top / pxSize);

        const newPxData = pxData.slice();
        if (mode === TOOL_TYPE.RUBBER) {
            newPxData[x][y] = [0, 0, 0, 0];
        }
        if (mode === TOOL_TYPE.PENCIL) {
            newPxData[x][y] = [pencilColor.r, pencilColor.g,pencilColor.b,pencilColor.a];
        }

        setPxData(newPxData)
    }
    const handleMouseDown = (e) => {
        if (mode === TOOL_TYPE.SELECTION || mode === TOOL_TYPE.MOVE) return;
        const { left, top } = canvasRef.current.getBoundingClientRect();
        isDraggingRef.current = true;
        changeOnePxData(e.clientX - left, e.clientY - top);
    }

    const handleMouseMove = (e) => {
        if (mode === TOOL_TYPE.SELECTION || mode === TOOL_TYPE.MOVE) return;
        if (!isDraggingRef.current) return;
        const { left, top } = canvasRef.current.getBoundingClientRect();
        changeOnePxData(e.clientX - left, e.clientY - top);
    }

    const handleMouseLeave = useCallback(() => {
        if (isDraggingRef.current) {
            isDraggingRef.current = false;
        }
    }, []);

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseLeave);

        return () => window.removeEventListener('mouseup', handleMouseLeave);
    }, []);
    
    return (
        <div className={s.wrapper} style={{ width: VIEW_SIZE, height: VIEW_SIZE }}>
            <canvas 
                className={s.canvasBackground}
                width={board.width * pxSize}
                height={board.height * pxSize}
                ref={canvasBackgroundRef} />
            <canvas 
                className={s.canvas}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                width={board.width * pxSize}
                height={board.height * pxSize}
                ref={canvasRef} />
        </div>
    )
}

export default DrawingBoard;