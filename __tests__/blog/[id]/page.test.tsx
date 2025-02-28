import { render, screen } from '@testing-library/react';
import BlogDetail, { generateStaticParams } from '../../../src/app/blog/[id]/page';
import fs from 'fs';
import path from 'path';
import { GrayMatterFile } from 'gray-matter';

// Define a type for the mock
type MockedMatter = {
  (file: string | Buffer, options?: any): GrayMatterFile<any>;
};

// Mock necessary modules
jest.mock('fs');
jest.mock('path');
jest.mock('gray-matter', () => {
  const mockMatter: MockedMatter = (file: string | Buffer, options?: any) => {
    const result: GrayMatterFile<any> = {
      data: { title: 'Test Article', date: '2025-03-01' },
      content: '# Test Content',
      excerpt: '',
      orig: Buffer.from(''),
      language: 'markdown',
      matter: '',
      stringify: (content: string | Buffer, data?: any) => {
        return `---
${data ? Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n') : ''}
---
${content}`;
      },
    };
    return result;
  };
  return mockMatter;
});

describe('BlogDetail Component', () => {
  const mockParams = { id: '1' };

  beforeEach(() => {
    // Reset mocks before each test
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (path.join as jest.Mock).mockImplementation((...args: string[]) => args.join('/'));
    (fs.readFileSync as jest.Mock).mockReturnValue('mock file contents');
  });

  it('renders blog article with title and content', async () => {
    render(await BlogDetail({ params: mockParams }));

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('2025-03-01')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders 404 message when article does not exist', async () => {
    (fs.existsSync as jest.Mock).mockReturnValue(false);

    render(await BlogDetail({ params: mockParams }));

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});

describe('generateStaticParams Function', () => {
  it('returns an array of paths based on markdown files in articles directory', async () => {
    const mockFilenames = ['article1.md', 'article2.md'];
    (fs.readdirSync as jest.Mock).mockReturnValue(mockFilenames);
    (path.join as jest.Mock).mockImplementation((...args: string[]) => args.join('/'));

    const paths = await generateStaticParams();

    expect(paths).toEqual([
      { id: 'article1' },
      { id: 'article2' },
    ]);
  });
});
