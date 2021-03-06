import React, {PureComponent} from "react";
import {ControlLabel, FormControl, FormGroup, Glyphicon, HelpBlock, InputGroup} from "react-bootstrap";
import Datetime from "react-datetime";

export default class TourStepFormComponent extends PureComponent {
    render() {
        const {onSubmit, onChange, values, isLoading} = this.props;

        return (
            <form onSubmit={onSubmit} >
                <FormGroup controlId="stepName" validationState={values.name.validation}>
                    <ControlLabel>Nom*</ControlLabel>
                    <FormControl type="text"
                                 placeholder="Nouvelle étape"
                                 disabled={isLoading}
                                 value={values.name.value ? values.name.value : ''}
                                 name="name"
                                 onChange={onChange}
                    />
                    {values.name.error && <HelpBlock>{values.name.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepDateStart" validationState={values.dateStart.validation}>
                    <ControlLabel>Date de début*</ControlLabel>
                    <Datetime dateFormat="DD/MM/YYYY"
                              timeFormat="HH:mm"
                              value={values.dateStart.value ? values.dateStart.value : null}
                              inputProps={{
                                  placeholder: "dd/mm/yyyy hh:mm",
                                  disabled: isLoading,
                              }}
                              closeOnSelect={false}
                              onChange={(value) => onChange(value, 'dateStart')}/>
                    {values.dateStart.error && <HelpBlock>{values.dateStart.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepDateEnd" validationState={values.dateEnd.validation}>
                    <ControlLabel>Date de fin</ControlLabel>
                    <Datetime dateFormat="DD/MM/YYYY"
                              timeFormat="HH:mm"
                              value={values.dateEnd.value ? values.dateEnd.value : null}
                              inputProps={{
                                  placeholder: "dd/mm/yyyy hh:mm",
                                  disabled: isLoading,
                              }}
                              onChange={(value) => onChange(value, 'dateEnd')}/>
                    {values.dateEnd.error && <HelpBlock>{values.dateEnd.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepSummary" validationState={values.summary.validation}>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea"
                                 placeholder="Cette étape sera super !"
                                 disabled={isLoading}
                                 value={values.summary.value ? values.summary.value : ''}
                                 name="summary"
                                 onChange={onChange}
                    />
                    {values.summary.error && <HelpBlock>{values.summary.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepPrice" validationState={values.price.validation}>
                    <ControlLabel>Prix</ControlLabel>
                    <InputGroup>
                        <FormControl type="number"
                                     placeholder="0.00"
                                     disabled={isLoading}
                                     value={values.price.value ? values.price.value : ''}
                                     name="price"
                                     onChange={onChange}
                                     min="0"
                                     step="0.01"
                        />
                        <InputGroup.Addon>
                            <Glyphicon glyph="euro" />
                        </InputGroup.Addon>
                    </InputGroup>
                    {values.price.error && <HelpBlock>{values.price.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepType" validationState={values.type.validation}>
                    <ControlLabel>Type de logement</ControlLabel>
                    <FormControl componentClass="select"
                                 disabled={isLoading}
                                 name="type"
                                 onChange={onChange}
                                 value={values.type.value}
                    >
                        <option value="" disabled>-- Choisir le type --</option>
                        <option value="museum">Musée</option>
                        <option value="place">Lieu touristique</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="coffee">Café</option>
                        <option value="club">Bar / Club</option>
                        <option value="other">Autre</option>
                    </FormControl>
                    {values.type.error && <HelpBlock>{values.type.error}</HelpBlock>}
                </FormGroup>

                <FormGroup controlId="stepBookingNumber" validationState={values.bookingNumber.validation}>
                    <ControlLabel>Numéro de réservation</ControlLabel>
                    <FormControl type="text"
                                 placeholder="A3456CFF456"
                                 disabled={isLoading}
                                 value={values.bookingNumber.value ? values.bookingNumber.value : ''}
                                 name="bookingNumber"
                                 onChange={onChange}
                    />
                    {values.bookingNumber.error && <HelpBlock>{values.bookingNumber.error}</HelpBlock>}
                </FormGroup>

                <button style={{'display': 'none'}} type='submit' ref={ (button) => { this.button = button } } >Submit</button>
            </form>
        )
    }
}