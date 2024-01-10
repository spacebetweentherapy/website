export default function RichTextImage({ file, title, className }) {
    return (
        <img className={className} src={file.url} alt={title} />
    )
}