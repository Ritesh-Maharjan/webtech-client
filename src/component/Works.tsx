import { useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Icon } from '@iconify/react';

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
  contentLink?: string; // Added contentLink to store link from content
}

interface ContentData {
  type: string;
  content: any;
}

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
              
              // Extract content link from HTML content
              const match = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g.exec(workData.content.rendered);
              const contentLink = match ? match[2] : undefined;
  
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
  
              return { title, id, contentData, featuredImage, contentLink };
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
  

const Works = () => {
  const restBase = 'https://riteshmaharjan.com/webtech/wp-json/wp/v2/';
  const { data: worksData, loading, error } = useFetchWorks(restBase, 'webtech-work');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div id="work" className="max-width">
      <h1 className="mb-16 mt-10 px-4 text-5xl font-bold w-full flex justify-between items-center font-arenq">
      <span className="text-5xl">03.</span>
        <div className="flex gap-5 items-center">
            <Icon icon="material-symbols:workspace-premium-outline" width="50" height="50" style={{ color: 'orange' }} />
            <span className="text-5xl ">Works.</span>
        </div>
        
      </h1>

      <Swiper
        pagination={{ clickable: true, el: '.swiper-pagination' }}
        modules={[Pagination]}
        className="mySwiper w-full"
        slidesPerView={1}
        speed={1300} 
        effect="slide" 
        autoplay={{ delay: 2000, disableOnInteraction: false }} //
        breakpoints={{
            640: {
              slidesPerView: 1, 
            },
            768: {
              slidesPerView: 2, 
            },
            1024: {
              slidesPerView: 3, 
            },
          }}
        loop={true}
      >
        <section className="grid grid-cols-1 sm:grid-cols-2">
          {worksData.map((work) => (
            <SwiperSlide key={work.id}>
              <article
                className="flex flex-col gap-10 p-4 hover:scale-105 transform transition-transform duration-300">
                {work.featuredImage && (
                  <a href={work.contentLink || '#'} target="_blank" rel="noopener noreferrer">
                  <img
                    src={work.featuredImage.source_url}
                    alt={work.featuredImage.alt_text}
                    className="w-full h-[700px] object-cover"
                  />
                  </a>
                )}
              </article>
            </SwiperSlide>
          ))}
        </section>
        <div className="swiper-pagination mt-4 text-orange-500 !important">
            <span className="swiper-pagination-bullet-active text-orange-500 !important"></span>
        </div>
      </Swiper>
    </div>
  );
};

export default Works;
