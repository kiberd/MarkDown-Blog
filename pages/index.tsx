import type { NextPage } from 'next'
import type { GetStaticProps, InferGetStaticPropsType } from "next";

import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';


type Posts = {
  slug: string;
  frontmatter: {
    [key: string]: any;
  };
}


export async function getStaticProps() {
  // Get all our posts

  const files = fs.readdirSync('__posts');

  const posts: Posts[] = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`__posts/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

interface Props{
  posts: Posts[];
}

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 md:p-0">
      {posts.map(({ slug, frontmatter }) => (
        <div
          key={slug}
          className="border border-gray-200 m-2 rounded-xl shadow-lg overflow-hidden flex flex-col"
        >
          <Link href={`/post/${slug}`}>
            <a>
              <Image
                width={650}
                height={340}
                className="object-contain"
                alt={frontmatter.title}
                src={`/${frontmatter.socialImage}`}
              />
              <h1 className="p-4 text-lg font-bold">{frontmatter.title}</h1>
            </a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
