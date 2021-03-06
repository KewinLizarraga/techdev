import React from 'react';
import { connect } from 'react-redux';
import GridContainer from '../../../../components/Grid/GridContainer';
import GridItem from '../../../../components/Grid/GridItem';
import UserTable from './Sections/UserTable';
import ProductTable from './Sections/ProductTable';
import BusinessTable from './Sections/BusinessTable';
import paymentStyle from '../../../../assets/jss/material-kit-react/views/registerTypeSections/paymentStyle';
import { withStyles } from '@material-ui/core/styles';
import TypeTable from './Sections/TypeTable';
import CustomDialog from '../../../../components/CustomDialog/CustomDialog';

class PaymentConfirmation extends React.Component {
  render = () => {
    const { classes, data } = this.props;
    const { user, product, business } = data;
    return (
      <GridContainer justify='center' className={classes.container}>
        <GridItem xs={12} sm={12} md={8}>
          <UserTable classes={classes} user={user} />
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <ProductTable classes={classes} product={product} />
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <BusinessTable classes={classes} business={business} />
        </GridItem>
        <GridItem xs={12} sm={12} md={8}>
          <TypeTable classes={classes} business={business} />
        </GridItem>
        <CustomDialog redirect='/'/>
      </GridContainer>
    )
  }
}

const mapStateToProps = ({ business }) => {
  const { data, dialogInfo } = business;
  return {
    data,
    dialogInfo
  }
}

export default connect(mapStateToProps)(
  withStyles(paymentStyle)(PaymentConfirmation)
);
