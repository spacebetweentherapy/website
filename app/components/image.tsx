export default async function Image({url, width, height, contentType, description, className = "", x2=false, showBorder=false}) {
    let srcSet = url + "?w=" + width + "&h=" + height
    if (x2) {
        srcSet = url + "?w=" + width*2 + "&h=" + height*2 + " 2x, " + srcSet
    }

    return (
        <picture className={`image ${className}`}>
            <source srcSet={srcSet} type="image/webp"/>
            <source srcSet={srcSet} type={contentType}/>
            <img
                src={`${url}?w=${width}&h=${height}`}
                width={width}
                height={height}
                alt={description}
                className={`image ${className}`}
            />
        </picture>
    )
}