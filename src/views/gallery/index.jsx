import s from './style.module.scss';
import mario from './img/mario.png';
import pikachu from './img/pikachu.png';

const imgs = [
    {
        name: '马里奥',
        src: mario,
    },
    {
        name: '皮卡丘',
        src: pikachu,
    }
];

const Gallery = () => {

    return (
        <div className={s.gallery}>
            <div className={s.list}>
                {
                    imgs.map((img, index) => (
                        <div className={s.item} key={index}>
                            <div className={s.itemImg} style={{
                                backgroundImage: `url(${img.src})`,
                            }}>
                                
                            </div>
                            <div className={s.itemName}>{img.name}</div>
                        </div>
                        
                    ))
                }
            </div>
        </div>
    )
};

export default Gallery;