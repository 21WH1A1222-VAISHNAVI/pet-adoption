import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './AxiosInstance';
import { message } from 'antd';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Logo from "../assets/Logo.png";

const defaultTheme = createTheme({
   components: {
      MuiTextField: {
         styleOverrides: {
            root: {
               '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                     borderColor: '#fe9e0d', // Border color on hover
                  },
                  '&.Mui-focused fieldset': {
                     borderColor: '#fe9e0d', // Border color on focus
                  },
               },
            },
         },
      },
      MuiInputLabel: {
         styleOverrides: {
            root: {
               color: '#4c4c4c', // Default label color
            },
            focused: {
               color: 'black', // Label color when focused
            },
         },
      },
      MuiButton: {
         styleOverrides: {
            root: {
               backgroundColor: '#fe9e0d', // Background color
               color: 'white', // Text color
               '&:hover': {
                  backgroundColor: '#e48f0f', // Hover background color
               },
               '&:focus': {
                  backgroundColor: '#e48f0f', // Focus background color
               },
               '&:active': {
                  backgroundColor: '#e48f0f', // Active background color
               },
            },
            label: {
               color: '#4c4c4c', // Text color for label
               fontWeight: 'bold', // Bold font weight
            },
         },
      },
   },
});

function Login() {
   const navigate = useNavigate();
   const [user, setUser] = useState({
      email: '',
      password: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUser(prevValue => ({ ...prevValue, [name]: value }));
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!user.email || !user.password) {
         alert("Please fill out all fields");
      } else {
         axiosInstance.post("http://localhost:8001/api/user/login", user)
            .then((res) => {
               if (res.data.success) {
                  message.success(res.data.message);
                  localStorage.setItem('token', res.data.token);
                  localStorage.setItem("user", JSON.stringify(res.data.userData));
                  navigate("/dashboard");
                  setTimeout(() => {
                     window.location.reload();
                  }, 1000);
               }
            });
      }
   };

   return (
      <>
         <Navbar expand="lg" className="bg-body-tertiary" >
         <Container fluid>
            <Navbar.Brand>
               <img
                  src={Logo}
                  alt="Pet Adoption Logo"
                  width="150"
                  height="auto"
                  className="d-inline-block align-top"
               />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
               <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                  {/* Empty Nav for demonstration purposes */}
               </Nav>
               <Nav className="navbar-links">
                  <Link to={'/'} className="nav-link">Home</Link>
                  <Link to={'/login'} className="nav-link">Login</Link>
                  <Link to={'/register'} className="nav-link">Register</Link>
               </Nav>
            </Navbar.Collapse>
         </Container>
      </Navbar>

         <ThemeProvider theme={defaultTheme}>
            <div className='first-container' component="main" maxwidth="xs">
               <CssBaseline />
               <div className="d-flex justify-content-center align-item-center">
                  <Box
                     sx={{
                        marginTop: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        border: '1px solid lightgrey',
                        padding: '2rem',
                        borderRadius: '5px',
                        background: 'rgba(246, 246, 246, 0.85)', // Semi-transparent background color
                        width: 450,
                        height: 450
                     }}
                  >
                     <Avatar sx={{ m: 1, bgcolor: '#fe9e0d' }}>
                        <LockOutlinedIcon sx={{ color: 'white' }} />
                     </Avatar>
                     <Typography component="h1" variant="h5" sx={{ color: '#4c4c4c', fontWeight: 'bold' }}>
                        Sign in
                     </Typography>
                     <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                           <Grid item xs={12}>
                              <TextField
                                 required
                                 fullWidth
                                 id="email"
                                 label="Email Address"
                                 name="email"
                                 autoComplete="email"
                                 value={user.email}
                                 onChange={handleChange}
                                 variant="outlined"
                              />
                           </Grid>
                           <Grid item xs={12}>
                              <TextField
                                 required
                                 fullWidth
                                 name="password"
                                 label="Password"
                                 type="password"
                                 id="password"
                                 autoComplete="new-password"
                                 value={user.password}
                                 onChange={handleChange}
                                 variant="outlined"
                              />
                           </Grid>
                        </Grid>
                        <Button
                           type="submit"
                           fullWidth
                           variant="contained"
                           sx={{ mt: 3, mb: 2 }}
                        >
                           Sign In
                        </Button>
                        <Grid container justifyContent="flex-end">
                           <Grid item>
                              <Link style={{ color: '#4c4c4c', fontWeight: 'bold' }} to={'/register'} variant="body2">
                                 Don't have an account? Sign up Here
                              </Link>
                           </Grid>
                        </Grid>
                     </Box>
                  </Box>
               </div>
            </div>
         </ThemeProvider>
      </>
   );
}

export default Login;
