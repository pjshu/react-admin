import {bindActionCreators} from "redux";
import {actions} from '../../redux/modules/article';
import {connect} from 'react-redux';
import Write from './Write';

const mapStateToProps = (state) => {
  const {post, tempTags, row} = state.article;
  return {post, tempTags, row};
};

const mapDispatchToProps = (dispatch) => {
  bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Write);
