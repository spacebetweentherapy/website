import { fetchGraphQL } from'../lib/cms'

export async function fetchAsset(id) {
    const asset = await fetchGraphQL(`query {
        asset (id: "${id}") {
            url
            contentType
            width
            height
            title
            description
          }
    }`)
    return asset?.data?.asset?
}

export default async function CmsImage({id}) {
    const asset = await fetchAsset(id)

    return (
        <img
            src={`${asset.url}?w=${asset.width}&h=${asset.height}`}
            width={asset.width}
            height={asset.height}
            alt={asset.description}
        />
    )
}