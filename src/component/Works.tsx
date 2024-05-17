import React, { useState, useEffect } from 'react';
import parse from 'html-react-parser';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';
// Define interfaces for the data structure
interface WorkData {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  featured_media: number;
}

interface MediaData {
  id: number;
  source_url: string;
  alt_text: string;
}

interface ParsedWorkData {
  title: string;
  id: number;
  contentData: ContentData[];
  featuredImage?: MediaData;
}

interface ContentData {
  type: string;
  content: any;
}

// Custom hook to fetch works data
const useFetchWorks = (restBase: string, endpoint: string) => {
  const [data, setData] = useState<ParsedWorkData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`${restBase}${endpoint}`)
      .then(response => response.json())
      .then((data: WorkData[]) => {
        const fetchMediaPromises = data.map(work =>
          work.featured_media
            ? fetch(`${restBase}media/${work.featured_media}`).then(response => response.json())
            : Promise.resolve(null)
        );

        Promise.all(fetchMediaPromises).then(mediaDataArray => {
          const parsedData: ParsedWorkData[] = data.map((workData, index) => {
            const title = workData.title.rendered;
            const { id } = workData;

            const contentData: ContentData[] = [];

            const parsedContent = parse(workData.content.rendered);
            if (Array.isArray(parsedContent)) {
              parsedContent.forEach((el: any) => {
                if (typeof el === 'object' && el !== null) {
                  const { type } = el;
                  const content = el.props.children;
                  contentData.push({ type, content });
                }
              });
            } else {
              contentData.push({ type: 'div', content: parsedContent });
            }

            const featuredImage = mediaDataArray[index];

            return { title, id, contentData, featuredImage };
          });

          setData(parsedData);
          setLoading(false);
        });
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [restBase, endpoint]);

  return { data, loading, error };
};

// Main Works component
const Works = () => {
  const restBase = 'https://riteshmaharjan.com/webtech/wp-json/wp/v2/';
  const { data: worksData, loading, error } = useFetchWorks(restBase, 'webtech-work');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-width">
      <h1 className="my-6 text-4xl text- w-full">Works</h1>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper" slidesPerView={3} loop={true}>
        <section className="grid grid-cols-1 sm:grid-cols-2">
          {worksData.map((work) => (
            <SwiperSlide key={work.id}>
              <article
                className="flex flex-col gap-8 p-4 hover:scale-105 transform transition-transform duration-300"
              >
                <h2 className="text-2xl">{work.title}</h2>
                {work.featuredImage && (
                  <img
                    src={work.featuredImage.source_url}
                    alt={work.featuredImage.alt_text}
                    className="w-full h-auto"
                  />
                )}
                {work.contentData.map((content, index) => (
                  <div key={index}>
                    <h3>{content.type}</h3>
                    <div>{content.content}</div>
                  </div>
                ))}
              </article>
            </SwiperSlide>
          ))}
        </section>
      </Swiper>
    </div>
  );
};

export default Works;
