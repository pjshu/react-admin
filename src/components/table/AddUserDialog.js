import React, {useState} from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

const initialUser = {
  title: '',
  create_time: '2019/10/20',
  update_time: '2019/10/20',
  tags: [],
  comments: 0,
};

const AddUserDialog = props => {
  const [user, setUser] = useState(initialUser);
  const {addUserHandler} = props;
  const [open, setOpen] = React.useState(false);

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = name => event => {
    setSwitchState({...switchState, [name]: event.target.checked});
  };

  const resetSwitch = () => {
    setSwitchState({addMultiple: false});
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetSwitch();
  };

  const handleAdd = event => {
    axios.post('http://127.0.0.1:5000/posts', user).then(res => {
      const {data: {status, id}} = res;
      if (status === 'success') {
        const post = {...user, id: id};
        setUser(post);
        addUserHandler(post);
        setUser(initialUser);
      }
    });

    switchState.addMultiple ? setOpen(true) : setOpen(false);
  };

  const handleChange = name => ({target: {value}}) => {
    setUser({...user, [name]: value});
  };

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>添加文章</DialogTitle>
        <DialogContent>
          {/*<DialogContentText>Demo add item to react table.</DialogContentText>*/}
          <TextField
            autoFocus
            margin="dense"
            label="标题"
            type="title"
            fullWidth
            value={user.title}
            onChange={handleChange('title')}
          />
          <TextField
            margin="dense"
            label="创建日期"
            type="text"
            fullWidth
            value={user.create_time}
            onChange={handleChange('create_time')}
          />
          <TextField
            margin="dense"
            label="修改日期"
            disabled={true}
            type="text"
            fullWidth
            value={user.update_time}
            onChange={handleChange('update_time')}
          />
          <TextField
            margin="dense"
            label="标签"
            type="text"
            fullWidth
            value={user.tags}
            onChange={handleChange('tags')}
          />
          <TextField
            disabled={true}
            margin="dense"
            label="评论"
            type="text"
            fullWidth
            value={user.comments}
            onChange={handleChange('comments')}
          />
        </DialogContent>
        <DialogActions>
          <Tooltip title="添加多条">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange('addMultiple')}
              value="addMultiple"
              inputProps={{'aria-label': 'secondary checkbox'}}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            取消
          </Button>
          <Button onClick={handleAdd} color="primary">
            添加
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};


export default AddUserDialog;
