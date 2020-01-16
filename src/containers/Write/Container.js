import {bindActionCreators} from "redux";
import {actions} from '../../redux/modules/article';
import {connect} from 'react-redux';
import Write from './Write';
import {withRouter} from "react-router-dom";


const mapStateToProps = (state) => {
  const {currentTime} = state.article;
  return {currentTime};
};


const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Write));
