import React, {useCallback} from 'react';
import {Container, Grid} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import useStyles from './login.style';
import {Link} from 'react-router-dom';
import router from '../../contants/router';
import {
  login,
  selectLogin,
  changeFormError as _changeFormError,
  clearFormError as _clearFormError
} from '../../redux/userSlice';
import {useDispatch, useSelector} from "react-redux";
import {Field, SubmitBtn, CommonBtn} from "../../components/Form";
import {validateLogin} from '../../helpers/validate';

const clearFormError = (props) => _clearFormError({...props, form: 'recoveryPassword'});
const changeFormError = (props) => _changeFormError({...props, form: 'recoveryPassword'});


function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {form} = useSelector(selectLogin);

  const handleOnSubmit = useCallback(() => {
    validateLogin.validate({
      ...form
    }).then((res) => {
      dispatch(login(res));
      dispatch(clearFormError());
    }).catch(({path: name, errors}) => {
      dispatch(changeFormError({name, value: errors[0]}));
    });
  }, [dispatch, form]);

  return (
    <div className={classes.container}>
      <div className={classes.paper}>
        <div className={classes.fullWidth}>
          <div>
            {
              [
                {name: "username", label: "用户名"},
                {name: "password", label: "密码", type: "password"}
              ].map(item => (
                <div key={item.name} className={classes.spacing}>
                  <Field formName={'login'} {...item}/>
                </div>
              ))
            }
          </div>
        </div>
        <div className={classes.fullWidth}>
          <div>
            <div>
              <SubmitBtn
                variant="outlined"
                fullWidth={true}
                handleOnSubmit={handleOnSubmit}
              >
                登陆
              </SubmitBtn>
            </div>
            <div>
              <CommonBtn
                color="primary"
                fullWidth={true}
                component={Link}
                to={router.RECOVER_PASSWORD}>
                忘记密码
              </CommonBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Login;
