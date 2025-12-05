import { TopHeader } from "@/components/top-header"
import { StickyNav } from "@/components/sticky-nav"
import { Footer } from "@/components/footer"
import { Suspense } from "react"
import { getProjects, getProjectCategories, type Project, type ProjectCategory } from "@/lib/wordpress"
import SuccessfulProjectsPageContent from "./SuccessfulProjectsPageContent"

// ============= 服务器端数据获取 =============
async function getServerData() {
  try {
    const [projectsData, categoriesData] = await Promise.all([
      getProjects(),
      getProjectCategories()
    ])
    return { projects: projectsData, categories: categoriesData, error: null }
  } catch (error) {
    console.error('Server data fetch failed:', error)
    return { projects: [], categories: [], error: error.message }
  }
}

export default async function SuccessfulProjectsPage() {
  const serverData = await getServerData()

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SuccessfulProjectsPageContent
        initialProjects={serverData.projects}
        initialCategories={serverData.categories}
        serverError={serverData.error}
      />
    </Suspense>
  )
}

