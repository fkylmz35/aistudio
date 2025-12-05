import { Header } from "@/components/header"
import { MasonryGrid } from "@/components/masonry-grid"

export default function ExplorePage() {
  return (
    <>
      <Header title="Keşfet" />
      <div className="p-6">
        <MasonryGrid />
      </div>
    </>
  )
}
