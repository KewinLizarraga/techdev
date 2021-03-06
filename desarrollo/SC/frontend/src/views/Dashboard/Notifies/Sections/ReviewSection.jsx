// se conecta con store y manda todos los revies a listRevies
import React from 'react';
import { connect } from 'react-redux';
import { destroy } from 'redux-form';
import { getProfile } from '../../../../services/AuthService';
import ListReviews from './ListReviews';
import {
  fetchReviews,
  setCurrentReview,
  closeReviewDialog,
  openReviewDialog,
  submitReply
} from '../../../../actions/reviewActions';
import RespondForm from './RespondForm';

class ReviewSection extends React.Component {
  componentDidMount = () => {
    const profile = getProfile();
    this.props.fetchReviews(profile._id)
  }
  render = () => {
    const { setCurrentReview, closeReviewDialog, openReviewDialog, submitReply, destroy } = this.props;
    const { loading, reviews, currentReview, disabledButton, open } = this.props.review;
    return (
      <div>
        <ListReviews
          reviews={reviews}
          loading={loading}
          currentReview={currentReview}
          reviewActions={{
            setCurrentReview
          }}
        />
        <RespondForm
          disabled={disabledButton}
          open={open}
          currentReview={currentReview}
          actions={{
            close: closeReviewDialog,
            open: openReviewDialog,
            submit: submitReply,
            destroy: destroy
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ review }) => ({ review });
const mapDispatchToProps = {
  fetchReviews,
  setCurrentReview,
  closeReviewDialog,
  openReviewDialog,
  submitReply,
  destroy
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSection);
