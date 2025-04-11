import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import ProjectList from '@/layouts/ProjectList'
import { getAllFilesFrontMatter } from '@/lib/mdx'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination } }
}

export default function Projects({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            My open source side projects.
          </p>
        </div>
        <div className="container py-12">
          <ProjectList
            posts={posts}
            initialDisplayPosts={initialDisplayPosts}
            pagination={pagination}
            title="All Posts"
          />
        </div>
      </div>
    </>
  )
}
