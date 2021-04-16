import React, {Fragment, useState} from 'react'
import {Link, withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {addExperience} from "../../actions/profile";

const AddExperience = ({addExperience, history}) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {company, title, location, from, to, current, description} = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={event => {
                event.preventDefault();
                addExperience(formData, history); //one submit button is clicked, the system will call this action to send the data.
            }}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="title" value={title}
                           onChange={event => onChange(event)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="company" value={company}
                           onChange={event => onChange(event)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location}
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
                              }}/> {' '}Current Job</p>
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
                      placeholder="Job Description"
                      value={description} onChange={event => onChange(event)}
                  />
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <a className="btn my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}
AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, {addExperience})(AddExperience)