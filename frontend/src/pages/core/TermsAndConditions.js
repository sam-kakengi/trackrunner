import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom' 
import { Box, Typography, Button, List, ListItem } from '@mui/material'
import RunningMan from '../../assets/running-man-small.svg'
import { useTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'


const TermsAndConditions = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  const handleLogoClick = () => {
    const token = localStorage.getItem('token')
  
    if (token) {
        navigate('/dashboard')
    } else {
        navigate('/register')
    }
  }

  return (
    <Box sx={{ paddingTop: '5rem', paddingBottom: '3rem', height: '100%', backgroundColor: theme.background.default, overflow: 'auto', color: 'white' }}>
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', }}>
                <Typography sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, fontStyle: 'italic', color: '#FFD54F' }}>TrackRunner</Typography>
                <Typography sx={{cursor: 'pointer'}}><img src={RunningMan} alt="Man Running" style={{ width: '100%', maxWidth: '9.375rem' }} onClick={handleLogoClick}></img></Typography>
        </Box> 

        <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: { xs: '1rem', sm: '5rem', md: '10rem' },
          marginRight: { xs: '1rem', sm: '5rem', md: '10rem' },
          paddingBottom: '2rem',
        }}
      >
        <Box><Typography sx={{fontSize:'3.5rem', marginBottom: '1rem'}}>Terms and Conditions</Typography></Box>
        {/* Introduction */}
        <Typography variant="h6" sx={{ marginBottom: '1rem', color: '#FFD54F' }}>Last updated: 6th October 2024</Typography>
        <Typography variant="body1" sx={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
          Welcome to TrackRunner (the "Web App"). These terms and conditions outline the rules and regulations for the use of Farusoft's Web App, located at https://trackrunner.run.
          By accessing this Web App, we assume you accept these terms and conditions in full. Do not continue to use TrackRunner if you do not agree to all the terms and conditions stated on this page.
        </Typography>

        {/* Sections */}
        <Box sx={{ marginBottom: '2rem' }}>
          {/* Section 1: Definitions */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>1. Definitions</Typography>
          <List sx={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              "We," "Our," "Us" refer to Farusoft.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              "User," "You" refers to the person accessing or using the Web App.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              "Web App" refers to the services, features, and content provided through TrackRunner.
            </ListItem>
          </List>

          {/* Section 2: Use of the Web App */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>2. Use of the Web App</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}><strong>2.1 Eligibility:</strong> You must be at least 18 years old or have the consent of a parent or legal guardian to use this Web App.</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}><strong>2.2 Account Creation:</strong> To access certain features of TrackRunner, you may be required to register an account. You agree to provide accurate, current, and complete information during the registration process and update such information to keep it accurate and complete.</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}><strong>2.3 User Responsibility:</strong> You are responsible for maintaining the confidentiality of your account and password and for restricting access to your device. You agree to accept responsibility for all activities that occur under your account.</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}><strong>2.4 Prohibited Activities:</strong> You agree not to:</Typography>

          {/* Prohibited Activities List */}
          <List sx={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Use TrackRunner for unlawful purposes or in violation of any applicable law.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Submit false or misleading information.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Interfere with or disrupt the functionality of TrackRunner.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Engage in any behaviour that violates the privacy of other users.
            </ListItem>
          </List>

          {/* Remaining Sections */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>3. Intellectual Property</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            The content, features, and functionality of TrackRunner are and will remain the exclusive property of Farusoft and its licensors. TrackRunner is protected by copyright, trademark, and other laws. You are not permitted to use any of our trademarks, logos, or other proprietary information without our prior written consent.
          </Typography>

          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>4. Termination</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            We reserve the right to terminate or suspend your access to TrackRunner, without notice or liability, for any reason, including if you breach these terms.
          </Typography>

          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>5. Limitation of Liability</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            To the fullest extent permitted by applicable law, Farusoft shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of or inability to use TrackRunner.
          </Typography>

          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>6. Disclaimer</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            TrackRunner is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, whether express or implied, regarding the operation of TrackRunner, its content, or the information provided through it.
          </Typography>

          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>7. Indemnification</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            You agree to indemnify and hold Farusoft harmless from any claims, liabilities, damages, losses, and expenses, including legal fees, arising from your use of TrackRunner or your violation of these terms.
          </Typography>

          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>8. Governing Law</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            These terms and conditions are governed by and construed in accordance with the laws of England and Wales. Any disputes related to these terms will be subject to the exclusive jurisdiction of the courts of England and Wales.
          </Typography>

          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>9. Changes to Terms</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will provide at least [30] days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </Typography>

          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>10. Contact Us</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            If you have any questions about these Terms and Conditions, please contact us at richard.kakengi@farusoft.com.
          </Typography>
        </Box>

        {/* Button to return to Registration/Login */}
        <Button variant="contained" onClick={handleLogoClick} sx={{ width: '15rem', backgroundColor: theme.primary.main, 
            color: 'black', '&:hover': {
        backgroundColor: grey[700],
        color: 'white' 
        }, }}>
          Return
        </Button>
      </Box>
    </Box>
  )
  
}

export default TermsAndConditions
