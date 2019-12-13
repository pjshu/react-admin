import {bindActionCreators} from "redux";
import {actions} from '../../redux/modules/article';
import {connect} from 'react-redux';
import Write from './Write';
import {withRouter} from "react-router-dom";

const mapStateToProps = (state) => {
  const {post, tempTags, rows, images} = state.article;
  return {post, tempTags, rows, images};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Write));
