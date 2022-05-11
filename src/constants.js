export const TOOL_TYPE = {
    'PENCIL': 'PENCIL',
    'SELECTION': 'SELECTION',
    'RUBBER': 'RUBBER',
    'RECT': 'RECT',
    'CIRCLE': 'CIRCLE',
    'TEXT': 'TEXT',
    'LINE': 'LINE',
    'MIRRORX': 'MIRRORX',
    'MIRRORY': 'MIRRORY',
}

export const tools = [
    {
        id: TOOL_TYPE.PENCIL,
        name: '画笔',
    },
    {
        id: TOOL_TYPE.RUBBER,
        name: '橡皮擦',
    },
    {
        id: TOOL_TYPE.SELECTION,
        name: '选区',
    },
    {
        id: TOOL_TYPE.RECT,
        name: '矩形',
    },
    {
        id: TOOL_TYPE.LINE,
        name: '直线',
    },
    {
        id: TOOL_TYPE.CIRCLE,
        name: '圆形',
        disabled: true,
    },
    {
        id: TOOL_TYPE.TEXT,
        name: '文字',
        disabled: true,
    },
    {
        id: TOOL_TYPE.MIRRORX,
        name: '水平镜像',
        disabled: true,
    }, 
    {
        id: TOOL_TYPE.MIRRORY,
        name: '垂直镜像',
        disabled: true,
    }, 
]

export const SELECTION_TYPE = {
    'BUCKET': 'BUCKET',
    'COPY': 'COPY',
    'CUT': 'CUT',
    'CLEAR': 'CLEAR',
}

export const selectionOperates = [
    {
        id: SELECTION_TYPE.BUCKET,
        name: '填充',
    },
    {
        id: SELECTION_TYPE.COPY,
        name: '复制',
        disabled: true,
    },
    {
        id: SELECTION_TYPE.CUT,
        name: '剪切',
        disabled: true,
    },
    {
        id: SELECTION_TYPE.CLEAR,
        name: '清除',
    },
]

export const OPERATE_TYPE = {
    'CLEAR': 'CLEAR',
    'ZOOM_IN': 'ZOOM_IN',
    'ZOOM_OUT': 'ZOOM_OUT',
    'NEW': 'NEW',
    'EXPORT': 'EXPORT',
    'IMPORT': 'IMPORT',
}

export const operates = [
    {
        id: OPERATE_TYPE.NEW,
        name: '新建',
    },
    {
        id: OPERATE_TYPE.CLEAR,
        name: '清除',
    },
    {
        id: OPERATE_TYPE.ZOOM_IN,
        name: '放大',
    },
    {
        id: OPERATE_TYPE.ZOOM_OUT,
        name: '缩小',
    },
    {
        id: OPERATE_TYPE.EXPORT,
        name: '导出',
    },
    {
        id: OPERATE_TYPE.IMPORT,
        name: '导入',
        disabled: true,
    },
]

export const COLOR_OPERATE = {
    'ORIGINAL': 'ORIGINAL',
    'GRAY': 'GRAY',
    'INVERT': 'INVERT',
    'SEPIA': 'SEPIA',
}

export const colorOperates = [
    {
        id: COLOR_OPERATE.ORIGINAL,
        name: '原始',
    },
    {
        id: COLOR_OPERATE.GRAY,
        name: '灰度'
    },
    {
        id: COLOR_OPERATE.INVERT,
        name: '反相'
    },
]

export const MIN_PX_SIZE = 10;
export const MAX_PX_SIZE = 24;
export const ZOOM_STEP = 5;