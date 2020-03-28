import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';


function LoadingImg({src, alt}) {
  const [loading, setLoading] = React.useState(true);
  const handleOnLoading = () => {
    setLoading(false);
  };
  return (
    <>
      {
        loading ?
          <Skeleton className={'skeleton'} animation="wave"/>
          : null
      }
      <img src={src} alt={alt} onLoad={handleOnLoading}/>
    </>
  );
}

export default LoadingImg;
