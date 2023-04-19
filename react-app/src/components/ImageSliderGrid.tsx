import ImageSlider, { SliderImage } from "./ImageSlider";

function ImageSliderGrid({ sliders, loading }: { sliders: SliderImage[], loading: boolean }) {
    if (loading) {
        return <h2>loading data...</h2>
    }

    // CSS
    const containerStyle: React.CSSProperties = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        columnGap: "20px",
        rowGap: "20px",
    };
    // CSS

    return (
        <div style={containerStyle}>
            {sliders.map((slider, i) => (
                <ImageSlider key={i} id={slider.id} links={slider.links} name={slider.name} />
            ))}
        </div>
    );
}

export default ImageSliderGrid