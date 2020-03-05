import React from 'react';
import TextFieldWithError from "../../components/TextFieldWithError";
import {Grid} from "@material-ui/core";

function RegisterEmail() {
  return (
    <Grid container direction={"column"}>
      <Grid
        style={{
          width: '45%',
          marginBottom: 20,
          marginTop: 20
        }}>
        <TextFieldWithError
          variant={"outlined"}
          name={'email.email'}
          label={'邮箱'}
        />
      </Grid>
    </Grid>
  );
}

export default RegisterEmail;

// <Grid container alignItems={"center"} style={{          // display: isSendCode ? '' : 'none',
//   display: isSendCode ? '' : 'none',
// }}>
//   <Grid style={{
//     // visibility: 'hidden',
//     width: '45%',
//     marginBottom: '40px'
//   }}>
//     <TextFieldWithError
//       variant={"outlined"}
//       name={'email.code'}
//       label={'验证码'}/>
//   </Grid>
//   <Grid style={{
//     marginBottom: 50,
//     marginLeft: 80
//   }}>
//     <Button
//       type="submit"
//       style={{
//         height: 50,
//       }}
//       variant="contained" color="primary">
//       验证邮箱
//     </Button>
//   </Grid>
// </Grid>
