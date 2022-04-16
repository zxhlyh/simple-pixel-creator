export const TOOL_TYPE = {
    'PENCIL': 'PENCIL',
    'SELECTION': 'SELECTION',
    'RUBBER': 'RUBBER',
    'MOVE': 'MOVE',
    'RECT': 'RECT',
    'CIRCLE': 'CIRCLE',
    'TEXT': 'TEXT',
}

export const tools = [
    {
        id: TOOL_TYPE.PENCIL,
        icon: '✏️',
        name: '画笔',
    },
    {
        id: TOOL_TYPE.RUBBER,
        icon: '🗑',
        name: '橡皮擦',
    },
    {
        id: TOOL_TYPE.SELECTION,
        icon: '🕸️',
        name: '选区',
        disabled: true,
    },
    {
        id: TOOL_TYPE.MOVE,
        icon: '🛞',
        name: '移动',
        disabled: true,
    },
    {
        id: TOOL_TYPE.RECT,
        icon: '🎲',
        name: '矩形',
        disabled: true,
    },
    {
        id: TOOL_TYPE.CIRCLE,
        icon: '🍎',
        name: '圆形',
        disabled: true,
    },
    {
        id: TOOL_TYPE.TEXT,
        icon: '🇹',
        name: '文字',
        disabled: true,
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
    {
        id: OPERATE_TYPE.NEW,
        name: '新建',
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

export const MIN_PX_SIZE = 12;
export const MAX_PX_SIZE = 20;
export const VIEW_SIZE = 720;
export const ZOOM_STEP = 5;