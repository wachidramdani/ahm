import React, {Component} from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Paper, Box, Grid, Typography, withStyles } from '@material-ui/core';
import API from '../../../API';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import Swal from 'sweetalert2';
import { Rtif } from '../../Utils/Rtif';

import Copyright from '../../Base/Global/Copyright';

const styles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url('/assets/img/bg3.jpg')`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#ef012d',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            fields: {
                email: "",
                password: "",
                remember_me: false
            },
            errors: {},
            blocking: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = true;
        }

        if(typeof fields["email"] !== "undefined"){
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = true;
            }
        }  
        
        //Password
        if(!fields["password"]){
            formIsValid = false;
            errors["password"] = true;
        }

        this.setState({errors: errors});
        return formIsValid;
    }

    handleChange(e, field){         
        let fields = this.state.fields;
        const errors = this.state.errors;
        switch (field) {
            case 'remember_me':
                fields[field] = e.target.checked;   
                break;
            case 'email':
                fields[field] = e.target.value;
                errors["email"] = false;
                this.setState({errors: errors});   
                break;
            case 'password':
                fields[field] = e.target.value;
                errors["password"] = false;
                this.setState({errors: errors});   
                break;
            default:
                fields[field] = e.target.value;
                break;
        }
        this.setState({fields});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({blocking: true});

        if(this.handleValidation()){
            localStorage.clear();
            const form = {
                email: this.state.fields.email,
                password: this.state.fields.password,
                remember_me: this.state.fields.remember_me
            }
            this.setState({blocking: false});
            this.props.history.push('/dashboard');
            // API.post('api/auth/login/', form)
            // .then(res => {
            //     if(res.status === 200){                    
            //         Swal.fire({
            //             title: 'Success!',
            //             icon: 'success',
            //             text: 'Login Success.',
            //             showConfirmButton: false,
            //             timer: 1500
            //         })
            //         .then(() => {
            //             API.defaults.headers['Authorization'] = "Bearer "+res.data.token;
            //             localStorage.setItem('token', res.data.token);
            //             localStorage.setItem('data', JSON.stringify(res.data.data));                    
            //             this.props.history.push('/dashboard');
            //         })
            //         // console.log(res);                    
            //     }else{
            //         Swal.fire({  
            //             title: 'Warning',  
            //             icon: 'warning',  
            //             text: 'Your ID Unauthorized.',  
            //         });
            //     }
            //     this.setState({blocking: false});
            // }).catch((error) => {
            //     if(error && error.response && error.response.status === 401){
            //         Swal.fire({  
            //             title: 'Warning',  
            //             icon: 'warning',  
            //             text: 'Your ID Unauthorized.',  
            //         });
            //     }else{
            //         Swal.fire({  
            //             title: 'Error',  
            //             icon: 'error',  
            //             text: 'Please Check Your Network Connection.',  
            //         });
            //     }
            //     // console.log(error.response);            
            //     this.setState({blocking: false});
            // });
        }else{
            Swal.fire({  
                title: 'Warning',  
                icon: 'warning',
                text: 'Login Failed.',  
            });
            this.setState({blocking: false});
        }
    }

    render() {
        const { classes } = this.props;
        const { fields } = this.state;
        return (
            <BlockUi tag="div" blocking={this.state.blocking} message="Please wait">
                <Grid container component="main" className={classes.root}>
                <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <div className='col-md 12'>
                                <img src={'../../../assets/img/img_logo_ahm.png'} style={{float:"right", width:"130px"}}/>
                                <img src={'../../../assets/img/img_logo_honda.png'}  style={{float:"left", width:"150px", height: "55px", marginTop: "-23px"}}/>
                            </div>
                            <br></br>
                            <Avatar className={classes.avatar}>
                            <i className="icon-user-lock fs22"></i>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Welcome
                            </Typography>
                            <Typography className="fs12">
                                Please login with your credential account.
                            </Typography>
                            <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
                                <TextField
                                    onChange={(e) => this.handleChange(e, 'email')}
                                    value={fields["email"]}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    error={this.state.errors["email"]}
                                />
                                <Rtif boolean={this.state.errors["email"]}>
                                    <div className='error_input'><i className="icon-cancel-circle2"></i></div>
                                </Rtif>
                                <TextField
                                    onChange={(e) => this.handleChange(e, 'password')}
                                    value={fields["password"]}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    error={this.state.errors["password"]}
                                />
                                <Rtif boolean={this.state.errors["password"]}>
                                    <div className='error_input'><i className="icon-cancel-circle2"></i></div>
                                </Rtif>
                                <FormControlLabel className="fs12"
                                    control={<Checkbox onChange={(e) => this.handleChange(e, 'remember_me')} value={fields["remember_me"]} name="remember_me" color="primary"/>}
                                    label={<Typography className="smallCheck">Remember Me</Typography>}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    // color="primary"
                                    className={classes.submit}
                                    style={{backgroundColor:"#ef012d", color:"white"}}
                                >
                                Sign In
                                </Button>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </BlockUi>
        )
    }
}

export default  withStyles(styles, { withTheme: true})(Login); 