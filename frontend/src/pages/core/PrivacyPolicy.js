import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button, List, ListItem } from '@mui/material'
import RunningMan from '../../assets/running-man-small.svg'
import { useTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'


const PrivacyPolicy = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  const handleLogoClick = () => {
    navigate('/dashboard')
  }

  return (
    <Box sx={{ paddingTop: '5rem', paddingBottom: '3rem', height: '100%', backgroundColor: theme.background.default, overflow: 'auto', color: 'white' }}>
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
        <Typography sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }, fontStyle: 'italic', color: '#FFD54F' }}>
          TrackRunner
        </Typography>
        <Typography sx={{ cursor: 'pointer' }}>
          <img src={RunningMan} alt="Man Running" style={{ width: '100%', maxWidth: '9.375rem' }} onClick={handleLogoClick} />
        </Typography>
      </Box>

      {/* Privacy Policy Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: { xs: '1rem', sm: '5rem', md: '10rem' },
          marginRight: { xs: '1rem', sm: '5rem', md: '10rem' },
          paddingBottom: '2rem',
        }}
      >
        <Box><Typography sx={{fontSize:'3.5rem', marginBottom: '1rem'}}>Privacy Policy</Typography></Box>

        {/* Introduction */}
        <Typography variant="h6" sx={{ marginBottom: '1rem', color: '#FFD54F' }}>Effective Date: 8th October 2024</Typography>
        <Typography variant="body1" sx={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
          At TrackRunner, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our app and services. By using TrackRunner, you agree to the terms outlined in this policy.
        </Typography>

        {/* Sections */}
        <Box sx={{ marginBottom: '2rem' }}>
          {/* Section 1: Information We Collect */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>1. Information We Collect</Typography>
          <List sx={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Email Address: Collected during account creation for user identification and communication purposes.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Password: Stored securely for account authentication (hashed and encrypted).
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Running Data: We collect data related to your running activities (e.g., duration, pace, and distance). Note: TrackRunner does not collect any location data.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Cookies: We use a cookie to store your JSON Web Token (JWT) in your browser’s local storage to maintain your session and authenticate your account.
            </ListItem>
          </List>

          {/* Section 2: How We Use Your Data */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>2. How We Use Your Data</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            We use the data collected for the following purposes:
          </Typography>
          <List sx={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Account Management: To enable user login, account recovery, and manage user preferences.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Running Analytics: To track and provide insights on your running activities.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Communication: To send account-related notifications, updates, or changes in our Privacy Policy.
            </ListItem>
          </List>

          {/* Section 3: Data Sharing */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>3. Data Sharing</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            We do not share your personal data with third parties, except:
          </Typography>
          <List sx={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Database Provider: Your data is stored on secure servers managed by our third-party database provider, who is bound by confidentiality agreements to protect your information.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              We do not sell, rent, or trade your personal data with any other parties.
            </ListItem>
          </List>

          {/* Section 4: Cookies and Tracking */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>4. Cookies and Tracking</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            TrackRunner only uses a cookie to store the JWT token in your browser’s local storage. This token is used for session management and user authentication. You may clear cookies through your browser settings, but doing so may disrupt your use of the app.
          </Typography>

          {/* Section 5: Data Retention */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>5. Data Retention</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            We retain your personal data (email, password, and running data) until you request its deletion. If you choose to delete your account, all associated data will be permanently removed from our systems.
          </Typography>

          {/* Section 6: User Rights */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>6. User Rights</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            As a user of TrackRunner, you have the following rights concerning your data:
          </Typography>
          <List sx={{ marginLeft: '2rem', marginBottom: '1rem' }}>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Access: You can view your running data at any time through your account dashboard.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Rectification: You can update your personal information, such as your email, through your account settings.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Deletion: You can delete your account and all associated data directly through the dashboard.
            </ListItem>
            <ListItem sx={{ display: 'list-item', listStyleType: 'disc', paddingLeft: 0 }}>
              Data Portability: Upon request, we can provide you with a copy of your running data in a machine-readable format.
            </ListItem>
          </List>

          {/* Section 7: Data Security */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>7. Data Security</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            We implement industry-standard security measures to protect your data, including encryption, secure servers, and password hashing.
          </Typography>

          {/* Section 8: International Data Transfers */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>8. International Data Transfers</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            TrackRunner is accessible by users worldwide. We comply with GDPR and CCPA to protect user data, depending on your location.
          </Typography>

          {/* Section 9: Children’s Privacy */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>9. Children’s Privacy</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            TrackRunner encourages users under the age of 13 to use the app with the consent of a parent or guardian. We do not knowingly collect data from children under the age of 13 without verifiable parental consent.
          </Typography>

          {/* Section 10: Updates to this Policy */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>10. Updates to this Policy</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            We may update this Privacy Policy periodically. Please review the policy for updates.
          </Typography>

          {/* Section 11: Contact Us */}
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>11. Contact Us</Typography>
          <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
            If you have any questions, please contact us at richard.kakengi@farusoft.com.
          </Typography>
        </Box>

        {/* Button to return to Registration/Login */}
        <Button
          variant="contained"
          onClick={handleLogoClick}
          sx={{
            width: '15rem',
            backgroundColor: theme.primary.main,
            color: 'black',
            '&:hover': {
              backgroundColor: grey[700],
              color: 'white',
            },
          }}
        >
          Return
        </Button>
      </Box>
    </Box>
  )
}

export default PrivacyPolicy
