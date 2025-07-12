'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

interface MermaidRendererProps {
  chart: string
}

const MermaidRenderer: React.FC<MermaidRendererProps> = ({ chart }) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (elementRef.current) {
      // Initialize mermaid with configuration
      mermaid.initialize({
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
      })

      // Generate unique ID for each diagram
      const graphId = `mermaid-${Math.random().toString(36).slice(2, 11)}`

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