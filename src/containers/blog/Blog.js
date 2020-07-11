import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

import useStyles from './Blog.style';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {v4 as uuidV4} from 'uuid';
import getCurrentTime from '../../helpers/datetime';
import Pagination from '../../components/Pagination';

const deleteList = new Set([]);
const transitionProps = {unmountOnExit: true};


const ExtendItem = React.memo(function ({data, id, change_date, isNew, setData}) {
  const classes = useStyles();
  const [content, setContent] = useState(data);
  const [checked, setChecked] = useState(false);
  const query = useMemo(() => ({
    id,
    isNew,
    content: content,
    change_date,
  }), [change_date, content, id, isNew]);
// import('../helpers/api/security').
  const stopPropagation = useCallback((event) => {
    event.stopPropagation();
  }, []);

  const handleOnContentChange = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  const handleChecked = useCallback((e) => {
    if (e.target.checked) {
      deleteList.add(id);
    } else {
      deleteList.delete(id);
    }
    setChecked(e.target.checked);
  }, [id]);

  const handleOnReset = useCallback(() => {
    setContent(data);
  }, [data]);

  const updateField = useCallback((res) => {
    setData(data => {
      return data.map(item => {
        if (item.id === id) {
          item.id = res.data.id;
          item.content = content;
          item.isNew = false;
          return item;
        }
        return item;
      });
    });
  }, [content, id, setData]);

  const handleOnSubmit = useCallback(() => {
    import('../../helpers/api/security').then(module => {
      module.changeBlog(query).then(res => {
        if (res.status === 'success') {
          updateField(res);
        }
      });
    });
  }, [query, updateField]);

  const label = useMemo(() => {
    return `${content.substring(0, 10)}...`;
  }, [content]);


  return (
    <Accordion TransitionProps={transitionProps} className={classes.accordion}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <FormControlLabel
          aria-label="Acknowledge"
          onClick={stopPropagation}
          onFocus={stopPropagation}
          control={
            <Checkbox
              color={'primary'}
              checked={checked}
              onChange={handleChecked}
            />
          }
          label={label}
        />
      </AccordionSummary>

      <AccordionDetails>
        <Typography
          onChange={handleOnContentChange}
          component={'textarea'}
          color="textSecondary"
          value={content}
          className={classes.textField}
        />
      </AccordionDetails>
      <Divider/>
      <AccordionActions className={classes.accordionActions}>
        <div className={classes.change_date}>
          {change_date}
        </div>
        <Button size="small" onClick={handleOnReset}>
          重置
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={handleOnSubmit}
        >
          保存
        </Button>
      </AccordionActions>
    </Accordion>
  );
});

function Comment() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const [query, setQuery] = useState({
    page: 0
  });

  const handleAddNewBlog = useCallback(() => {
    setData(data => {
      const temp = [...data];
      temp.push({
        id: uuidV4(),
        content: '',
        change_date: getCurrentTime(),
        isNew: true
      });
      return temp;
    });
  }, []);

  const handleDeleteBlog = useCallback(() => {
    import('../../helpers/api/security').then(module => {
      module.deleteBlog({id_list: Array.from(deleteList)}).then(res => {
        if (res.status === 'success') {
          setData(d => {
            return d.filter(item => {
              if (deleteList.has(item.id)) {
                deleteList.delete(item.id);
                return false;
              }
              return true;
            });
          });
        }
      });
    });
  }, []);

  const handlePageChange = useCallback((page) => {
    setQuery({page});
  }, []);

  useEffect(() => {
    import('../../helpers/api/security').then(module => {
      module.getBlog(query).then(res => {
        if (res.data) {
          const {total, values} = res.data;
          setCount(total);
          setData(values);
        }
      });
    });
  }, [query]);

  return (
    <div className={classes.root}>
      <div className={classes.deleteWrapper}>
        <div
          title={'删除选中'}
          onClick={handleDeleteBlog}
        >
          <DeleteIcon color={'primary'}/>
        </div>
        <div
          title={"添加新日志"}
          onClick={handleAddNewBlog}>
          <AddCircleIcon color={'primary'}/>
        </div>
      </div>
      {
        data.map(item =>
          <ExtendItem
            key={item.id}
            data={item.content}
            id={item.id}
            change_date={item.change_date}
            isNew={item.isNew || false}
            setData={setData}
          />
        )
      }
      <Pagination
        page={query.page}
        rowsPerPage={10}
        count={count}
        onChangePage={handlePageChange}/>
    </div>
  );
}

export default React.memo(Comment);
