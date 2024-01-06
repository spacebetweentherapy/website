import Image from './image'

export default function Hero({heading, shortText, url, width, height, contentType, description, className}) {
    let firstWord = ""
    let otherWords = ""
    if (heading) {
        let words = heading.split(' ', 2)
        firstWord = words[0]
        otherWords = words[1]
    }
    
    return (
        <div className="hero">
            <div className="hero__wrapper">
                <div className="hero__content">
                    { heading ?
                        <h1 className="hero__title">
                        <span className="hero__first-word">{firstWord}</span> {otherWords}
                        </h1>
                    : ''}

                    { shortText ?
                        <p className="hero__text">{shortText}</p>
                    : ''}
                </div>
                <Image
                    url={url} 
                    contentType={contentType} 
                    width={width} 
                    height={height} 
                    description={description} 
                    className="hero__image"
                />
            </div>
        </div>
    )
}