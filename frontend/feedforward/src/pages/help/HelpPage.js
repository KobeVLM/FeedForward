import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    InputAdornment,
    Grid,
    Card,
    CardContent,
    Button,
    Chip
} from '@mui/material';
import {
    ExpandMore as ExpandMoreIcon,
    Search as SearchIcon,
    Help as HelpIcon,
    ContactSupport as ContactIcon,
    Description as DocsIcon,
    VideoLibrary as VideoIcon
} from '@mui/icons-material';

const QuickHelpCard = ({ icon, title, description, color }) => (
    <Card sx={{ height: '100%', transition: 'all 0.2s', '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' } }}>
        <CardContent>
            <Box sx={{ bgcolor: `${color}15`, color: color, p: 1.5, borderRadius: 2, display: 'inline-flex', mb: 2 }}>
                {icon}
            </Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {description}
            </Typography>
        </CardContent>
    </Card>
);

const HelpPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const faqs = [
        {
            category: 'General',
            question: 'What is FeedForward?',
            answer: 'FeedForward is a comprehensive feedback management system designed to streamline the process of collecting, managing, and responding to feedback from students and staff.'
        },
        {
            category: 'General',
            question: 'How do I create an account?',
            answer: 'Click on the "Register" link on the login page. Fill in your name, email, and password, and select your role (Student or Staff).'
        },
        {
            category: 'Feedback',
            question: 'How do I submit feedback?',
            answer: 'Navigate to the "Submit Feedback" page from the dashboard or menu. Fill in the title, description, select a category, and optionally add tags.'
        },
        {
            category: 'Feedback',
            question: 'Can I attach files to my feedback?',
            answer: 'Yes! When submitting feedback, you can attach relevant files such as screenshots or documents.'
        },
        {
            category: 'Account',
            question: 'How can I change my password?',
            answer: 'You can change your password in the Settings page.'
        },
        {
            category: 'Privacy',
            question: 'Who can see my feedback?',
            answer: 'Your feedback is visible to administrators and staff members. Other students cannot see your submissions unless explicitly shared.'
        }
    ];

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categories = Array.from(new Set(faqs.map(faq => faq.category)));

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>Help Center</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Find answers to common questions and learn how to use FeedForward
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <QuickHelpCard icon={<HelpIcon />} title="Getting Started" description="Learn the basics" color="#667eea" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <QuickHelpCard icon={<DocsIcon />} title="Documentation" description="Detailed guides" color="#4facfe" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <QuickHelpCard icon={<VideoIcon />} title="Video Tutorials" description="Watch guides" color="#f5576c" />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <QuickHelpCard icon={<ContactIcon />} title="Contact Support" description="Get help" color="#43e97b" />
                </Grid>
            </Grid>

            <Paper sx={{ p: 3, mb: 4 }}>
                <TextField
                    fullWidth
                    placeholder="Search for help..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />
            </Paper>

            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>Frequently Asked Questions</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                    <Chip
                        label="All"
                        color={searchQuery === '' ? 'primary' : 'default'}
                        onClick={() => setSearchQuery('')}
                        clickable
                    />
                    {categories.map((category) => (
                        <Chip
                            key={category}
                            label={category}
                            color={searchQuery === category ? 'primary' : 'default'}
                            onClick={() => setSearchQuery(category)}
                            clickable
                        />
                    ))}
                </Box>
            </Box>

            {filteredFAQs.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <Typography color="text.secondary">No results found</Typography>
                </Paper>
            ) : (
                <Box sx={{ mb: 4 }}>
                    {filteredFAQs.map((faq, index) => (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography fontWeight="bold">{faq.question}</Typography>
                                <Chip label={faq.category} size="small" sx={{ ml: 'auto', mr: 2 }} />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography color="text.secondary">{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}

            <Paper sx={{ p: 4, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                <Typography variant="h6" gutterBottom>Still need help?</Typography>
                <Button variant="contained" startIcon={<ContactIcon />}>Contact Support</Button>
            </Paper>
        </Box>
    );
};

export default HelpPage;
