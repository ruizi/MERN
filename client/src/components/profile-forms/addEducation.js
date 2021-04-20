import React, {Fragment, useState} from 'react'
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {addEducation} from "../../actions/profile";

const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {school, degree, fieldofstudy, from, to, current, description} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any school or bootcamp you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={event => {
                event.preventDefault();
                addEducation(formData, history); //one submit button is clicked, the system will call this action to send the data.
            }}>
                <div className="form-group">
                    <input type="text" placeholder="* School or Bootcamp" name="school" value={school}
                           onChange={event => onChange(event)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Degree or Certificate" name="degree" value={degree}
                           onChange={event => onChange(event)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy}
                           onChange={event => onChange(event)}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from}
                           onChange={event => onChange(event)}/>
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current}
                              onChange={event => {
                                  setFormData({...formData, current: !current});//reverse
                                  toggleDisabled(!toDateDisabled);
                              }}/> {' '}Current School</p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to}
                           onChange={event => onChange(event)} //if current is true, last check box will make toDateDisabled and so this checkbox needs to be disabled
                           disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>

                <div className="form-group">
                  <textarea
                      name="description"
                      cols="30"
                      rows="5"
                      placeholder="Program Description"
                      value={description} onChange={event => onChange(event)}
                  />
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <a className="btn my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}
AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, {addEducation})(withRouter(AddEducation))