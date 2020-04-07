import React from 'react';
import useStyles from './login.style';
import {Link} from 'react-router-dom';
import router from '../../contants/router';
import {Field, SubmitBtn, CommonBtn} from "../../components/Form";

function Login() {
  const classes = useStyles();

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
                formName={'login'}
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


export default React.memo(Login);
