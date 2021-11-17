import Head from 'next/head';
import Posts from '../components/post/Posts';

const Home = () => {
  return (
    <>
      <Head>
        <title>Kenny Leung Blog</title>
        <meta
          name='Description'
          content={`
            Kenny Leung personal blog for sharing IT technologies
            This is a blog system wrote by Kenny Leung using next.js front-end with typescript and express.js back-end 
            The blog is opensource and repository stroe on gitlab:
            https://gitlab.com/kennycha87/blog-next.git
          `}
        />
      </Head>
      <Posts />
    </>
  );
};

export default Home;
