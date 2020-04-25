import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { bindActionCreators } from "redux";
import * as authorActions from "../../redux/actions/authorAction";
import * as courseActions from "../../redux/actions/courseActions";
import Spinner from "../common/Spinner";
import CourseList from "./CourseList";

export class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    console.log("hello", this.props.loading);
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }
  }

  handleDeleteCourse = (course) => {
    toast.success("Course deleted");
    this.props.actions.deleteCourse(course).catch((error) => {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    });
  };

  render() {
    console.log("hello2", this.props.loading);
    return (
      <div>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}{" "}
        <h2> Courses </h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{
                marginBottom: 20,
              }}
              className="btn btn-primary add-course"
              onClick={() =>
                this.setState({
                  redirectToAddCoursePage: true,
                })
              }
            >
              Add Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </div>
    );
  }
}

CoursesPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find((a) => a.id === course.authorId)
                .name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
