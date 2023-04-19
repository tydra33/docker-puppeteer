import { useState } from "react";

interface SliderImage {
    id: Number;
    name: string;
    links: string;
}

function ImageSlider({ links, name }: SliderImage) {
    const [currIndex, setCurrIndex] = useState(0)
    const urls = links.split(" ")
    urls.pop() // last image can't be loaded

    // CSS
    const imgStyle: React.CSSProperties = {
        width: "100%",
        height: "250px",
        maxWidth: "none",
        borderRadius: "10px",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundImage: `url(${urls[currIndex]})`
    }

    const arrowStyle: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-200%)",
        width: "30px",
        height: "30px",
        backgroundColor: "#fff",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.3)",
        border: "none",
        outline: "none",
    };
    const leftArrowStyle: React.CSSProperties = {
        ...arrowStyle,
        left: "10px",
    };
    const rightArrowStyle: React.CSSProperties = {
        ...arrowStyle,
        right: "10px",
    };

    const titleStyle: React.CSSProperties = {
        marginBottom: "20px",
    };
    // CSS

    // TS
    const prevImg = () => {
        setCurrIndex((currIndex - 1 + urls.length) % urls.length);
    };
    const nextImg = () => {
        setCurrIndex((currIndex + 1) % urls.length);
    };
    // TS

    // <div style={imgStyle}></div>

    return (
        <div className="card">
            <button style={leftArrowStyle} onClick={prevImg}>{"<"}</button>
            <div style={imgStyle}></div>
            <button style={rightArrowStyle} onClick={nextImg}>{">"}</button>

            <h3 style={titleStyle}>{name}</h3>
        </div>
    )
}

export default ImageSlider
export type { SliderImage }