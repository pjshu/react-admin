import {Button, Fade, Grid, Typography} from "@material-ui/core";
import {CopyToClipboard} from "react-copy-to-clipboard";
import React, {useCallback} from "react";
import {useDispatch} from "react-redux";
import {addSuccessMessage} from '../../redux/globalSlice';
import useStyles from './CardModalItem.style';

export const UseInfo = React.memo(({count, relationship}) => {
  return (
    <Fade in={true} timeout={500}>
      <Grid item>
        <Typography variant="body2" color="textSecondary" component="p">
          使用列表({count})
          {
            relationship && relationship.map(item => (
              <span key={item.get('name')}>{item.get('type')}:{item.get('name')};</span>
            ))
          }
        </Typography>
      </Grid>
    </Fade>
  );
});

export const Links = React.memo(function Links({url}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCopySuccess = useCallback(() => {
    dispatch(addSuccessMessage('复制成功'));
  }, [dispatch]);

  return (
    <Fade in={true} timeout={500}>
      <Grid item>
        <CopyToClipboard title={'点击复制'} text={url} onCopy={handleCopySuccess}>
          <Button>
            <Typography
              className={classes.typography}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              <span className={classes.label}>url:</span>
              <span>{url}</span>
            </Typography>
          </Button>
        </CopyToClipboard>
        <CopyToClipboard
          title={'点击复制'}
          text={`![image_name](${url})`} onCopy={handleCopySuccess}>
          <Button>
            <Typography
              className={classes.typography}
              variant="body2"
              color="textSecondary"
              component="p"
            >
             <span className={classes.label}>
               markdown:
             </span>
              <span>
               ![image_name]({url})
              </span>
            </Typography>
          </Button>
        </CopyToClipboard>
      </Grid>
    </Fade>
  );
});
