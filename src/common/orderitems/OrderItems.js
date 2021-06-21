import React, {Fragment} from 'react'
//Stylesheet imports
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import './OrderItems.css'
//Material UI imports
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

export default function OrderItems(props) {
    return (
        <Fragment>
            {(props.orderitems.items || []).map((item, index) => (
                <Grid key={item.id} container>
                    <Grid item xs={1}>
                        <i className="fa fa-stop-circle-o icon-type" aria-hidden="true"
                           style={item.type === 'VEG' ? {color: "green"} : {color: "red"}}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color='textSecondary' style={{textTransform: "capitalize"}}>
                            {item.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography color='textSecondary'>
                            {item.quantity}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography color='textSecondary'>
                            <i className="fa fa-inr" aria-hidden="true"></i>
                            {item.priceForAll.toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Typography>
                    </Grid>
                </Grid>
            ))
            }
            {props.divider ? <Divider style={{marginTop: 15, marginBottom: 15}}/> : null}
            <Grid container>
                <Grid item xs={9}>
                    <Typography color='textPrimary'>
                        Net Amount
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <div className='payable-bill-amount'>
                        <Typography color='textSecondary'>
                            <i className="fa fa-inr" aria-hidden="true"></i>
                        </Typography>
                        <Typography style={{marginRight: 10}} color='textPrimary'>
                            {Number(props.total).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <FormControl className='place-order-button'>
                        <Button variant="contained" color="primary" onClick={props.placeOrder}>PLACE ORDER</Button>
                    </FormControl>
                </Grid>
            </Grid>
        </Fragment>
    )
}