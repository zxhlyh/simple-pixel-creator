import { createContext, useState, useRef, useEffect } from 'react';
import { 
    TOOL_TYPE, 
    COLOR_OPERATE,
    MIN_PX_SIZE,
} from '../constants';
import { getTwoDimensionsZeroArray } from '../utils'; 

export const DrawingContext = createContext({})

const initialBoard = {
    width: 70,
    height: 70,
}

export const initialSelection = {
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    status: 0,
    originStartX: 0,
    originStartY: 0,
}

const DrawingContextProvider = ({
    children
}) => {
    const drawingRef = useRef(null);
    const drawingContextRef = useRef(null);
    const [board, setBoard] = useState(initialBoard);
    const [pxData, setPxData] = useState([]);
    const [pxSize, setPxSize] = useState(MIN_PX_SIZE);
    const [mode, setMode] = useState(TOOL_TYPE.PENCIL);
    const [pencilColor, setPencilColor] = useState({ r: 0, g: 102, b: 255, a: 100 });
    const [operate, setOperate] = useState('');
    const [exportColorMode, setExportColorMode] = useState(COLOR_OPERATE.ORIGINAL);
    const [selection, setSelection] = useState(initialSelection);

    const computePx = () => {
        setPxSize(MIN_PX_SIZE);
    }

    const initPxData = () => {
        setPxData(getTwoDimensionsZeroArray(board.width, board.height));
    }

    useEffect(() => {
        computePx();
        initPxData();
    }, [board])

    const drawing = () => {
        pxData.forEach((row, rowIndex) => {
            row.forEach((col, colIndex) => {
                if (col[0] === 0 && col[1] === 0 && col[2] === 0 && col[3] === 0) {
                    drawingContextRef.current.clearRect(rowIndex * pxSize, colIndex * pxSize, pxSize, pxSize);
                } else {
                    drawingContextRef.current.fillStyle = `rgba(${col[0]}, ${col[1]}, ${col[2]}, ${col[3]})`;
                    drawingContextRef.current.fillRect(rowIndex * pxSize, colIndex * pxSize, pxSize, pxSize);
                }
            })
        })
    }

    useEffect(() => {
        drawing();
    }, [pxData, pxSize])

    return (
        <DrawingContext.Provider
            value={{
                drawingRef,
                drawingContextRef,
                mode,
                setMode,
                pencilColor,
                setPencilColor,
                operate,
                setOperate,
                exportColorMode,
                setExportColorMode,
                drawing,
                pxSize,
                setPxSize,
                board,
                setBoard,
                pxData,
                setPxData,
                initPxData,
                selection,
                setSelection,
            }}>
            {children}
        </DrawingContext.Provider>
    )
}

export default DrawingContextProvider;