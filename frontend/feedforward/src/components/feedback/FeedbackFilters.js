import React from 'react';
import {
    Paper,
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    MenuItem,
    Button
} from '@mui/material';
import {
    FilterList as FilterIcon,
    Search as SearchIcon
} from '@mui/icons-material';

const FeedbackFilters = ({ filters, categories, onFilterChange, onClearFilters }) => {
    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <FilterIcon color="action" />
                <Typography variant="h6">Filters</Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <TextField
                        fullWidth
                        placeholder="Search feedback..."
                        value={filters.search}
                        onChange={onFilterChange('search')}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        select
                        label="Category"
                        value={filters.category}
                        onChange={onFilterChange('category')}
                    >
                        <MenuItem value="all">All Categories</MenuItem>
                        {categories.map(cat => (
                            <MenuItem key={cat.categoryId || cat.id} value={cat.categoryId || cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        select
                        label="Status"
                        value={filters.status}
                        onChange={onFilterChange('status')}
                    >
                        <MenuItem value="all">All Statuses</MenuItem>
                        <MenuItem value="PENDING">Pending</MenuItem>
                        <MenuItem value="IN_REVIEW">In Review</MenuItem>
                        <MenuItem value="RESPONDED">Responded</MenuItem>
                        <MenuItem value="RESOLVED">Resolved</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <TextField
                        fullWidth
                        select
                        label="Filter By"
                        value={filters.showMyFeedback ? 'my' : 'all'}
                        onChange={(e) => onFilterChange('showMyFeedback')({
                            target: { value: e.target.value === 'my' }
                        })}
                    >
                        <MenuItem value="all">All Feedback</MenuItem>
                        <MenuItem value="my">My Feedback</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={onClearFilters}
                        sx={{ height: '56px' }}
                    >
                        Clear Filters
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default FeedbackFilters;
