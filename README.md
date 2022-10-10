
## Next.js 를 이용한 마크다운 블로그 만들기
- https://markdownblog-beta.vercel.app/

### Usage
- __/posts 폴더 안에 md 문서를 생성
- 해당 format의 meta data를 상단에 삽입

```markdown
---
title: 'Javascript'
metaTitle: 'Javascript core concept'
metaDesc: 'Javascript core concept used in coding interview'
image: images/javascript.png
date: '2022-10-10'
tags:
  - javascript
---
```
- 해당 파일명의 route가 생성 (example.md => post/example) 

### Description

- index.tsx 페이지 생성 전 getStaticProps 메소드 이용하여, metadata 관련 정보들 parsing 후 props로 주입

```javascript
export async function getStaticProps() {
  
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
```

- 각 post 페이지 라우팅을 위해 getStaticPaths 이용하여 동적 라우팅 생성 
```javascript
export async function getStaticPaths() {
  const files = fs.readdirSync('__posts');
  const paths = files.map((fileName) => ({
    params: {
      slug: fileName.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
```
- 해당하는 id의 md 문서 정보 html로 파싱 후 dangerouslySetInnerHTML을 이용해 직접 삽입
```javascript 
export async function getStaticProps({ params: { slug } }: any) {
  const fileName = fs.readFileSync(`__posts/${slug}.md`, 'utf-8');
  const { data: frontmatter, content } = matter(fileName);
  return {
    props: {
      frontmatter,
      content,
    },
  };
}

export default function PostPage({ frontmatter, content }: any) {
  return (
    <div className='prose mx-auto'>
      <h1>{frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: md().render(content) }} />
    </div>
  );
}
```
