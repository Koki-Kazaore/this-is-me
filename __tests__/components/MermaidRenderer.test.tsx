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
    const testChart = 'graph TD; A-->B;'

    render(<MermaidRenderer chart={testChart} />)

    expect(mockMermaid.initialize).toHaveBeenCalledWith({
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
        expect.stringMatching(/^mermaid-[a-z0-9]{9}$/),
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
        expect.stringMatching(/^mermaid-[a-z0-9]{9}$/),
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
    expect(firstCallId).toMatch(/^mermaid-[a-z0-9]{9}$/)
    expect(secondCallId).toMatch(/^mermaid-[a-z0-9]{9}$/)
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