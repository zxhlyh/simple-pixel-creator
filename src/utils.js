export const getIndexByCoords = (x, y, pxSize) => {
    return [Math.floor(x / pxSize), Math.floor(y / pxSize)];
}

export const getTwoDimensionsZeroArray = (width, height) => {
    return Array(width).fill(0).map(() => Array(height).fill(0).map(() => [0, 0, 0, 0]))
}

export const getLineIndexByCoords = ({ startX, startY, endX, endY }, pxSize) => {
    const width = Math.abs(startX - endX);
    const height = Math.abs(startY - endY);
    const horizontal = width > height;
    const right = endX - startX;
    const down = endY - startY;
    const breaks = width > height ? height / pxSize : width / pxSize;
    const groups = width > height ? width / pxSize : height / pxSize;
    const [x, y] = getIndexByCoords(startX + (pxSize / 2), startY + (pxSize / 2), pxSize);
    const offset = Math.ceil(groups / breaks);
    const spare = offset * breaks - groups;
    const firstSpare = Math.floor(spare / 2);
    const lastSpare = spare - firstSpare;

    const result = [];
    for (let i = 0; i < breaks; i++) {
        let coords = [];
        if (horizontal) {
            if (down > 0) {
                coords = [0, y + i];
            } else {
                coords = [0, y - i];
            }
        } else {
            if (right > 0) {
                coords = [x + i, 0];
            } else {
                coords = [x - i, 0];
            }
        }
        result.push(Array(offset).fill(coords));
    }

    for (let i = 0; i < firstSpare; i++) {
        result[i].splice(0, 1)
    }
    for (let i = breaks - lastSpare; i < breaks; i++) {
        result[i].splice(0, 1)
    }
    const newResult = result.flat();
    const res = [];
    for (let i = 0; i < groups; i++) {
        if (horizontal) {
            if (right > 0) {
                res.push([x + i, newResult[i][1]]);
            } else {
                res.push([x - i, newResult[i][1]]);
            }
        } else {
            if (down > 0) {
                res.push([newResult[i][0], y + i])
            } else {
                res.push([newResult[i][0], y - i])
            }
        }
        
    }

    return res;
}