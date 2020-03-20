import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright = (props) => {
    return(
        <div>
            <Typography className="textCpr" variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
                Ogya
            </Link>{' '}
            {'2020'}
            </Typography>
        </div>
    )
}

export default Copyright;