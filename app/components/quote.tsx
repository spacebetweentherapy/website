import Image from './image'

export default function Quote({text, author, imgUrl, imgWidth, imgHeight, imgDescription, imgContentType}) {
   return (
        <div className="quote">
            <div className="quote__wrapper">
            <div className="quote__overlay">
                <p className="quote__text">
                <span className="quote__quote-mark">&ldquo;</span>{text}<span className="quote__quote-mark">&rdquo;</span>
                </p>
                <p className="quote__author">{author}</p>
            </div>
            <Image url={imgUrl} width={imgWidth} height={imgHeight} contentType={imgContentType} description={imgDescription} className="quote__image" />
            </div>
        </div>
    )
}