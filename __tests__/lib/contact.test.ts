import { sendContactMessage, type ContactMessage } from '@/lib/contact'

describe('sendContactMessage', () => {
  const message: ContactMessage = {
    email: 'hoge@example.com',
    subject: 'Just saying hi',
    message: 'Hello there',
  }

  beforeEach(() => {
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns success when the response is ok', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({ ok: true })

    const result = await sendContactMessage(message)

    expect(result).toEqual({ success: true })
    expect(global.fetch).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
  })

  it('returns failure with a non-empty error string when the response is not ok', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 })

    const result = await sendContactMessage(message)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(typeof result.error).toBe('string')
      expect(result.error.length).toBeGreaterThan(0)
    }
  })

  it('returns failure with a string error when fetch rejects', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValue(new Error('network failed'))

    const result = await sendContactMessage(message)

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(typeof result.error).toBe('string')
      expect(result.error).toBe('network failed')
    }
  })
})
