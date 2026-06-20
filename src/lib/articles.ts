import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type ArticleMeta = {
  id: number
  title: string
  abstract: string
  date: string
}

export type Article = ArticleMeta & {
  content: string
}

const articlesDirectory = path.join(process.cwd(), 'public', 'articles')

export function listArticles(): ArticleMeta[] {
  const filenames = fs.readdirSync(articlesDirectory)
  return filenames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const fullPath = path.join(articlesDirectory, name)
      const { data } = matter(fs.readFileSync(fullPath, 'utf8'))
      return {
        id: Number(name.replace(/\.md$/, '')),
        title: data.title as string,
        abstract: data.abstract as string,
        date: data.date as string,
      }
    })
    .sort((a, b) => b.id - a.id)
}

export function getArticle(id: number | string): Article | null {
  const fullPath = path.join(articlesDirectory, `${id}.md`)
  if (!fs.existsSync(fullPath)) {
    return null
  }
  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'))
  return {
    id: Number(id),
    title: data.title as string,
    abstract: data.abstract as string,
    date: data.date as string,
    content,
  }
}

export function listArticleIds(): string[] {
  return fs
    .readdirSync(articlesDirectory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
    .sort((a, b) => Number(b) - Number(a))
}
