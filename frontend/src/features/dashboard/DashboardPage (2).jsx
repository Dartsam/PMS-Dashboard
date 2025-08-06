import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

export default function DashboardPage() {
  const dummyStats = [
    { title: 'Staff Count', value: '1,234', change: '+4.2%' },
    { title: 'Leave Pending', value: '56', change: '-1.3%' },
    { title: 'Promotions', value: '12', change: '+8.0%' },
    { title: 'Budget Forecast', value: '$1.2M', change: '+2.5%' },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: '#F9FAFB', minHeight: '100vh' }}>
      <Typography variant="h5" fontWeight="bold" mb={3} sx={{ textAlign: 'left' }}>
        Overview
      </Typography>

      <Grid container spacing={3}>
        {/* First 4 cards */}
        {dummyStats.map(({ title, value, change }) => (
          <Grid item xs={12} sm={6} md={6} lg={3} key={title}>
            <Card
              sx={{
                backgroundColor: '#fff',
                borderRadius: 2,
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {value}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color={change.startsWith('+') ? 'success.main' : 'error.main'}
                >
                  {change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Sessions Card */}
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Card
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              height: 300,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                Sessions Last 30 Days
              </Typography>
              <Box sx={{ mt: 2, height: '220px', bgcolor: '#E5E7EB', borderRadius: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Page Views Card */}
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Card
            sx={{
              backgroundColor: '#fff',
              borderRadius: 2,
              height: 300,
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                Page Views
              </Typography>
              <Box sx={{ mt: 2, height: '220px', bgcolor: '#E5E7EB', borderRadius: 1 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}