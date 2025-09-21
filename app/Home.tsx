import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import Github from '@/components/Github'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { themes, MAX_DISPLAY } from './constants'
import Skills from '@/components/skills'

export default function Home({ posts }) {
  const randomTheme = themes[Math.floor(Math.random() * themes.length)]

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* Hero Section */}
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-2xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            I'm{' '}
            <span
              style={{
                backgroundImage: `linear-gradient(to right, #${randomTheme.color}, #${randomTheme.color}cc)`,
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
              className="mt-10 text-center text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl"
            >
              Joseph Asiagi
            </span>{' '}
            👋
          </h1>

          <div className="dark:text-grey text-gray mb-8 mt-4 text-base">
            <h2 className="text-xl leading-8 tracking-tight">
              University student and learning enthusiast, passionate about backend systems,
              exploitation, and exploring how things work under the hood.
            </h2>
          </div>

          {/* Skills Section */}
          <Skills />

          {/* Description */}
          <h3 className="text-md leading-7 text-gray dark:text-gray mt-6">
            I write about my journey learning exploitation, backend development, cryptography, and
            other tech experiments. This is a space where I share discoveries, challenges, and
            thoughts while exploring deep backend systems and hacker-friendly tools.
          </h3>

          {/* GitHub Component */}
          <Github color={randomTheme.color} />
        </div>

        {/* Blog Posts */}
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((post) => {
            const { slug, date, title, summary, images, tags } = post
            return (
              <li key={slug} className="py-6">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                        {images && images[0] && (
                          <div className="py-2 pr-3">
                            <Image
                              alt={title}
                              src={images[0]}
                              className="object-cover object-center"
                              width={215}
                              height={150}
                            />
                          </div>
                        )}
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>

      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
