import {
    Button,
    Box,
    Grid,
    Card,
    CardHeader,
    IconButton,
    Divider,
    CardContent,
    TextField,
    Stack,
    List,
    ListItem,
    ListItemText,
    Typography,
    ListItemButton,
    Avatar,
    Chip,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import * as UserServices from 'service/UserServices';
import MainCard from "components/MainCard";
import { CheckOutlined } from "@ant-design/icons";

export default function Register() {
    const [employeeID, setEmployeeId] = useState('');
    const [user, setUser] = useState();
    const [touched, setTouched] = useState(false)
    const [checked, setChecked] = useState(false)
    const handleClickButtonSearch = () => {
        setChecked(false)
        UserServices.getUserById(employeeID).then(async result => {
            if (result?.success && result.data[0]) {
                const data = result.data[0]
                if (!data.phone) {
                    data.phone = "No Phone"
                }
                if (data.avatar_public_id) {
                    await cloudinaryServices.fetchUrl(data.avatar_public_id).then(result => {
                        if (result?.success === true) {
                            data.avatar_public_id = result.data[0].url
                        }
                    })
                }
                setUser(data);
            } else {
                
            }
        })
    }

    const handleClickCheckUser = () => {
        if(user){
            setChecked(true)
        }else{
            setContentAlert("You have not supplied a employee id!")
            setOpenAlert(true)
            setStatusAlert("error")
        }
    }

    return (
        <div title="Enrollment">
            <Grid container  sx={{
                "& .MuiGrid-item": {
                    paddingLeft: '24px',
                    marginBottom: '24px',
                }
            }}>
                <Grid item xs={12} sm={12} md={6}>
                    <Grid container spacing={3} sx={{
                        "& .MuiGrid-item": {
                            paddingLeft: '24px'
                        }
                    }}>
                        <Grid item xs={12}>
                            <Card sx={{
                                backgroundColor: 'rgb(255, 255, 255)',
                                color: 'rgb(38, 38, 38)',
                                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                overflow: 'hidden',
                                position: 'relative',
                                border: '1px solid rgb(230, 235, 241)',
                                borderRadius: '4px',
                                boxShadow: 'inherit',
                            }}>
                                <CardHeader title="Enter the Employee ID" />
                                <Divider sx={{
                                    margin: '0px',
                                    flexShrink: '0',
                                    borderWidth: '0px 0px thin',
                                    borderStyle: 'solid',
                                    borderColor: 'rgb(240, 240, 240)',
                                }} />
                                <CardContent>
                                    <Stack
                                        direction={{ xs: 'column', sm: 'row' }}
                                        spacing={{ xs: 1, sm: 2, md: 4 }} sx={{
                                            justifyContent: 'space-around'
                                        }}>
                                        <TextField
                                            error={Boolean(touched && !employeeID)}
                                            value={employeeID}
                                            variant="outlined"
                                            helperText={touched && !employeeID && "Employee Id is Required!"}
                                            onChange={(event) => setEmployeeId(event.target.value.trim())}
                                            sx={{
                                                width: '100%'
                                            }}
                                            onClick={() => { setTouched(true) }}
                                            onKeyDown={(event)=>{
                                                if(event.key === 'Enter'){
                                                    handleClickButtonSearch()
                                                }
                                            }}
                                        />
                                        <Button sx={{
                                            backgroundColor: 'rgba(42, 161, 175, 0.9)',
                                            color: 'white',
                                            cursor: 'pointer',
                                            maxHeight: '40px',
                                            "&:hover": {
                                                backgroundColor: 'rgb(26, 123, 138)',

                                            }
                                        }}
                                            onClick={handleClickButtonSearch}
                                            
                                        >
                                            Search
                                        </Button>
                                    </Stack>
                                </CardContent>


                            </Card>
                        </Grid>

                        <Grid item xs={12}>
                            <Card sx={{
                                backgroundColor: 'rgb(255, 255, 255)',
                                color: 'rgb(38, 38, 38)',
                                transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                                overflow: 'hidden',
                                position: 'relative',
                                border: '1px solid rgb(230, 235, 241)',
                                borderRadius: '4px',
                                boxShadow: 'inherit',
                            }}>
                                <CardHeader title="Empolyee Information" />
                                <Divider sx={{
                                    margin: '0px',
                                    flexShrink: '0',
                                    borderWidth: '0px 0px thin',
                                    borderStyle: 'solid',
                                    borderColor: 'rgb(240, 240, 240)',
                                }} />
                                <CardContent>
                                    <List>
                                        <ListItem>
                                            <Grid container spacing={2} >
                                                <Grid item xs={12} sm={6}>
                                                    <Stack direction={'column'}>
                                                        <Typography variant="body1"
                                                            sx={{
                                                                fontSize: '0.875rem',
                                                                lineHeight: '1.57',
                                                                fontFamily: '"Public Sans", sans-serif',
                                                                fontWeight: '400',
                                                                color: 'rgb(140, 140, 140)',
                                                            }}
                                                        >Fullname</Typography>
                                                        <Typography variant="body1"
                                                            sx={{
                                                                fontSize: '0.875rem',
                                                                lineHeight: '1.57',
                                                                fontFamily: '"Public Sans", sans-serif',
                                                                fontWeight: '400',
                                                                marginTop: '4px',
                                                            }}
                                                        >{user && (user.last_name + " " + user.first_name)}</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Stack direction={'column'}>
                                                        <Typography variant="body1"
                                                            sx={{
                                                                fontSize: '0.875rem',
                                                                lineHeight: '1.57',
                                                                fontFamily: '"Public Sans", sans-serif',
                                                                fontWeight: '400',
                                                                color: 'rgb(140, 140, 140)',
                                                            }}
                                                        >Avatar</Typography>
                                                        <Avatar src={user && user.avatar_public_id} />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                        <Divider sx={{
                                            margin: '0px',
                                            flexShrink: '0',
                                            borderWidth: '0px 0px thin',
                                            borderStyle: 'solid',
                                            borderColor: 'rgb(240, 240, 240)',
                                        }} />
                                        <ListItem>

                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <Stack direction={'column'}>
                                                        <Typography variant="body1"
                                                            sx={{
                                                                fontSize: '0.875rem',
                                                                lineHeight: '1.57',
                                                                fontFamily: '"Public Sans", sans-serif',
                                                                fontWeight: '400',
                                                                color: 'rgb(140, 140, 140)',
                                                            }}
                                                        >Phone</Typography>
                                                        <Typography variant="body1"
                                                            sx={{
                                                                fontSize: '0.875rem',
                                                                lineHeight: '1.57',
                                                                fontFamily: '"Public Sans", sans-serif',
                                                                fontWeight: '400',
                                                                marginTop: '4px',
                                                            }}
                                                        >{user && user.phone}</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Stack direction={'column'}>
                                                        <Typography variant="body1"
                                                            sx={{
                                                                fontSize: '0.875rem',
                                                                lineHeight: '1.57',
                                                                fontFamily: '"Public Sans", sans-serif',
                                                                fontWeight: '400',
                                                                color: 'rgb(140, 140, 140)',
                                                            }}
                                                        >Email</Typography>
                                                        <Typography variant="body1"
                                                            sx={{
                                                                fontSize: '0.875rem',
                                                                lineHeight: '1.57',
                                                                fontFamily: '"Public Sans", sans-serif',
                                                                fontWeight: '400',
                                                                marginTop: '4px',
                                                            }}
                                                        >{user && user.email}</Typography>
                                                    </Stack>
                                                </Grid>

                                            </Grid>
                                        </ListItem>
                                        <Divider sx={{
                                            margin: '0px',
                                            flexShrink: '0',
                                            borderWidth: '0px 0px thin',
                                            borderStyle: 'solid',
                                            borderColor: 'rgb(240, 240, 240)',
                                        }} />

                                        <ListItem sx={{display: !user && 'none'}}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1">
                                                        Are you sure the information above is right?
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    {(checked) ?
                                                        <Chip
                                                        component={CheckOutlined } 
                                                        color="success"
                                                        sx={{
                                                            padding: '16px 24px'
                                                        }}
                                                        />
                                                            
                                                    
                                                        :
                                                        <Button sx={{
                                                            backgroundColor: 'rgba(42, 161, 175, 0.9)',
                                                            color: 'white',
                                                            cursor: 'pointer',
                                                            maxHeight: '40px',
                                                            "&:hover": {
                                                                backgroundColor: 'rgb(26, 123, 138)',

                                                            }
                                                        }}
                                                            onClick={handleClickCheckUser}>
                                                            Yes
                                                        </Button>
                                                    }
                                                </Grid>
                                            </Grid>
                                        </ListItem>
                                    </List>

                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>

                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                    <VideoStream user={user} checked={checked}/>
                </Grid>
            </Grid>
        </div >
    )

}

