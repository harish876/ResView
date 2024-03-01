// Download the Icons from Font Awesome and plug the values here. 
// This will help in reducing the bundle size and only load the icons which are necessary and not have to downloaded the bloated fontAwesome library 

import { linearGraphIcon } from "../../Resources/Icons";

export const Icon = ({ height, fill, path, viewBox }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox={viewBox ?? "0 0 512 512"}
    fill={fill ?? "#8f9299"}
    height={height ?? "1.8em"}
  >
    {/* Default path is of a linear graph in gray color */}
    <path d={path ?? linearGraphIcon} />
  </svg>
);