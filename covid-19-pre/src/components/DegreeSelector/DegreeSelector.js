
import React from 'react';
import classes from './DegreeSelector.module.css';
import { NativeSelect, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
const DegreeSelector = (props) => {
    const useStyles = makeStyles((theme) => ({
        button: {
          display: 'block',
          marginTop: theme.spacing(2),
        },
        formControl: {
          margin: theme.spacing(1),
          minWidth: 120,
        },
      }));
      
    const styles = useStyles();
      const handleChange = (event) => {
        const name = event.target.name;
        props.changedDegreeHandler(event.target.value);
      };
    return (
        <FormControl className={[styles.formControl,classes.form].join(' ')}>
        <InputLabel htmlFor="age-native-helper">Age</InputLabel>
        <NativeSelect
          onChange={handleChange}
          inputProps={{
            name: 'age',
            id: 'age-native-helper',
          }}
        >
          <option aria-label="None" value="" />
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
          <option value={4}>Four</option>
          <option value={5}>Five</option>
          <option value={6}>Six</option>
          <option value={7}>Seven</option>
        </NativeSelect>
      </FormControl>
        
          );
}

export default DegreeSelector;