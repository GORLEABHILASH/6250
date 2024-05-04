import React, {useState} from "react";
import "./buttonTypeOne.css"

const ButtonTypeOne = (props = {}) => {
    const { onClick, text = ``, className = `` , triggerClickInstantly = false} = props;
  
    const [ ripple,  setRipple ] = useState(false);
    const [showSpan, setShowSpan] = useState(false);
    const [x, setX] = useState();
    const [y, setY] = useState();
    const onClickTrigger = (e) => {
        setRipple(true);
        setShowSpan(true);
        const rectangle = e.target.getBoundingClientRect();
        let x = e.clientX - rectangle.left;

        // Get position of Y
        let y = e.clientY - rectangle.top;
        setX(x); setY(y);
        setTimeout(() => {
            setRipple(false)
            setShowSpan(false);
            !triggerClickInstantly && onClick && onClick(e);
        }, 200)
        triggerClickInstantly && onClick && onClick(e);
    }
    return <>
        <div className={"button-type-one " + className} onClick={onClickTrigger}>
            {text}
            {showSpan ? <span style={{left: x, top: y}} className={'ripple-span '+ (ripple ? "ripple": '')}></span> : null}
        </div>
    </>;
};

export default ButtonTypeOne;