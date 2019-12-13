import React, {createRef, useState} from "react";
import {Button, Checkbox, Chip, FormControlLabel, Grid, makeStyles, TextField} from "@material-ui/core";
import ReactMarkdown from "react-markdown";
import CodeBlock from './CodeBlock';
import RefreshIcon from '@material-ui/icons/Refresh';
import DescriptionIcon from '@material-ui/icons/Description';
import ImageIcon from '@material-ui/icons/Image';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import BackspaceIcon from '@material-ui/icons/Backspace';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'axios';
import api from '../../contants/api';

const useStyles = makeStyles(theme => ({
  hr: {
    margin: theme.spacing(0, 0.5),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  miniImages: {
    position: "fixed",
    bottom: "10px",
    right: "10px",
    '& img': {
      maxHeight: "60px"
    },
  },
  miniIcon: {
    position: 'absolute',
    right: "5px"
  }
}));


export default function Write(props) {
  const classes = useStyles();
  const {
    rows,
    post,
    images,
    tempTags,
    deleteTag,
    addImage,
    changeTitle,
    changeTempTag,
    changePublish,
    addTag,
    changeRow,
    addContents,
    deleteImage,
    changeContents
  } = props;
  const [imageIsHidden, setIsHidden] = useState(false);
  const [isPostShrink, setIsPostShrink] = useState(true);
  const textarea = createRef();
  return (
    <Grid container justify="center" direction="column" className={classes.root} spacing={3}>
      <Grid item>
        <TextField
          onChange={(e) => changeTitle(e.target.value)}
          value={post.title}
          fullWidth={true}
          label="标题"
          variant="outlined"/>
      </Grid>
      <Grid item container alignItems="center" spacing={2}>
        <Grid item>
          <TextField
            onKeyDown={handleKeyDown}
            onChange={(e) => changeTempTag(e.target.value)}
            value={tempTags}
            label="标签"
            variant="outlined"/>
        </Grid>
        <Grid item>
          {
            post.tags.map(item => (
              <Chip
                key={item}
                size="medium"
                label={item}
                color="primary"
                onDelete={() => deleteTag(item)}/>
            ))
          }
        </Grid>
      </Grid>
      <Grid container alignItems="center">
        <Grid onClick={handleOnReset} title="重置">
          <Button><RefreshIcon/></Button>
        </Grid>
        <Grid title="添加markdown文件">
          <Button component="label">
            <DescriptionIcon/>
            <input
              accept=".md"
              onChange={handleFileUpload}
              type="file"
              multiple
              style={{display: "none"}}
            />
          </Button>
        </Grid>
        <Grid title="上传图片">
          <Button component="label">
            <ImageIcon/>
            <input
              accept="image/*"
              onChange={handleImageUpload}
              type="file"
              multiple
              style={{display: "none"}}
            />
          </Button>
        </Grid>
        <Grid title={isPostShrink ? "展开" : "收缩"} onClick={handleShrink}>
          <Button component={"label"}>
            {
              isPostShrink ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>
            }
          </Button>
        </Grid>
        <Grid title="保存">
          <Button component="button"><CloudUploadIcon/></Button>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={post.publish}
                onChange={changePublish}/>}
            label="发布"
            labelPlacement="end"
          />
        </Grid>
      </Grid>
      <Grid item>
        <form
          onSubmit={handleOnSubmit}
          className={classes.container}
          noValidate
          autoComplete="off">
          <TextField
            name="contents"
            value={post.contents}
            inputRef={textarea}
            multiline
            rows={rows}
            fullWidth={true}
            placeholder="支持Markdown"
            className={classes.textField}
            margin="normal"
            onChange={handleContentsChange}
          />
        </form>
      </Grid>
      <Grid item>
        <ReactMarkdown
          escapeHtml={false}
          source={post.contents}
          renderers={{code: CodeBlock}}/>
      </Grid>
      <Grid implementation="css">
        <ImageList {...{iconStyle: classes.miniIcon, containerStyle: classes.miniImages}}/>
      </Grid>
    </Grid>
  );

  function ImageList(props) {
    const {iconStyle, containerStyle} = props;
    return (
      <Grid className={containerStyle}>
        {
          imageIsHidden ? <VisibilityIcon onClick={() => setIsHidden(false)}/> :
            <>
              <VisibilityOffIcon onClick={() => setIsHidden(true)}/>
              {
                images.map(image => (
                  <div key={image.name}>
                    <p>name:&nbsp;{image.name}</p>
                    <p>url:&nbsp;{image.url}</p>
                    <img src={image.url} alt=""/>
                    <BackspaceIcon
                      className={iconStyle}
                      onClick={() => {
                        handleImageDelete(image);
                      }}/>
                  </div>
                ))
              }
            </>
        }
      </Grid>
    );
  }


  function handleOnSubmit() {
    axios.post(api.posts, post).then(res => {
      console.log(res.data);
    });
  }


  function handleShrink() {
    if (isPostShrink) {
      changeRow(textarea.current.scrollHeight / 19);
    } else {
      changeRow(1);
      textarea.current.rows = 1;
    }
    setIsPostShrink(!isPostShrink);
  }

  function handleImageDelete(image) {
    deleteImage(image);
    window.URL.revokeObjectURL(image.url);
  }

  function handleFileUpload(e) {
    const file = e.target.files;
    if (file.length > 1) {
      alert("仅支持单个上传");
    }
    const reader = new FileReader();
    reader.readAsText(file[0]);
    reader.onload = function (res) {
      addContents(res.target.result);
    };
  }

  function handleImageUpload(e) {
    const file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      const url = window.URL.createObjectURL(file[i]);
      addImage({name: file[i].name, url});
      addContents(`![${file[i].name}](${url})`);
    }
    let postForm = new FormData();
    console.log(post.timeStamp);
    postForm.append('timeStamp', post.timeStamp);

    async function getImage() {
      for (const image of images) {
        const blob = await fetch(image.url).then(r => r.blob());
        postForm.append('images', blob, image.name);
      }
    }

    getImage().then(() => {
      axios.post(api.images, postForm).then(res => {
        console.log(res)
      });
    });
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      addTag(e.target.value);
    }
  }

  function handleOnReset() {
    changeContents('');
    changeRow(1);
  }

  function handleContentsChange(e) {
    const ele = e.target;
    const rows = ele.scrollHeight / 19;
    if (rows !== ele.rows) {
      changeRow(rows);
    }
    changeContents(e.target.value);
  }
}
