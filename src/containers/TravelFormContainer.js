import React, { Component } from 'react';
import {Button, Modal} from "react-bootstrap";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Moment from "moment";

import * as travelFormActions from "../actions/TravelFormActions";
import TravelFormComponent from "../components/TravelFormComponent";

class TravelEditContainer extends Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.validate = this.validate.bind(this);
        this.save = this.save.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    close() {
        this.props.travelFormActions.closeModal();
    }

    componentDidMount() {
        const {travel} = this.props;

        this.props.travelFormActions.setTravel(travel);
    }

    validate() {
        let isValid = true;

        const {name, dateStart, dateEnd} = this.props.values;

        if(!name.value || name.value.length === 0) {
            this.props.travelFormActions.setError('name', 'Ce champs est obligatoire');
            isValid = false;
        }

        if(!dateStart.value) {
            this.props.travelFormActions.setError('dateStart', 'Ce champs est obligatoire');
            isValid = false;
        } else if(!(dateStart.value instanceof Moment) || !dateStart.value.isValid()) {
            this.props.travelFormActions.setError('dateStart', 'La date est invalide');
            isValid = false;
        }

        if(dateEnd.value) {
            if(!(dateEnd.value instanceof Moment) || !dateEnd.value.isValid()) {
                this.props.travelFormActions.setError('dateEnd', 'La date est invalide');
                isValid = false;
            } else if (dateEnd.value.isBefore(dateStart.value)) {
                this.props.travelFormActions.setError('dateEnd', 'La date de fin doit être après celle du début');
                isValid = false;
            }
        }

        return isValid;
    }

    save() {
        const {travelFormComponent} = this.refs;
        travelFormComponent.button.click();
    }

    handleChange(e, field = null) {
        let name, value;

        if(field) {
            name = field;
            value = e;
        } else {
            name = e.target.getAttribute('name');
            value = e.target.value;
        }

        this.props.travelFormActions.updateValue(name, value);
    }

    handleSubmit(e) {
        e.preventDefault();

        const {travel, values} = this.props;

        if(this.validate()) {
            if(travel) {
                this.props.travelFormActions.edit(travel['@id'], {
                    name: values.name.value,
                    summary: values.summary.value,
                    dateStart: values.dateStart.value ? values.dateStart.value.format('YYYY-MM-DD') : null,
                    dateEnd: values.dateEnd.value ? values.dateEnd.value.format('YYYY-MM-DD') : null,
                });
            } else {
                this.props.travelFormActions.add({
                    name: values.name.value,
                    summary: values.summary.value,
                    dateStart: values.dateStart.value ? values.dateStart.value.format('YYYY-MM-DD') : null,
                    dateEnd: values.dateEnd.value ? values.dateEnd.value.format('YYYY-MM-DD') : null,
                });
            }
        }
    }

    render() {
        const {travel, showModal, values, isLoading} = this.props;

        return (
            <Modal show={showModal} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>{travel ? 'Modifier le voyage' : 'Nouveau voyage'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TravelFormComponent ref="travelFormComponent" values={values} onSubmit={this.handleSubmit} onChange={this.handleChange} isLoading={isLoading} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close} disabled={isLoading}>Fermer</Button>
                    <Button onClick={this.save} bsStyle="success" disabled={isLoading}>{this.props.isLoading ? (<i className="glyphicon glyphicon-repeat"/>) : 'Enregistrer'}</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        showModal: state.TravelFormReducer.showModal,
        values: state.TravelFormReducer.values,
        isLoading: state.TravelFormReducer.isLoading
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        travelFormActions: bindActionCreators(travelFormActions, dispatch, props)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelEditContainer);
