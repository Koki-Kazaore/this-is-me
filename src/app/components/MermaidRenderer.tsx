'use client'

import { useEffect, useRef } from 'react'
import mermaid, { type MermaidConfig } from 'mermaid'

const MERMAID_CONFIG: MermaidConfig = {
  startOnLoad: true,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#ffffff',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#ffffff',
    lineColor: '#ffffff',
    secondaryColor: '#444444',
    tertiaryColor: '#555555',
    background: 'transparent',
    secondaryBorderColor: '#ffffff',
    tertiaryBorderColor: '#ffffff',
    nodeTextColor: '#ffffff',
    mainBkg: '#1a1a1a',
    secondaryBkg: '#444444',
    tertiaryBkg: '#555555',
  }
}

let isMermaidInitialized = false

// Initialize mermaid only once per page; called from useEffect so it never runs during SSR
const ensureMermaidInitialized = () => {
  if (isMermaidInitialized) return
  mermaid.initialize(MERMAID_CONFIG)
  isMermaidInitialized = true
}

let fallbackIdCounter = 0

// crypto.randomUUID is only exposed in secure contexts (HTTPS/localhost), so plain-HTTP
// access such as http://192.168.x.x needs a fallback. Ids stay within [a-z0-9-] to remain
// valid as DOM ids and CSS selectors.
const createGraphId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `mermaid-${crypto.randomUUID()}`
  }
  fallbackIdCounter += 1
  // Random suffix avoids collisions when the counter restarts (HMR or multiple module copies)
  return `mermaid-${fallbackIdCounter.toString(36)}-${Math.random().toString(36).slice(2, 10)}`
}

interface MermaidRendererProps {
  chart: string
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart }) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      ensureMermaidInitialized()

      // Generate unique ID for each diagram
      const graphId = createGraphId()

      // Clear the element and render the diagram
      elementRef.current.innerHTML = ''

      try {
        mermaid.render(graphId, chart).then((result) => {
          if (elementRef.current) {
            elementRef.current.innerHTML = result.svg
          }
        }).catch((error) => {
          console.error('Mermaid rendering error:', error)
          if (elementRef.current) {
            elementRef.current.innerHTML = `<pre class="text-red-400">Error rendering diagram: ${error.message}</pre>`
          }
        })
      } catch (error) {
        console.error('Mermaid rendering error:', error)
        if (elementRef.current) {
          elementRef.current.innerHTML = `<pre class="text-red-400">Error rendering diagram</pre>`
        }
      }
    }
  }, [chart])

  return (
    <div
      ref={elementRef}
      className="mermaid-diagram flex justify-center items-center my-4 p-4 bg-transparent rounded-lg"
      style={{ minHeight: '200px' }}
    />
  )
}

export default MermaidRenderer 