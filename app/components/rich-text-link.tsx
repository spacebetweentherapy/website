export default function RichTextLink({ slug, children }) {
    return (
        <a href="{slug}">{children}</a>
    )
}