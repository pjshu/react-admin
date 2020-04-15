import React, {Suspense} from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
// import {areEqual} from "../helpers/misc";
import {unstable_createResource} from './react-cache-copy';


const ImageResource = unstable_createResource(
  src =>
    new Promise(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = resolve;
    })
);

const ImageComponent = ({src, alt}) => {
  ImageResource.read(src);
  return <img src={src} alt={alt}/>;
};

function LoadingImg({src, alt}) {
  return (
    <Suspense fallback={<Skeleton className={'skeleton'} animation="wave"/>}>
      <ImageComponent src={src} alt={alt}/>
    </Suspense>
  );
}

export default React.memo(LoadingImg);
