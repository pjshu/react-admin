import React from 'react';
import useStyles from './login.style';
import {Link} from 'react-router-dom';
import router from '../../contants/router';
import {Field, SubmitBtn} from "../../components/Form";
import {FORM} from "../../redux/formSlice";
import {Button} from "@material-ui/core";

function Login() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <form className={classes.paper}>
        <div className={classes.fullWidth}>
          <div>
            {
              [
                {name: "username", label: "用户名", variant: "outlined"},
                {name: "password", label: "密码", type: "password", variant: "outlined"}
              ].map(item => (
                <div key={item.name} className={classes.spacing}>
                  <Field formName={FORM.login} {...item}/>
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
                formName={FORM.login}
              >
                登陆
              </SubmitBtn>
            </div>
            <div>
              <Button
                color="primary"
                fullWidth={true}
                component={Link}
                to={router.RECOVER_PASSWORD}>
                忘记密码
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}


export default React.memo(Login);
