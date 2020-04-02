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
import {Field, SubmitBtn} from "../../components/Form";
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
    <Container maxWidth={false} className={classes.container}>
      <Grid container justify="center" alignItems={"center"} className={classes.container}>

        <Grid
          className={classes.paper}
          component={Paper}
          direction="column"
          container
          alignItems="center"
          justify="center"
          spacing={4}
        >
          <Grid item className={classes.fullWidth}>
            <Grid container direction="column" spacing={2}>
              {
                [
                  {name: "username", label: "用户名"},
                  {name: "password", label: "密码", type: "password"}
                ].map(item => (
                  <Grid item key={item.name}>
                    <Field formName={'login'} {...item}/>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
          <Grid item className={classes.fullWidth}>
            <Grid container direction={'column'}>
              <Grid item>
                <SubmitBtn
                  variant="outlined"
                  fullWidth={true}
                  handleOnSubmit={handleOnSubmit}
                >
                  登陆
                </SubmitBtn>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  fullWidth={true}
                  component={Link}
                  to={router.RECOVER_PASSWORD}
                >
                  忘记密码
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );

}

export default Login;
