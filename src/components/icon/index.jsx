import s from './style.module.scss';
import cn from 'classnames';

const Icon = ({ type, className }) => {
    return (
        <div className={cn(s.icon, s[`icon-${type}`], className)}></div>
    )
}

export default Icon