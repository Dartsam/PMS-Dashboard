import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';

export default function DashboardPage() {
  // replace these with real React Query hooks later
  const dummyStats = [
    { title: 'Staff Count', value: '1,234', change: '+4.2%' },
    { title: 'Leave Pending', value: '56', change: '-1.3%' },
    { title: 'Promotions', value: '12', change: '+8.0%' },
    { title: 'Budget Forecast', value: '$1.2M', change: '+2.5%' },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Overview
      </Typography>

      <Grid container spacing={2}>
        {dummyStats.map(({ title, value, change }) => (
          <Grid item xs={12} sm={6} md={3} key={title}>
            <Card sx={{ bgcolor: '#1E1E1E' }}>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h5">{value}</Typography>
                <Typography color={change.startsWith('+') ? 'success.main' : 'error.main'}>
                  {change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Example larger chart card */}
        <Grid item xs={12} md={8}>
          <Card sx={{ bgcolor: '#1E1E1E', height: 300 }}>
            <CardContent>
              <Typography variant="h6">Sessions Last 30 Days</Typography>
              {/* Replace with your chart component */}
              <Box sx={{ mt: 2, height: '220px', bgcolor: '#2A2A2A' }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: '#1E1E1E', height: 300 }}>
            <CardContent>
              <Typography variant="h6">Page Views</Typography>
              {/* Replace with chart */}
              <Box sx={{ mt: 2, height: '220px', bgcolor: '#2A2A2A' }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
