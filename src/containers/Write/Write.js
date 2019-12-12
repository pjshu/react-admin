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
import CollectionsIcon from '@material-ui/icons/Collections';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'axios';

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
    row,
    post,
    tempTags,
    deleteTag,
    changeTitle,
    changeTempTag,
    changePublish,
    addTag,
    changeRow,
    handleSubmit,
    changeContents
  } = props;
  const [images, setImages] = useState([]);
  const [imageIsHidden, setIsHidden] = useState(false);
  const [isPost, setIsPost] = useState(true);
  const [isPostShrink, setIsPostShrink] = useState(true);
  const textarea = createRef();
  return (
    <Grid container justify="center" direction="column" className={classes.root} spacing={3}>
      <Grid item>
        <TextField
          onChange={(e) => changeTitle(e.target.value)}
          value={post.title}
          fullWidth={true}
          form="postForm"
          id="outlined-basic"
          label="标题"
          variant="outlined"/>
      </Grid>
      <Grid item container alignItems="center" spacing={2}>
        <Grid item>
          <TextField
            onKeyDown={handleKeyDown}
            onChange={(e) => changeTempTag(e.target.value)}
            value={tempTags}
            form="postForm"
            id="outlined-basic"
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
        <Grid title={isPost ? "查看已上传图片" : "查看文章"} onClick={() => setIsPost(!isPost)}>
          <Button component="label">
            {
              isPost ? <CollectionsIcon/> : <AssignmentIcon/>
            }
          </Button>
        </Grid>
        <Grid title={isPostShrink ? "展开" : "收缩"} onClick={() => handleShrink()}>
          <Button component={"label"}>
            {
              isPostShrink ? <ArrowDropUpIcon/> : <ArrowDropDownIcon/>
            }
          </Button>
        </Grid>
        <Grid title="保存">
          <Button component="button" type="submit" form="postForm"><CloudUploadIcon/></Button>
        </Grid>
        <Grid item>
          <FormControlLabel
            form="postForm"
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
          id="postForm"
          className={classes.container}
          noValidate
          autoComplete="off">
          <TextField
            name="contents"
            value={post.contents}
            inputRef={textarea}
            multiline
            rows={row}
            fullWidth={true}
            placeholder="支持Markdown"
            className={classes.textField}
            margin="normal"
            onChange={handleRowChange}
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


  function handleOnSubmit(e) {
    const api = "http://127.0.0.1:5000/api/admin/posts/";
    e.preventDefault();
    let postForm = new FormData();
    Object.keys(form).forEach(key => {
      postForm.append(key, form[key]);
    });
    postForm.delete('tempTags');

    axios.post(api, postForm).then(res => {
      console.log(res.data);
    });
  }


  function handleShrink() {
    if (isPostShrink) {
      textarea.current.rows = textarea.current.scrollHeight / 19;
    } else {
      textarea.current.rows = 1;
    }
    setIsPostShrink(!isPostShrink);
  }

  function handleImageDelete(image) {
    const {url, name} = image;
    const tempImages = images.slice();
    tempImages.splice(tempImages.findIndex(item => item.name === name), 1);
    setImages([...tempImages]);
    window.URL.revokeObjectURL(url);
  }

  function handleFileUpload(e) {
    const file = e.target.files;
    if (file.length > 1) {
      alert("上传多个markdown文件,内容会叠加在一起");
    }
    for (let i = 0; i < file.length; i++) {
      const reader = new FileReader();
      reader.readAsText(file[i]);
      reader.onload = function (event) {
        setForm(form => ({...form, contents: form.contents + event.target.result}));
      };
    }
  }

  function handleImageUpload(e) {
    const file = e.target.files;
    const api = "http://127.0.0.1:5000/api/admin/posts/";
    for (let i = 0; i < file.length; i++) {
      const url = window.URL.createObjectURL(file[i]);
      setImages((images) => [...images, {name: file[i].name, url}]);
      setForm(form => ({...form, contents: form.contents + `![${file[i].name}](${url})`}));
    }
    textarea.current.focus();
    let postForm = new FormData();

    async function getImage() {
      for (const image of images) {
        const blob = await fetch(image.url).then(r => r.blob());
        postForm.append('images', blob, image.name);
      }
    }

    getImage().then(() => {
      axios.post(api, postForm).then(res => {
        console.log(res.data);
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

  function handleRowChange(e) {
    const ele = e.target;
    if (ele.scrollHeight / 19 !== ele.rows) {
      ele.rows = ele.scrollHeight / 19;
    }
    changeRow(ele.value);
  }
}
