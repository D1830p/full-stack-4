import './App.css'
import React from 'react'
import firebase from 'firebase'
import Typography from '@material-ui/core/Typography'
import FormLabel from '@material-ui/core/FormLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import Select from '@material-ui/core/Select'
import Slider from '@material-ui/core/Slider'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { ethers } from 'ethers'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
  Link as RouterLink,
  useLocation,
  useHistory,
} from 'react-router-dom'

import {
  DONATION_ADDRESS,
  PROVINCES,
  CANDIDATE_NAME,
  HAPPINESS_LABEL,
} from './constants'

const NETWORK = 'goerli'

export default function App() {
  return (
    <BrowserRouter>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className='App'>
          <div className='App-Content'>
            <AppHeader />
            <AppBody />
          </div>
        </div>
      </MuiPickersUtilsProvider>
    </BrowserRouter>
  )
}

function AppHeader() {
  return (
    <div>
      <Grid container={true} justify='space-between'>
        <Typography component='h1' gutterBottom={true}>
          Cast Your Vote
        </Typography>
        <Link to='/' component={RouterLink}>
          Back to start
        </Link>
      </Grid>
    </div>
  )
}

function AppBody() {
  const [savedUsername, setSavedUsername] = React.useState(
    window.localStorage.getItem('username') || '',
  )
  React.useEffect(() => {
    if (savedUsername) {
      window.localStorage.setItem('username', savedUsername)
    } else {
      window.localStorage.removeItem('username')
    }
  }, [savedUsername])

  const [savedCandidate, setSavedCandidate] = React.useState(
    window.localStorage.getItem('candidate') || '',
  )
  React.useEffect(() => {
    if (savedCandidate) {
      window.localStorage.setItem('candidate', savedCandidate)
    } else {
      window.localStorage.removeItem('candidate')
    }
  }, [savedCandidate])

  const [savedHappiness, setSavedHappiness] = React.useState(
    window.localStorage.getItem('happiness') || '',
  )
  React.useEffect(() => {
    if (savedHappiness) {
      window.localStorage.setItem('happiness', savedHappiness)
    } else {
      window.localStorage.removeItem('happiness')
    }
  }, [savedHappiness])
  
  const [savedBirthday, setSavedBirthday] = React.useState(
    window.localStorage.getItem('birthday') || '',
  )
  React.useEffect(() => {
    if (savedBirthday) {
      window.localStorage.setItem('birthday', savedBirthday)
    } else {
      window.localStorage.removeItem('birthday')
    }
  }, [savedBirthday])

  const [savedProvince, setSavedProvince] = React.useState(
    window.localStorage.getItem('province') || '',
  )
  React.useEffect(() => {
    if (savedProvince) {
      window.localStorage.setItem('province', savedProvince)
    } else {
      window.localStorage.removeItem('province')
    }
  }, [savedProvince])

  const [savedTemperature, setSavedTemperature] = React.useState(
    window.localStorage.getItem('temperature') || 20,
  )
  React.useEffect(() => {
    if (savedTemperature) {
      window.localStorage.setItem('temperature', savedTemperature)
    } else {
      window.localStorage.removeItem('temperature')
    }
  }, [savedTemperature])

  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => (
          <LoginPage
            savedUsername={savedUsername}
            setSavedUsername={setSavedUsername}
          />
        )}
      />

      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        exact
        path='/voting/1'
        render={() => (
          <StepOne
            setSavedCandidate={setSavedCandidate}
            setSavedHappiness={setSavedHappiness}
          />
        )}
      />

      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        exact
        path='/voting/2'
        render={() => (
          <StepTwo
            setSavedBirthday={setSavedBirthday}
            setSavedProvince={setSavedProvince}
      />
        )}
      />

      <LoggedInRoute
        isLoggedIn={Boolean(savedUsername)}
        exact
        path='/voting/3'
        render={() => (
          <StepThree
            setSavedTemperature={setSavedTemperature}
          />
        )}
      />

    </Switch>
  )
}

function LoginPage({ savedUsername, setSavedUsername }) {
  const [username, setUsername] = React.useState('')

  return (
    <Grid container direction="column">
      {savedUsername ? <Redirect to='/voting/1' /> : undefined}
      <h2>
          To begin your voting application, choose a username
      </h2>

      <Box py={2}>
        <TextField
          value={username}
          label='Username'
          onChange={event => setUsername(event.target.value)}
        />
      </Box>

      <Box>
        <Button variant='contained' onClick={() => setSavedUsername(username)}>
          Continue
        </Button>
      </Box>
    </Grid>
  )
}

function StepOne({ setSavedCandidate, setSavedHappiness }) {
  const [candidate, setCandidate] = React.useState(window.localStorage.getItem('candidate') || '');
  const [happiness, setHappiness] = React.useState(window.localStorage.getItem('happiness') || '');

  const history = useHistory();

  const handleCandidateChange = event => {
    setCandidate(event.target.value);
  };
  
  const handleHappinessChange = event => {
    setHappiness(event.target.value);
  };

  const handleClick = event => {
    setSavedCandidate(candidate);
    setSavedHappiness(happiness);
    history.push('/voting/2');
  }

  return (
    <Grid container direction="column">
       <FormControl component="fieldset">
        <FormLabel component="legend">Who is your favourite candidate?</FormLabel>
        <RadioGroup aria-label="candidate" name="candidate" value={candidate} onChange={handleCandidateChange}>
          {
            Object.keys(CANDIDATE_NAME).map(
              (curr) => <FormControlLabel key={curr} value={curr} control={<Radio />} label={CANDIDATE_NAME[curr]} />
            )
          }
        </RadioGroup>
      </FormControl>
      
      <FormControl component="fieldset">
        <FormLabel component="legend">How happy are you with the current progress?</FormLabel>
        <RadioGroup aria-label="happiness" name="happiness" value={happiness} onChange={handleHappinessChange}>
          {
            Object.keys(HAPPINESS_LABEL).map(
              (curr) => <FormControlLabel key={curr} value={curr} control={<Radio />} label={HAPPINESS_LABEL[curr]} />
            )
          }
        </RadioGroup>
      </FormControl>
      <Divider />
      
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant='contained' disabled>
          Pervious
        </Button>

        <Button disabled={!(Boolean(candidate) && Boolean(happiness))} color="primary" variant='contained' onClick={handleClick}>
          Next
        </Button>
      </Box>
    </Grid>
  )
}

function StepTwo({ setSavedBirthday, setSavedProvince }) {
  const [birthday, setBirthday] = React.useState(window.localStorage.getItem('birthday') || Date.now);
  const [province, setProvince] = React.useState(window.localStorage.getItem('province') || '');
  const history = useHistory();

  const handleBirthdayChange = date => {
    setBirthday(date);
  };
  
  const handleProvinceChange = event => {
    setProvince(event.target.value);
  };

  const handleClick = () => {
    setSavedBirthday(birthday);
    setSavedProvince(province);
    history.push('/voting/3');
  }

  return (
    <Grid container direction="column">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="When is your birthday?"
          value={birthday}
          onChange={handleBirthdayChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>

       <FormControl component="fieldset">
        <FormLabel component="legend">Which province do you reside in?</FormLabel>
        <Select
          value={province}
          onChange={handleProvinceChange}
        >
          {
            PROVINCES.map(
              (curr) => <MenuItem key={curr.code} value={curr.code}>{curr.name}</MenuItem>
            )
          }
        </Select>
      </FormControl>
      </Box>
      
      <Divider />
      
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant='contained' onClick={() => history.push('/voting/1')}>
          Pervious
        </Button>
        
        <Button disabled={!(Boolean(birthday) && Boolean(province))} color="primary" variant='contained' onClick={handleClick}>
          Next
        </Button>
      </Box>
    </Grid>
  )
}

function StepThree({ setSavedTemperature }) {
  const [temperature, setTemperature] = React.useState(window.localStorage.getItem('temperature') || 20);
  const history = useHistory();
      
  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
  };

  const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleClick = () => {
    setSavedTemperature(temperature);
    history.push('/voting/summary');
  }

  return (
    <Grid container direction="column">
      <Box mb={2}>
        <Typography variant="h3" gutterBottom>
          Part 3
        </Typography>

        <Typography id="discrete-slider-restrict" gutterBottom>
          What is your Ideal Room Temperature?
        </Typography>

        <Slider
          defaultValue={Number(temperature)}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-restrict"
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          onChange={handleTemperatureChange}
        />
      </Box>
      
      <Divider />
      
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant='contained' onClick={() => history.push('/voting/2')}>
          Pervious
        </Button>
        
        <Button variant='contained' color="primary" onClick={handleClick}>
          Next
        </Button>
      </Box>
    </Grid>
  )
}
const withLoggedInState = Component => {
  return function NewComponent({ isLoggedIn, ...props }) {
    return (
      <div>
        {!isLoggedIn && <Redirect to='/login' />}
        <Component {...props} />
      </div>
    )
  }
}

const LoggedInRoute = withLoggedInState(Route)