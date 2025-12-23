"use client"

import { useParams, useRouter, notFound } from "next/navigation"
import { useEffect } from "react"
import { Header } from "@/components/header"
import { ComingSoon } from "@/components/coming-soon"
import { getAgentBySlug } from "@/lib/agents"

// Map agent slugs to their actual page routes
const agentRoutes: Record<string, string> = {
  "gorsel-olustur": "/create/image",
  "video-olustur": "/create/video",
  "ugc-gorsel": "/agents/ugc-image",
  "ugc-video": "/agents/ugc-video",
}

export default function AgentPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const agent = getAgentBySlug(slug)

  useEffect(() => {
    if (!agent) return

    // For active agents with existing routes, redirect to those routes
    const existingRoute = agentRoutes[slug]
    if (existingRoute && agent.isActive) {
      router.replace(existingRoute)
    }
  }, [agent, slug, router])

  if (!agent) {
    notFound()
  }

  // If redirecting, show loading state
  const existingRoute = agentRoutes[slug]
  if (existingRoute && agent.isActive) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-zinc-500">Yönlendiriliyor...</div>
      </div>
    )
  }

  // For inactive agents, show coming soon
  return (
    <>
      <Header title={agent.name} />
      <ComingSoon />
    </>
  )
}
