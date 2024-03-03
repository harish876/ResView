import React, { useState } from "react";
import { CARD_BG_GRAD } from "../../../../Constants";
import classNames from "classnames";

const ImageElement = ({ link, title, image, alt }) => {
    return (
        <div className={`w-full h-300p flex items-center justify-center rounded-lg  border-3p border-gray-170 dark:border-blue-600 `}>
          <a
            href={link}
            target={"_blank"}
            rel='noopener noreferrer nofollow'
            aria-label={title}
          >
              <img
                src={image}
                alt={alt}
                className="rounded-lg w-full h-full block object-contain"
              />
          </a>
        </div>
    );
};

const DescriptionElement = ({ link, title, description }) => {
    return (
        <div className='p-2 rounded-lg flex flex-col items-center justify-center'>
            <a
              href={link}
              target={"_blank"}
              rel='noopener noreferrer nofollow'
              aria-label={title}
            >
              <CardSkeleton value={title} classes={'text-26p font-bold p-2'} />
            </a>
            <CardSkeleton value={description} classes={'text-18p p-4 font-normal text-left'} />
        </div>
    );
};


const Card = ({
  image,
  alt,
  title,
  link,
  description,
  inverted
}) => {

  const [isLoading, setIsLoading] = useState(true);

  const onLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className='mt-2 mb-2 mx-0 w-750p'>
      <div className={
        classNames('grid gap-x-4',
        {'grid-cols-1-1.5fr': inverted},
        {'grid-cols-1.5-1fr': !inverted})
      }>
        {inverted ? <DescriptionElement title={title} description={description} link={link} /> : <ImageElement link={link} image={image} alt={alt} title={title}  />}
        {inverted ? <ImageElement link={link} image={image} alt={alt} title={title} /> :  <DescriptionElement title={title} description={description} link={link} />}
      </div>
    </div>
  );
};

const CardSkeleton = ({ value, classes }) => {
    return (
        <div className={`text-gray-600 dark:text-gray-300 flex items-center justify-center mb-4 rounded-lg px-3p py-3p ${CARD_BG_GRAD}`}>
            <div className={`dark:bg-blue-500 bg-none w-full h-full rounded-lg flex items-center justify-center ${classes}`}>
                {value}
            </div>
        </div>
    );
};

export default Card;