'use client'

import { useState } from 'react'
import Pagination from '@/components/Pagination'
import BlogItem from '@/components/BlogItem'

export default function ProjectList({ posts, title, initialDisplayPosts = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter((frontMatter) => {
    const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags.join(' ')
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  // If initialDisplayPosts exist, display it if no searchValue is specified
  const displayPosts =
    initialDisplayPosts.length > 0 && !searchValue ? initialDisplayPosts : filteredBlogPosts

  return (
    <>
      <div className="d-flex divide-y">
        {!filteredBlogPosts.length && 'No posts found.'}
        {displayPosts.map((frontMatter) => {
          const { slug, date, title, summary, tags, images, readingTime } = frontMatter
          const image = images[0]
          return (
            <BlogItem
              key={slug}
              slug={slug}
              date={date}
              title={title}
              summary={summary}
              tags={tags}
              image={image}
              readingTime={readingTime}
            />
          )
        })}
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
