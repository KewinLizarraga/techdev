// TODO: mostrar mensaje al re-enviar en caso de exito y error
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import querySearch from 'stringquery';
import { tinkuyAxios } from '../../services/axios';
import handleConfirmationStyle from '../../assets/jss/material-kit-react/views/handleConfirmationStyle';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Footer from '../../components/Footer/Footer';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import image from '../../assets/img/login_bg.jpg';
import CardBody from '../../components/Card/CardBody';
import Button from '../../components/CustomButtons/Button';

class HandleConfirmation extends React.Component {
  handleClick = () => {
    const { email } = querySearch(this.props.location.search || '');
    tinkuyAxios({
      method: 'post',
      url: '/auth/resend',
      data: { email }
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        className={classes.pageHeader}
        style={{
          background: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className={classes.container}>
          <GridContainer justify='center'>
            <GridItem xs={12} sm={9} md={7} lg={5} xl={10}>
              <Card >
                <CardHeader color='primary' className={classes.cardHeader}>
                  <h4 className={classes.title}>Confirmar email</h4>
                </CardHeader>
                <CardBody>
                  <GridContainer justify='center'>
                    <GridItem className={classes.centerItem}>
                      <p>Se envio un enlace de confirmacion a correo.</p>
                    </GridItem>
                    <GridItem className={classes.centerItem}>
                      <p>Si no le ha llegado ningun mensaje puede volver a venviar.</p>
                    </GridItem>
                    <GridItem className={classes.centerItem}>
                      <Button onClick={this.handleClick} simple color="primary" size="lg">
                        Reenviar
                      </Button>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    )
  }
}

// ProtTypes for this component

// Export component
export default withStyles(handleConfirmationStyle)(HandleConfirmation);