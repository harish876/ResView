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
    <div className='mt-2 mb-2 mx-0 w-750p'>
      <div className='grid grid-cols-1.5-1fr gap-x-4'>
        <div className={`w-full h-300p rounded-lg p-2 ${CARD_BG_GRAD} `} style={{ border: '1px solid red' }}>
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
        <div className='' style={{ border: '1px solid blue' }}>
          <div
            className=''
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
              <div className=''>{title}</div>
            </a>
            <div className=''>{subTitle}</div>
          </div>
          <div className=''>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;