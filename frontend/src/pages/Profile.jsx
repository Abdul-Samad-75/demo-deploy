import { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { updateProfile } from '../store/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    });
    setIsEditing(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Avatar sx={{ width: 120, height: 120, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
            {user?.name?.charAt(0) || <PersonIcon />}
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {user?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Member since {new Date(user?.createdAt).toLocaleDateString()}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Profile Information</Typography>
                {!isEditing ? (
                  <Button startIcon={<EditIcon />} onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                ) : null}
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={!isEditing}
                  sx={{ mb: 3 }}
                  placeholder="Enter new password"
                />

                {isEditing && (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button type="submit" variant="contained" startIcon={<SaveIcon />} disabled={isLoading}>
                      Save Changes
                    </Button>
                    <Button variant="outlined" startIcon={<CancelIcon />} onClick={handleCancel} disabled={isLoading}>
                      Cancel
                    </Button>
                  </Box>
                )}
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Your Statistics
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                          {user?.stats?.quizzesCompleted || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quizzes Completed
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                          {user?.stats?.totalPoints || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Points
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                          {user?.stats?.streak || 0}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Day Streak
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default Profile;
