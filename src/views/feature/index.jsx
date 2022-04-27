import { Fragment} from 'react';
import s from './style.module.scss';
import cn from 'classnames';

const features = [
    {
        name: '画笔',
        done: true,
    },
    {
        name: '橡皮擦',
        done: true,
    },
    {
        name: '选区',
        done: true,
        children: [
            {
                name: '填充',
                done: true,
                level: 1,
            },
            {
                name: '复制',
                done: false,
                level: 1,
            },
            {
                name: '剪切',
                done: false,
                level: 1,
            },
            {
                name: '清除',
                done: true,
                level: 1,
            }
        ],
    },
    {
        name: '矩形',
        done: true,
    },
    {
        name: '直线',
        done: false,
    },
    {
        name: '圆形',
        done: false,
    },
    {
        name: '文字',
        done: false,
    },
    {
        name: '水平镜像',
        done: false,
    },
    {
        name: '垂直镜像',
        done: false,
    },
    {
        name: '新建画布',
        done: true,
    },
    {
        name: '清除画布',
        done: true,
    },
    {
        name: '放大画布',
        done: true,
    },
    {
        name: '缩小画布',
        done: true,
    },
    {
        name: '导出',
        done: false,
        children: [
            {
                name: 'PNG',
                done: true,
                level: 1,
            },
            {
                name: 'JPG',
                done: false,
                level: 1,
            }
        ],
    },
    {
        name: '导入',
        done: false,
    },
    {
        name: '上一步',
        done: false,
    },
    {
        name: '下一步',
        done: false,
    },
    {
        name: '视图导航',
        done: false,
    },
    {
        name: '简单图层',
        done: false,
    }
]

const Feature = () => {
    const renderList = (list) => {
        return (
            <div className={s.list}>
                {
                    list.map(item => {
                        return (
                            <Fragment key={item.name}>
                                <div 
                                    className={s.item}
                                    style={{ marginLeft: item.level ? item.level * 24 : 0 }}>
                                    <input type='checkbox' checked={item.done} onChange={() => {}} />
                                    {item.name}
                                </div>
                                {item.children && renderList(item.children)}
                            </Fragment>
                        )
                    })
                }
            </div>
        )
    }

    return (
        <div className={s.feature}>
            {renderList(features)}
        </div>
    )
};

export default Feature;