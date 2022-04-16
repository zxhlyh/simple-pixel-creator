import { createContext, useState, useRef, useEffect } from 'react';
import { 
    TOOL_TYPE, 
    COLOR_OPERATE,
    MIN_PX_SIZE,
    MAX_PX_SIZE,
    VIEW_SIZE,
} from '../constants';

export const DrawingContext = createContext({})

const initialBoard = {
    width: 60,
    height: 60,
}

const DrawingContextProvider = ({
    children
}) => {
    const drawingRef = useRef(null);
    const drawingContextRef = useRef(null);
    const [board] = useState(initialBoard);
    const [pxData, setPxData] = useState([]);
    const [pxSize, setPxSize] = useState(MIN_PX_SIZE);
    const [mode, setMode] = useState(TOOL_TYPE.PENCIL);
    const [pencilColor, setPencilColor] = useState({ r: 247, g: 82, b: 49, a: 1 });
    const [operate, setOperate] = useState('');
    const [exportColorMode, setExportColorMode] = useState(COLOR_OPERATE.ORIGINAL);

    const computePx = () => {
        let px = Math.floor(VIEW_SIZE / (board.width > board.height ? board.width : board.height));
        if (px < MIN_PX_SIZE) {
            px = MIN_PX_SIZE;
        } else if (px > MAX_PX_SIZE) {
            px = MAX_PX_SIZE;
        }
        setPxSize(px);
    }

    const initPxData = () => {
        setPxData(Array(board.width).fill(0).map(() => Array(board.height).fill(0).map(() => [0, 0, 0, 0])));
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
                pxData,
                setPxData,
                initPxData,
            }}>
            {children}
        </DrawingContext.Provider>
    )
}

export default DrawingContextProvider;