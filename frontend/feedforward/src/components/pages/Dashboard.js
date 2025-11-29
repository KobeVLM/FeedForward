import React from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Badge,
    Card,
    CardContent,
    LinearProgress,
    Grid,
    Button,
    Container,
    Paper
} from '@mui/material';
import {
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Assessment as AssessmentIcon,
    Schedule as ScheduleIcon,
    RateReview as ReviewIcon,
    CheckCircle as CheckCircleIcon,
    Add as AddIcon,
    Visibility as VisibilityIcon,
    ArrowForward as ArrowForwardIcon,
    ChatBubbleOutline as ChatBubbleOutlineIcon
} from '@mui/icons-material';

// Asset URLs from Figma
const imgStyledSvg = "https://www.figma.com/api/mcp/asset/b5e85d20-385e-43e7-a248-bc00bd7b359a";
const imgStyledSvg1 = "https://www.figma.com/api/mcp/asset/4341b6d2-1de9-4b38-ade7-f18246d75388";
const imgVector = "https://www.figma.com/api/mcp/asset/4aaf7d04-b54b-489f-9d53-5de324d30170";
const imgVector1 = "https://www.figma.com/api/mcp/asset/bf02445a-c3c2-4197-82c8-86330eca879c";
const imgVector2 = "https://www.figma.com/api/mcp/asset/ba5b8680-65ed-4ba5-ac9e-a0049cabf463";
const imgVector3 = "https://www.figma.com/api/mcp/asset/0eebf657-9d1d-4d14-87ed-993e14f95193";
const imgVector4 = "https://www.figma.com/api/mcp/asset/e5be9a85-406e-4b88-b316-5fb7c8527fbb";
const imgStyledSvg2 = "https://www.figma.com/api/mcp/asset/a7954715-6169-42a3-87e9-4a7e71a502cb";
const imgVector5 = "https://www.figma.com/api/mcp/asset/cd8aa395-5ff9-4c59-b9c4-7eb502e1c0b7";
const imgVector6 = "https://www.figma.com/api/mcp/asset/565c8ca0-8548-45b7-9243-35c43181cabc";
const imgStyledSvg3 = "https://www.figma.com/api/mcp/asset/6f318ebb-7c9f-41cc-975f-85f81403d1bf";
const imgVector7 = "https://www.figma.com/api/mcp/asset/4bb3c64e-8b35-4a23-849a-4c40d321ab3b";

export default function Dashboard() {
    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            {/* Header */}
            <AppBar
                position="static"
                sx={{
                    backgroundColor: '#1976d2',
                    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
                }}
            >
                <Toolbar sx={{ px: 3 }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        component="h1"
                        sx={{
                            flexGrow: 1,
                            fontSize: '20px',
                            fontWeight: 500,
                            fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        FeedForward
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton color="inherit">
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Avatar
                            sx={{
                                bgcolor: '#dc004e',
                                width: 40,
                                height: 40,
                                fontSize: '20px',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            A
                        </Avatar>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Container maxWidth={false} sx={{ pt: 4, px: 3 }}>
                {/* Welcome Section */}
                <Paper
                    sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        p: 3,
                        borderRadius: 3,
                        mb: 4,
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                >
                    <Box>
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontSize: '34px',
                                fontWeight: 700,
                                fontFamily: 'Inter, sans-serif',
                                mb: 1
                            }}
                        >
                            Welcome, asdasdasd! 👋
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                fontSize: '16px',
                                opacity: 0.9,
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            Track and manage your feedback submissions
                        </Typography>
                    </Box>
                    <Avatar
                        sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            bgcolor: 'rgba(255,255,255,0.1)',
                            width: 56,
                            height: 56
                        }}
                    >
                        <Avatar sx={{ bgcolor: '#bdbdbd', width: 40, height: 40 }}>
                            a
                        </Avatar>
                    </Avatar>
                </Paper>

                {/* Stats Cards */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                    {[
                        {
                            title: 'Total Feedback',
                            value: '0',
                            subtitle: 'All submissions',
                            color: '#667eea',
                            icon: <AssessmentIcon />
                        },
                        {
                            title: 'Pending',
                            value: '0',
                            subtitle: 'Awaiting review',
                            color: '#f093fb',
                            icon: <ScheduleIcon />
                        },
                        {
                            title: 'In Review',
                            value: '0',
                            subtitle: 'Being processed',
                            color: '#4facfe',
                            icon: <ReviewIcon />
                        },
                        {
                            title: 'Resolved',
                            value: '0',
                            subtitle: 'Completed',
                            color: '#43e97b',
                            icon: <CheckCircleIcon />
                        }
                    ].map((stat, index) => (
                        <Grid item key={index}>
                            <Card
                                sx={{
                                    width: '127px',
                                    height: '156px',
                                    background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}aa 100%)`,
                                    color: 'white',
                                    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                                }}
                            >
                                <CardContent sx={{ p: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box
                                            sx={{
                                                bgcolor: 'rgba(255,255,255,0.2)',
                                                borderRadius: 1,
                                                p: 1.5,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 48,
                                                height: 48
                                            }}
                                        >
                                            {stat.icon}
                                        </Box>
                                        <Typography
                                            variant="h2"
                                            sx={{
                                                fontSize: '48px',
                                                fontWeight: 700,
                                                lineHeight: 1,
                                                fontFamily: 'Inter, sans-serif'
                                            }}
                                        >
                                            {stat.value}
                                        </Typography>
                                    </Box>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            opacity: 0.9,
                                            mb: 0.5,
                                            fontFamily: 'Inter, sans-serif'
                                        }}
                                    >
                                        {stat.title}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontSize: '12px',
                                            opacity: 0.7,
                                            fontFamily: 'Inter, sans-serif'
                                        }}
                                    >
                                        {stat.subtitle}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Resolution Progress */}
                <Paper sx={{ p: 3, mb: 4, borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '20px',
                                fontWeight: 500,
                                color: 'rgba(0,0,0,0.87)',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            Resolution Progress
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '20px',
                                fontWeight: 500,
                                color: '#1976d2',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            0%
                        </Typography>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={0}
                        sx={{
                            height: 10,
                            borderRadius: 20,
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            mb: 1,
                            '& .MuiLinearProgress-bar': {
                                background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                                borderRadius: 20
                            }
                        }}
                    />
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: '14px',
                            color: 'rgba(0,0,0,0.6)',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        0 of 0 feedback items resolved
                    </Typography>
                </Paper>

                {/* Quick Actions */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: '24px',
                            fontWeight: 600,
                            color: 'rgba(0,0,0,0.87)',
                            mb: 2,
                            fontFamily: 'Inter, sans-serif'
                        }}
                    >
                        Quick Actions
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Paper
                                sx={{
                                    p: 2,
                                    width: '370px',
                                    height: '98px',
                                    border: '1px solid rgba(0,0,0,0.12)',
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: 2
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
                                    <Box
                                        sx={{
                                            bgcolor: 'rgba(102,126,234,0.08)',
                                            borderRadius: 1,
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 48,
                                            height: 48
                                        }}
                                    >
                                        <AddIcon sx={{ color: '#667eea' }} />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '20px',
                                                fontWeight: 500,
                                                color: 'rgba(0,0,0,0.87)',
                                                mb: 0.5,
                                                fontFamily: 'Inter, sans-serif'
                                            }}
                                        >
                                            Submit Feedback
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '14px',
                                                color: 'rgba(0,0,0,0.6)',
                                                fontFamily: 'Inter, sans-serif'
                                            }}
                                        >
                                            Share your thoughts and suggestions
                                        </Typography>
                                    </Box>
                                    <ArrowForwardIcon sx={{ color: 'rgba(0,0,0,0.54)' }} />
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper
                                sx={{
                                    p: 2,
                                    width: '337px',
                                    height: '98px',
                                    border: '1px solid rgba(0,0,0,0.12)',
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: 2
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
                                    <Box
                                        sx={{
                                            bgcolor: 'rgba(79,172,254,0.08)',
                                            borderRadius: 1,
                                            p: 1.5,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 48,
                                            height: 48
                                        }}
                                    >
                                        <VisibilityIcon sx={{ color: '#4facfe' }} />
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontSize: '20px',
                                                fontWeight: 500,
                                                color: 'rgba(0,0,0,0.87)',
                                                mb: 0.5,
                                                fontFamily: 'Inter, sans-serif'
                                            }}
                                        >
                                            View All Feedback
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                fontSize: '14px',
                                                color: 'rgba(0,0,0,0.6)',
                                                fontFamily: 'Inter, sans-serif'
                                            }}
                                        >
                                            See all your submitted feedback
                                        </Typography>
                                    </Box>
                                    <ArrowForwardIcon sx={{ color: 'rgba(0,0,0,0.54)' }} />
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                {/* Recent Feedback */}
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontSize: '24px',
                                fontWeight: 600,
                                color: 'rgba(0,0,0,0.87)',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            Recent Feedback
                        </Typography>
                        <Button
                            endIcon={<ArrowForwardIcon />}
                            sx={{
                                color: '#1976d2',
                                textTransform: 'uppercase',
                                fontSize: '14px',
                                fontWeight: 500,
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            View All
                        </Button>
                    </Box>
                    <Paper
                        sx={{
                            height: '296px',
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            gap: 2
                        }}
                    >
                        <ChatBubbleOutlineIcon sx={{ fontSize: 64, color: 'rgba(0,0,0,0.3)' }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '20px',
                                fontWeight: 500,
                                color: 'rgba(0,0,0,0.6)',
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            No feedback yet
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: '14px',
                                color: 'rgba(0,0,0,0.6)',
                                mb: 2,
                                fontFamily: 'Inter, sans-serif'
                            }}
                        >
                            Start by submitting your first feedback
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: '#1976d2',
                                fontSize: '14px',
                                fontWeight: 500,
                                textTransform: 'uppercase',
                                fontFamily: 'Inter, sans-serif',
                                px: 3,
                                py: 1
                            }}
                        >
                            Submit Feedback
                        </Button>
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}