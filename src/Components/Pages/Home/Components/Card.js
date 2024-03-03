import React, { useEffect, useState } from "react";
import { CARD_BG_GRAD } from "../../../../Constants";


const Card = ({
  image,
  alt,
  title,
  link,
  subTitle,
  description,
  tech,
}) => {

  const [isLoading, setIsLoading] = useState(true);
  const [isBigPicOpen, setIsBigPicOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [borderColorNow, setBorderColorNow] = useState("");

  const [isHovering, setIsHovering] = useState(false);

//   useEffect(() => {
//     switch (true) {
//       case title === "aunsh.com":
//         setBorderColorNow("#0091ff");
//         break;

//       case title === "Fun w/ Reddit":
//         setBorderColorNow("#de793e");
//         break;

//       case title === "gotuu.in":
//         setBorderColorNow("#3ede69");
//         break;

//       default:
//         return null;
//     }
//   }, []);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };


  const onLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className='card-container'>
      <div className='grid'>
        <div className={`w-full h-300p rounded-lg p-2 ${CARD_BG_GRAD} `}>
          <a
            href={link}
            target={"_blank"}
            rel='noopener noreferrer nofollow'
            aria-label={title}
          >
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={image}
                alt={alt}
                className="rounded-lg w-full h-full block object-contain"
                style={
                  isHovering
                    ? {
                        boxShadow: `0px 0px 20px 0px ${borderColorNow}`,
                        transition: ".1s ease-in-out",
                      }
                    : {}
                }
              />
            </div>
          </a>
        </div>
        <div className='details-container'>
          <div
            className='title app'
            style={{
              alignItems: "flex-end",
            }}
          >
            <a
              href={link}
              target={"_blank"}
              rel='noopener noreferrer nofollow'
              aria-label={title}
            >
              <div className='name'>{title}</div>
            </a>
            <div className='sub-title'>{subTitle}</div>
          </div>
          <div className='description flex_left'>{description}</div>
          <div className='tech-stack flex_right'>
            {tech.length > 0 &&
              tech.map((element, index) => (
                <div className='tech' key={index}>
                  {element}
                </div>
              ))}
          </div>
          <div className='icons flex_right'>
            <div className='expand-button flex_middle'>
                <div style={{ marginRight: "0.4em" }}>Expand Project</div>
                Icon
              </div>
            <div className='icon' style={{ marginRight: "0" }}>
                <a
                  href={link}
                  target={"_blank"}
                  rel='noopener noreferrer nofollow'
                  aria-label={title}
                >
                  Icon
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;