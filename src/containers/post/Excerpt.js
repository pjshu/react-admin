import React, {useCallback, useMemo, useState} from 'react';
import useStyles from './Excerpt.style';
import {Button, Switch, FormControlLabel} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import {ModalEditor} from "../../components/editor/EditorArea";
import FORM from "../../contants/form.json";
import {Field} from "../../components/Form";
import {createFieldSelector} from "../../redux/formSlice";
import {useSelector} from "react-redux";

function ExcerptField(props) {
  const {setModalOpen} = props;
  const classes = useStyles();

  const fieldClasses = useMemo(() => ({
    root: classes.textField,
  }), [classes.textField]);

  const handleOnClose = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);

  return (
    <div
      className={classes.modalRoot}>
      <div
        onClick={handleOnClose}
        className={classes.closeIcon}
      >
        <CloseIcon/>
      </div>
      <div className={classes.fieldWrapper}>
        <div>
          <Field
            name={'excerpt'}
            classes={fieldClasses}
            formName={FORM.post}
            id="outlined-multiline-static"
            label="摘录"
            multiline
            rows={7}
            variant="outlined"
          />
        </div>
      </div>
    </div>
  );
}

function Excerpt() {
  const classes = useStyles();
  const isRichText = useSelector(createFieldSelector([FORM.post, 'isRichText']));
  const [modalOpen, setModalOpen] = useState(false);
  const [excerpt, setExcerpt] = useState('');

  const handleOnOpen = useCallback(() => {
    setModalOpen(true);
  }, []);

  const getValue = useCallback((e) => e.target.checked, []);
  return (
    <div>
      <div className={classes.switchWrapper}>
        <FormControlLabel
          control={
            <Field
              formName={FORM.post}
              name={'isRichText'}
              as={Switch}
              getValue={getValue}
              color="primary"
            />
          }
          label="摘录使用富文本"
        />
      </div>
      <div className={classes.buttonWrapper}>
        <Button
          fullWidth={true}
          onClick={handleOnOpen}
          variant="contained"
          color="primary">
          修改摘录
        </Button>
      </div>
      {
        modalOpen && (
          isRichText ?
            <ModalEditor setModalOpen={setModalOpen}/> :
            <ExcerptField
              excerpt={excerpt}
              setExcerpt={setExcerpt}
              setModalOpen={setModalOpen}
            />
        )
      }
    </div>
  );
}

export default Excerpt;
