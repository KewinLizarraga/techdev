import React from 'react';
import _ from 'lodash';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

class CustomSelect extends React.Component {
  rendenSelectOptions = (options) => {
    const optionsArray = Object.keys(options);
    return _.map(optionsArray, option => (
      <option key={option} value={option}>
        {options[option]}
      </option>
    ));
  }
  render = () => {
    const { options, labelName, name } = this.props;
    return (
      <FormControl style={{ width: '100%'}}>
        <InputLabel htmlFor={`${name}-native-simple`}>{labelName}</InputLabel>
        <Select
          native
          value={''}
          {...this.props.input}
          inputProps={{
            name,
            id: `${name}-native-simple`
          }}
        >
          <option value="" />
          {this.rendenSelectOptions(options)}
        </Select>
      </FormControl>
    );
  }
}

export default CustomSelect;
