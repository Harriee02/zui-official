import { Card, CardContent, Checkbox, FormControlLabel, Stack, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { isBoolean, isArray } from 'lodash';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    minWidth: '15%',
    alignItems: 'flex-start',
    background: '#FFFFFF',
    boxShadow: '0rem 0.313rem 0.625rem rgba(131, 131, 131, 0.08)',
    borderColor: '#FFFFFF',
    borderRadius: '0.75rem',
    color: '#14191F'
  },
  cardContent: {
    '&:last-child': {
      padding: '1rem'
    }
  },
  cardTitle: {
    fontWeight: '600',
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    letterSpacing: '-0.01rem',
    marginBottom: '1rem'
  },
  formControl: {
    marginLeft: '0',
    marginRight: '0'
  },
  cardContentText: {
    fontSize: '1rem',
    color: theme.palette.secondary.dark,
    lineHeight: '1.5rem',
    paddingLeft: '0.5rem'
  }
}));

function FilterCard(props) {
  const classes = useStyles();
  const { title, filters, updateFilters, filterValue, wrapperLoading } = props;

  const handleFilterClicked = (event, changedFilterLabel, changedFilterValue) => {
    const { checked } = event.target;
    if (checked) {
      if (filters[0]?.type === 'boolean') {
        updateFilters(checked);
      } else {
        updateFilters([...filterValue, changedFilterValue]);
      }
    } else {
      if (filters[0]?.type === 'boolean') {
        updateFilters(checked);
      } else {
        updateFilters(filterValue.filter((e) => e !== changedFilterValue));
      }
      // setSelectedFilter(null);
    }
  };

  const getCheckboxStatus = (label) => {
    if (isArray(filterValue)) {
      return filterValue?.includes(label);
    } else if (isBoolean(filterValue)) {
      return filterValue;
    }
  };

  const getFilterRows = () => {
    const filterRows = filters;
    return filterRows.map((filter, index) => {
      return (
        <Tooltip key={index} title={filter.tooltip ?? filter.label} placement="top" arrow>
          <FormControlLabel
            className={classes.formControl}
            componentsProps={{ typography: { variant: 'body2', className: classes.cardContentText } }}
            control={<Checkbox sx={{ padding: '0.188rem', color: '#52637A' }} />}
            label={filter.label}
            id={title}
            checked={getCheckboxStatus(filter.label)}
            onChange={() => handleFilterClicked(event, filter.label, filter.value)}
            disabled={wrapperLoading}
          />
        </Tooltip>
      );
    });
  };

  return (
    <Card variant="outlined" className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography className={classes.cardTitle}>{title || 'Filter Title'}</Typography>
        <Stack direction="column">{getFilterRows()}</Stack>
      </CardContent>
    </Card>
  );
}

export default FilterCard;
