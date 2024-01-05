import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Home',
}

export default async function Page() {
    return <h1>Home</h1>
}