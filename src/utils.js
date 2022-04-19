export const getIndexByCoords = (x, y, pxSize) => {
    return [Math.floor(x / pxSize), Math.floor(y / pxSize)];
}