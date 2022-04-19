export const getIndexByCoords = (x, y, pxSize) => {
    return [Math.floor(x / pxSize), Math.floor(y / pxSize)];
}

export const getTwoDimensionsZeroArray = (width, height) => {
    return Array(width).fill(0).map(() => Array(height).fill(0).map(() => [0, 0, 0, 0]))
}