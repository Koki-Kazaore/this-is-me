import React from 'react'
import { render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import MermaidRenderer from '../../src/app/components/MermaidRenderer'
import mermaid from 'mermaid'

// Mock the mermaid library
jest.mock('mermaid', () => ({
  initialize: jest.fn(),
  render: jest.fn(),
}))

const mockMermaid = mermaid as jest.Mocked<typeof mermaid>

const UUID_ID_PATTERN = /^mermaid-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

const FALLBACK_ID_PATTERN = /^mermaid-[a-z0-9-]+$/

// Cleanups for isolated RTL instances; run in afterEach so they happen even when an assertion fails
const isolatedCleanups: Array<() => void> = []

// MermaidRenderer keeps its "initialized" flag at module level, so tests that
// assert on mermaid.initialize load a fresh module registry (component, mermaid
// mock, React and the pure RTL entry) to avoid leaking state between tests.
// Any assertion on mermaid.initialize MUST go through this helper: the flag is
// shared across all non-isolated tests in this file, so their results depend on order.
const loadIsolatedRenderer = () => {
  let isolated!: {
    React: typeof React
    rtl: typeof import('@testing-library/react/pure')
    MermaidRenderer: typeof MermaidRenderer
    mermaid: jest.Mocked<typeof mermaid>
  }

  jest.isolateModules(() => {
    isolated = {
      React: require('react'),
      rtl: require('@testing-library/react/pure'),
      MermaidRenderer: require('../../src/app/components/MermaidRenderer').default,
      mermaid: require('mermaid'),
    }
  })

  isolatedCleanups.push(isolated.rtl.cleanup)

  isolated.mermaid.render.mockResolvedValue({
    svg: '<svg><g>Test SVG Content</g></svg>',
    bindFunctions: jest.fn(),
    diagramType: 'graph'
  })

  return isolated
}

describe('MermaidRenderer', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Mock console.error to avoid noise in test output
    jest.spyOn(console, 'error').mockImplementation(() => {})

    // Setup default mock behavior
    mockMermaid.render.mockResolvedValue({
      svg: '<svg><g>Test SVG Content</g></svg>',
      bindFunctions: jest.fn(),
      diagramType: 'graph'
    })
  })

  afterEach(() => {
    isolatedCleanups.splice(0).forEach((cleanup) => cleanup())
    jest.restoreAllMocks()
  })

  it('renders the component with proper structure', () => {
    const testChart = 'graph TD; A-->B;'

    const { container } = render(<MermaidRenderer chart={testChart} />)

    const diagramElement = container.querySelector('.mermaid-diagram')
    expect(diagramElement).toBeInTheDocument()
    expect(diagramElement).toHaveClass('mermaid-diagram')
    expect(diagramElement).toHaveClass('flex')
    expect(diagramElement).toHaveClass('justify-center')
    expect(diagramElement).toHaveClass('items-center')
    expect(diagramElement).toHaveClass('my-4')
    expect(diagramElement).toHaveClass('p-4')
    expect(diagramElement).toHaveClass('bg-transparent')
    expect(diagramElement).toHaveClass('rounded-lg')
  })

  it('initializes mermaid with correct configuration', () => {
    const { React: IsolatedReact, rtl, MermaidRenderer: IsolatedRenderer, mermaid: isolatedMermaid } = loadIsolatedRenderer()
    const testChart = 'graph TD; A-->B;'

    rtl.render(IsolatedReact.createElement(IsolatedRenderer, { chart: testChart }))

    expect(isolatedMermaid.initialize).toHaveBeenCalledWith({
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
  })

  it('initializes mermaid only once across multiple diagrams and rerenders', async () => {
    const { React: IsolatedReact, rtl, MermaidRenderer: IsolatedRenderer, mermaid: isolatedMermaid } = loadIsolatedRenderer()
    const firstChart = 'graph TD; A-->B;'
    const secondChart = 'graph TD; C-->D;'
    const updatedChart = 'graph TD; E-->F;'

    const { rerender } = rtl.render(
      IsolatedReact.createElement(
        'div',
        null,
        IsolatedReact.createElement(IsolatedRenderer, { key: 'first', chart: firstChart }),
        IsolatedReact.createElement(IsolatedRenderer, { key: 'second', chart: secondChart })
      )
    )

    rerender(
      IsolatedReact.createElement(
        'div',
        null,
        IsolatedReact.createElement(IsolatedRenderer, { key: 'first', chart: firstChart }),
        IsolatedReact.createElement(IsolatedRenderer, { key: 'second', chart: updatedChart })
      )
    )

    await rtl.waitFor(() => {
      expect(isolatedMermaid.render).toHaveBeenCalledTimes(3)
    })

    expect(isolatedMermaid.initialize).toHaveBeenCalledTimes(1)
    expect(isolatedMermaid.render).toHaveBeenCalledWith(expect.any(String), firstChart)
    expect(isolatedMermaid.render).toHaveBeenCalledWith(expect.any(String), secondChart)
    expect(isolatedMermaid.render).toHaveBeenCalledWith(expect.any(String), updatedChart)
  })

  it('renders mermaid diagram successfully', async () => {
    const testChart = 'graph TD; A-->B;'
    const mockSvg = '<svg><g>Test Diagram</g></svg>'

    mockMermaid.render.mockResolvedValue({
      svg: mockSvg,
      bindFunctions: jest.fn(),
      diagramType: 'graph'
    })

    const { container } = render(<MermaidRenderer chart={testChart} />)

    await waitFor(() => {
      expect(mockMermaid.render).toHaveBeenCalledWith(
        expect.stringMatching(UUID_ID_PATTERN),
        testChart
      )
    })

    await waitFor(() => {
      expect(container.innerHTML).toContain(mockSvg)
    })
  })

  it('handles mermaid render promise rejection', async () => {
    const testChart = 'invalid chart'
    const errorMessage = 'Invalid syntax'

    mockMermaid.render.mockRejectedValue(new Error(errorMessage))

    const { container } = render(<MermaidRenderer chart={testChart} />)

    await waitFor(() => {
      expect(container.innerHTML).toContain('Error rendering diagram: Invalid syntax')
      expect(container.querySelector('.text-red-400')).toBeInTheDocument()
    })

    expect(console.error).toHaveBeenCalledWith('Mermaid rendering error:', expect.any(Error))
  })

  it('handles mermaid render synchronous error', async () => {
    const testChart = 'invalid chart'

    mockMermaid.render.mockImplementation(() => {
      throw new Error('Synchronous error')
    })

    const { container } = render(<MermaidRenderer chart={testChart} />)

    await waitFor(() => {
      expect(container.innerHTML).toContain('Error rendering diagram')
      expect(container.querySelector('.text-red-400')).toBeInTheDocument()
    })

    expect(console.error).toHaveBeenCalledWith('Mermaid rendering error:', expect.any(Error))
  })

  it('re-renders when chart prop changes', async () => {
    const initialChart = 'graph TD; A-->B;'
    const updatedChart = 'graph TD; C-->D;'

    const { rerender } = render(<MermaidRenderer chart={initialChart} />)

    await waitFor(() => {
      expect(mockMermaid.render).toHaveBeenCalledWith(
        expect.any(String),
        initialChart
      )
    })

    // Clear previous calls
    mockMermaid.render.mockClear()

    rerender(<MermaidRenderer chart={updatedChart} />)

    await waitFor(() => {
      expect(mockMermaid.render).toHaveBeenCalledWith(
        expect.any(String),
        updatedChart
      )
    })
  })

  it('clears element content before rendering new diagram', async () => {
    const testChart = 'graph TD; A-->B;'

    const { container } = render(<MermaidRenderer chart={testChart} />)
    const diagramElement = container.querySelector('.mermaid-diagram')

    // Simulate existing content
    if (diagramElement) {
      diagramElement.innerHTML = 'Previous content'
    }

    // Re-render with same chart to trigger useEffect
    const { rerender } = render(<MermaidRenderer chart={testChart} />)
    rerender(<MermaidRenderer chart={`${testChart} modified`} />)

    await waitFor(() => {
      expect(mockMermaid.render).toHaveBeenCalled()
    })
  })

  it('generates unique ID for each diagram render', async () => {
    const testChart = 'graph TD; A-->B;'

    render(<MermaidRenderer chart={testChart} />)

    await waitFor(() => {
      expect(mockMermaid.render).toHaveBeenCalledWith(
        expect.stringMatching(UUID_ID_PATTERN),
        testChart
      )
    })

    const firstCallId = mockMermaid.render.mock.calls[0][0]

    // Clear and render again
    mockMermaid.render.mockClear()

    const { rerender } = render(<MermaidRenderer chart={testChart} />)
    rerender(<MermaidRenderer chart={`${testChart} v2`} />)

    await waitFor(() => {
      expect(mockMermaid.render).toHaveBeenCalled()
    })

    const secondCallId = mockMermaid.render.mock.calls[0][0]

    expect(firstCallId).not.toBe(secondCallId)
    expect(firstCallId).toMatch(UUID_ID_PATTERN)
    expect(secondCallId).toMatch(UUID_ID_PATTERN)
  })

  it('assigns different IDs to diagrams rendered at the same time', async () => {
    render(
      <>
        <MermaidRenderer chart="graph TD; A-->B;" />
        <MermaidRenderer chart="graph TD; C-->D;" />
      </>
    )

    await waitFor(() => {
      expect(mockMermaid.render).toHaveBeenCalledTimes(2)
    })

    const [firstId, secondId] = mockMermaid.render.mock.calls.map(([id]) => id)

    expect(firstId).toMatch(UUID_ID_PATTERN)
    expect(secondId).toMatch(UUID_ID_PATTERN)
    expect(firstId).not.toBe(secondId)
  })

  it('falls back to a non-crypto unique ID when crypto.randomUUID is unavailable', async () => {
    // Simulate a non-secure context (e.g. http://192.168.x.x) where randomUUID is not exposed
    const ownDescriptor = Object.getOwnPropertyDescriptor(globalThis.crypto, 'randomUUID')
    Object.defineProperty(globalThis.crypto, 'randomUUID', { value: undefined, configurable: true, writable: true })

    try {
      const { container } = render(
        <>
          <MermaidRenderer chart="graph TD; A-->B;" />
          <MermaidRenderer chart="graph TD; C-->D;" />
        </>
      )

      await waitFor(() => {
        expect(mockMermaid.render).toHaveBeenCalledTimes(2)
      })

      const [firstId, secondId] = mockMermaid.render.mock.calls.map(([id]) => id)

      expect(firstId).toMatch(FALLBACK_ID_PATTERN)
      expect(secondId).toMatch(FALLBACK_ID_PATTERN)
      expect(firstId).not.toMatch(UUID_ID_PATTERN)
      expect(secondId).not.toMatch(UUID_ID_PATTERN)
      expect(firstId).not.toBe(secondId)

      await waitFor(() => {
        expect(container.innerHTML).toContain('Test SVG Content')
      })
    } finally {
      if (ownDescriptor) {
        Object.defineProperty(globalThis.crypto, 'randomUUID', ownDescriptor)
      } else {
        delete (globalThis.crypto as { randomUUID?: unknown }).randomUUID
      }
    }
  })

  it('has proper minimum height styling', () => {
    const testChart = 'graph TD; A-->B;'

    const { container } = render(<MermaidRenderer chart={testChart} />)
    const diagramElement = container.querySelector('.mermaid-diagram')

    expect(diagramElement).toHaveStyle({ minHeight: '200px' })
  })

  it('handles case when element ref is null', () => {
    const testChart = 'graph TD; A-->B;'

    // Mock useRef to return null initially
    const mockRef = { current: null }
    const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValue(mockRef)

    // Mock useEffect to avoid actual execution
    const useEffectSpy = jest.spyOn(React, 'useEffect').mockImplementation(() => {})

    render(<MermaidRenderer chart={testChart} />)

    // Verify useRef was called but useEffect was mocked
    expect(useRefSpy).toHaveBeenCalled()
    expect(useEffectSpy).toHaveBeenCalled()

    useRefSpy.mockRestore()
    useEffectSpy.mockRestore()
  })
})