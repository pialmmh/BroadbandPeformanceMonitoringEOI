import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Divider,
  Alert,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  LinearProgress
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Business,
  Email,
  Phone,
  Badge,
  CloudUpload,
  CheckCircle,
  Description,
  Delete,
  Verified,
  Lock,
  Send
} from '@mui/icons-material';

const steps = [
  'Company Information',
  'OTP Verification',
  'Document Upload',
  'Review & Submit'
];

interface UploadedDoc {
  name: string;
  type: string;
  size: string;
  status: 'uploaded' | 'verified' | 'pending';
}

const IspRegistration: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState('');

  const [formData, setFormData] = useState({
    companyName: '',
    tradeName: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
    contactPerson: '',
    designation: ''
  });

  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([
    { name: 'ISP_License_2024.pdf', type: 'ISP License', size: '2.4 MB', status: 'uploaded' },
    { name: 'Trade_License.pdf', type: 'Trade License', size: '1.8 MB', status: 'uploaded' },
  ]);

  const requiredDocs = [
    { type: 'ISP License', description: 'Valid ISP license issued by BTRC', required: true },
    { type: 'Trade License', description: 'Current trade license from local authority', required: true },
    { type: 'NID (Authorized Person)', description: 'National ID of authorized signatory', required: true },
    { type: 'Company Registration', description: 'RJSC certificate or incorporation docs', required: true },
    { type: 'TIN Certificate', description: 'Tax Identification Number certificate', required: true },
    { type: 'VAT Registration', description: 'VAT registration certificate (if applicable)', required: false },
  ];

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSendOtp = () => {
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setOtpVerified(true);
    }
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Company Information
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange('companyName')}
                  size="small"
                  InputProps={{
                    startAdornment: <Business sx={{ mr: 1, color: 'action.active', fontSize: 20 }} />
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Trade Name"
                  value={formData.tradeName}
                  onChange={handleInputChange('tradeName')}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="ISP License Number"
                  value={formData.licenseNumber}
                  onChange={handleInputChange('licenseNumber')}
                  size="small"
                  InputProps={{
                    startAdornment: <Badge sx={{ mr: 1, color: 'action.active', fontSize: 20 }} />
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Official Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  size="small"
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'action.active', fontSize: 20 }} />
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange('phone')}
                  size="small"
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: 'action.active', fontSize: 20 }} />
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Contact Person"
                  value={formData.contactPerson}
                  onChange={handleInputChange('contactPerson')}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Designation"
                  value={formData.designation}
                  onChange={handleInputChange('designation')}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Registered Address"
                  value={formData.address}
                  onChange={handleInputChange('address')}
                  size="small"
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              OTP Verification
            </Typography>
            <Card variant="outlined" sx={{ maxWidth: 400, mx: 'auto', p: 2 }}>
              <CardContent>
                {!otpSent ? (
                  <Box textAlign="center">
                    <Email sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      We will send a verification code to:
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mb: 3 }}>
                      {formData.email || 'example@isp.com.bd'}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={handleSendOtp}
                      startIcon={<Send />}
                      fullWidth
                    >
                      Send OTP
                    </Button>
                  </Box>
                ) : !otpVerified ? (
                  <Box textAlign="center">
                    <Lock sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Enter the 6-digit code sent to your email
                    </Typography>
                    <TextField
                      fullWidth
                      label="Enter OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      size="small"
                      inputProps={{ maxLength: 6, style: { textAlign: 'center', letterSpacing: 8, fontSize: 20 } }}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      onClick={handleVerifyOtp}
                      startIcon={<Verified />}
                      fullWidth
                      disabled={otp.length !== 6}
                    >
                      Verify OTP
                    </Button>
                    <Button size="small" sx={{ mt: 1 }} onClick={() => setOtpSent(false)}>
                      Resend OTP
                    </Button>
                  </Box>
                ) : (
                  <Box textAlign="center">
                    <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                    <Typography variant="h6" color="success.main" sx={{ mb: 1 }}>
                      Email Verified Successfully!
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Your email has been verified. You can proceed to document upload.
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Document Upload
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500 }}>
                    Required Documents
                  </Typography>
                  <List dense>
                    {requiredDocs.map((doc, index) => (
                      <ListItem key={index} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Description sx={{ fontSize: 18, color: doc.required ? 'error.main' : 'action.active' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <Typography variant="body2">{doc.type}</Typography>
                              {doc.required && <Chip label="Required" size="small" color="error" sx={{ height: 16, fontSize: '0.6rem' }} />}
                            </Box>
                          }
                          secondary={doc.description}
                          secondaryTypographyProps={{ fontSize: '0.7rem' }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    bgcolor: 'primary.50',
                    textAlign: 'center',
                    cursor: 'pointer',
                    mb: 2,
                    '&:hover': { bgcolor: 'primary.100' }
                  }}
                >
                  <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Drag & Drop files here
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    or click to browse (PDF, JPG, PNG - Max 10MB each)
                  </Typography>
                </Paper>

                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 500 }}>
                  Uploaded Documents ({uploadedDocs.length})
                </Typography>
                {uploadedDocs.map((doc, index) => (
                  <Card key={index} variant="outlined" sx={{ mb: 1 }}>
                    <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box display="flex" alignItems="center" gap={1}>
                          <Description sx={{ color: 'primary.main' }} />
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {doc.name}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              {doc.type} - {doc.size}
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          <Chip
                            label={doc.status}
                            size="small"
                            color={doc.status === 'verified' ? 'success' : 'default'}
                            sx={{ height: 20, fontSize: '0.65rem' }}
                          />
                          <IconButton size="small">
                            <Delete sx={{ fontSize: 18 }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Review & Submit
            </Typography>
            <Alert severity="info" sx={{ mb: 3 }}>
              Please review your information before submitting. Once submitted, BTRC will review your application and send login credentials to your registered email.
            </Alert>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500, color: 'primary.main' }}>
                    Company Information
                  </Typography>
                  <Box sx={{ '& > div': { mb: 1 } }}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="caption" color="textSecondary">Company Name</Typography>
                      <Typography variant="body2">{formData.companyName || 'Link3 Technologies Ltd.'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="caption" color="textSecondary">License Number</Typography>
                      <Typography variant="body2">{formData.licenseNumber || 'ISP-NAT-001'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="caption" color="textSecondary">Email</Typography>
                      <Typography variant="body2">{formData.email || 'admin@link3.net'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="caption" color="textSecondary">Phone</Typography>
                      <Typography variant="body2">{formData.phone || '+880-2-55012345'}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="caption" color="textSecondary">Contact Person</Typography>
                      <Typography variant="body2">{formData.contactPerson || 'Md. Rahman'}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 500, color: 'primary.main' }}>
                    Documents Uploaded
                  </Typography>
                  {uploadedDocs.map((doc, index) => (
                    <Box key={index} display="flex" alignItems="center" gap={1} sx={{ mb: 1 }}>
                      <CheckCircle sx={{ color: 'success.main', fontSize: 18 }} />
                      <Typography variant="body2">{doc.type}</Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" color="textSecondary">
                    {uploadedDocs.length} of {requiredDocs.filter(d => d.required).length} required documents uploaded
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'primary.main' }}>
          ISP Registration Portal
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Register your ISP with BTRC QoS Monitoring System
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      <Paper sx={{ p: 3, minHeight: 400 }}>
        {renderStepContent(activeStep)}

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="space-between">
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="success" startIcon={<Send />}>
              Submit Application
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={activeStep === 1 && !otpVerified}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default IspRegistration;
