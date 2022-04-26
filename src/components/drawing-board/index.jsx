import { useRef, useEffect, useContext, useCallback } from 'react';
import s from './style.module.scss';
import { DrawingContext, initialSelection } from '../../context/drawing-context';
import { TOOL_TYPE } from '../../constants';
import SelectionArea from '../selection-area';
import { getIndexByCoords } from '../../utils';
import RectArea from '../rect-area';

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
        pencilColor: { r, g, b, a },
        selection,
        setSelection,
    } = useContext(DrawingContext);
    const isDraggingRef = useRef(null);
    const selectionRef = useRef(null);
    const modeRef = useRef(null);

    useEffect(() => {
        modeRef.current = mode;
        setSelection(initialSelection)
    }, [mode])
    useEffect(() => {
        selectionRef.current = selection;
    }, [selection])
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
    }, [pxSize, board]);
    const changeOnePxData = (left, top) => {
        const [x, y] = getIndexByCoords(left, top, pxSize);

        const newPxData = pxData.slice();
        if (mode === TOOL_TYPE.RUBBER) {
            newPxData[x][y] = [0, 0, 0, 0];
        }
        if (mode === TOOL_TYPE.PENCIL) {
            newPxData[x][y] = [r, g, b, a];
        }

        setPxData(newPxData)
    }
    const rectAreaDataRef = useRef(null);
    const getRectAreaData = (rectAreaData) => {
        rectAreaDataRef.current = rectAreaData;
    }
    const pxDataRef = useRef(null);
    useEffect(() => {
        pxDataRef.current = pxData;
    }, [pxData])
    const handleChangePxDataByRect = () => {
        const newPxData = pxDataRef.current.slice();

        rectAreaDataRef.current.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                const isEmpty = col[0] === 0 && col[1] === 0 && col[2] === 0 && col[3] === 0;
                if (!isEmpty) {
                    newPxData[rowIndex][colIndex] = [...col];
                }
            })
        })
        setPxData(newPxData);
    }
    const handleMouseDown = (e) => {
        const { left, top } = canvasRef.current.getBoundingClientRect();
        if (mode === TOOL_TYPE.PENCIL || mode === TOOL_TYPE.RUBBER) {
            isDraggingRef.current = true;
            changeOnePxData(e.clientX - left, e.clientY - top);
        }
        if (mode === TOOL_TYPE.SELECTION || mode === TOOL_TYPE.RECT) {
            isDraggingRef.current = true;
            const x = Math.floor((e.clientX - left) / pxSize) * pxSize;
            const y = Math.floor((e.clientY - top) / pxSize) * pxSize;

            setSelection({
                status: 0,
                startX: x,
                startY: y,
                endX: x,
                endY: y,
                originStartX: e.clientX - left,
                originStartY: e.clientY - top,
            })
        }
    }

    const handleMouseMove = (e) => {
        const { left, top } = canvasRef.current.getBoundingClientRect();
        if (mode === TOOL_TYPE.PENCIL || mode === TOOL_TYPE.RUBBER) {
            if (!isDraggingRef.current) return;
            changeOnePxData(e.clientX - left, e.clientY - top);
        }
        if (mode === TOOL_TYPE.SELECTION || mode === TOOL_TYPE.RECT) {
            if (!isDraggingRef.current) return;
            const { originStartX, originStartY } = selection;
            let startX = Math.floor(originStartX / pxSize) * pxSize;
            let startY = Math.floor(originStartY / pxSize) * pxSize;
            let endX = Math.floor((e.clientX - left) / pxSize) * pxSize;
            let endY = Math.floor((e.clientY - top) / pxSize) * pxSize;
            if (e.clientX - left > originStartX && e.clientY - top > originStartY) {
                endX += pxSize;
                endY += pxSize;
            }
            if (e.clientX - left > originStartX && e.clientY - top < originStartY) {
                endX += pxSize;
                startY += pxSize;
            }
            if (e.clientX - left < originStartX && e.clientY - top > originStartY) {
                startX += pxSize;
                endY += pxSize;
            }
            if (e.clientX - left < originStartX && e.clientY - top < originStartY) {
                startX += pxSize;
                startY += pxSize;
            }

            setSelection({
                ...selection,
                startX,
                startY,
                endX,
                endY,
            })
        }
    }

    const handleMouseUp = useCallback((e) => {
        if (modeRef.current === TOOL_TYPE.PENCIL || modeRef.current === TOOL_TYPE.RUBBER) {
            if (isDraggingRef.current) {
                isDraggingRef.current = false;
            }
        }
        if (modeRef.current === TOOL_TYPE.SELECTION || modeRef.current === TOOL_TYPE.RECT) {
            if (isDraggingRef.current) {
                isDraggingRef.current = false;
            }
            setSelection({
                ...selectionRef.current,
                status: 1,
            })

            if (modeRef.current === TOOL_TYPE.RECT) {
                handleChangePxDataByRect()
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener('mouseup', handleMouseUp);

        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    return (
        <div 
            className={s.wrapper} 
            onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}>
            <canvas 
                className={s.canvasBackground}
                width={board.width * pxSize}
                height={board.height * pxSize}
                ref={canvasBackgroundRef} />
            <canvas 
                className={s.canvas}
                width={board.width * pxSize}
                height={board.height * pxSize}
                ref={canvasRef} />
            {
                mode === TOOL_TYPE.SELECTION && (
                    <SelectionArea />
                )
            }
            {
                mode === TOOL_TYPE.RECT && (
                    <RectArea getRectAreaData={getRectAreaData} />
                )
            }
        </div>
    )
}

export default DrawingBoard;