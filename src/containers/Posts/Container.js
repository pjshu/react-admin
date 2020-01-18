import Posts from './Posts';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {actions} from "../../redux/modules/article";
import {withRouter} from 'react-router-dom';


const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actions, dispatch);

export default withRouter(connect(
  null,
  mapDispatchToProps
)(Posts));
