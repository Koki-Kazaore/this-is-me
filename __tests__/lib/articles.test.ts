import fs from 'fs'
import path from 'path'
import { GrayMatterFile } from 'gray-matter'
import { listArticles, getArticle, listArticleIds } from '@/lib/articles'

type MockedMatter = {
  (file: string | Buffer, options?: any): GrayMatterFile<any>
}

jest.mock('fs')
jest.mock('path')
jest.mock('gray-matter', () => {
  const mockMatter: MockedMatter = (file: string | Buffer, options?: any) => {
    const result: GrayMatterFile<any> = {
      data: {
        title: 'Mock Title',
        abstract: 'Mock Abstract',
        date: '2025-03-01',
      },
      content: '# Mock Content',
      excerpt: '',
      orig: Buffer.from(''),
      language: 'markdown',
      matter: '',
      stringify: () => '',
    }
    return result
  }
  return mockMatter
})

describe('articles repository', () => {
  beforeEach(() => {
    ;(path.join as jest.Mock).mockImplementation((...args: string[]) =>
      args.join('/')
    )
    ;(fs.readFileSync as jest.Mock).mockReturnValue('mock file contents')
    ;(fs.existsSync as jest.Mock).mockReturnValue(true)
  })

  describe('listArticles', () => {
    it('filters *.md, parses frontmatter and sorts by id descending', () => {
      ;(fs.readdirSync as jest.Mock).mockReturnValue([
        '1.md',
        '2.md',
        'ignore.txt',
        '10.md',
      ])

      const articles = listArticles()

      expect(articles).toEqual([
        { id: 10, title: 'Mock Title', abstract: 'Mock Abstract', date: '2025-03-01' },
        { id: 2, title: 'Mock Title', abstract: 'Mock Abstract', date: '2025-03-01' },
        { id: 1, title: 'Mock Title', abstract: 'Mock Abstract', date: '2025-03-01' },
      ])
    })
  })

  describe('getArticle', () => {
    it('returns null when the file does not exist', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(false)

      expect(getArticle(1)).toBeNull()
    })

    it('returns the full article including content when present', () => {
      ;(fs.existsSync as jest.Mock).mockReturnValue(true)

      expect(getArticle('3')).toEqual({
        id: 3,
        title: 'Mock Title',
        abstract: 'Mock Abstract',
        date: '2025-03-01',
        content: '# Mock Content',
      })
    })
  })

  describe('listArticleIds', () => {
    it('returns ids from *.md filenames sorted descending', () => {
      ;(fs.readdirSync as jest.Mock).mockReturnValue([
        '1.md',
        '2.md',
        'ignore.txt',
        '10.md',
      ])

      expect(listArticleIds()).toEqual(['10', '2', '1'])
    })
  })
})
