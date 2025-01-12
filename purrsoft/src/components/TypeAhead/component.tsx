import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Grid,
  Typography,
  CircularProgress,
  InputAdornment,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface TypeaheadProps<T extends { id: string | number }> {
  data: T[];
  onSearch: (query: string) => void;
  onSelect: (item: T) => void;
  fieldsToShow: (keyof T)[]; // Fields to show in the dropdown
  isLoading?: boolean;
}

const Typeahead = <T extends { id: string | number }>(
  props: TypeaheadProps<T>,
) => {
  const { data, isLoading = false, onSearch, onSelect, fieldsToShow } = props;

  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    setShowDropdown(true);
    setSelectedItem(null);
    onSearch(value);
  };

  // Handle item selection
  const handleSelect = (item: T) => {
    setSelectedItem(item);
    const displayValue = fieldsToShow.map((field) => item[field]).join(' ');
    setQuery(displayValue);
    setShowDropdown(false);
    onSelect(item);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Grid container direction="column" spacing={1} ref={dropdownRef}>
      {/* Search Input */}
      <Grid item>
        <TextField
          fullWidth
          placeholder="Search..."
          value={query}
          onChange={handleSearchChange}
          variant="outlined"
          onFocus={() => setShowDropdown(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Loading Spinner */}
      {isLoading && (
        <Grid item>
          <CircularProgress size={24} />
        </Grid>
      )}

      {/* Results List */}
      {!isLoading && showDropdown && data.length > 0 && (
        <Box
          sx={{
            maxHeight: '100px',
            overflowY: 'auto',
            position: 'absolute',
            backgroundColor: '#fff',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            zIndex: 1300,
            width: '100%',
            marginTop: 8,
            borderRadius: 2,
            padding: '4px',
            maxWidth: '300px',
          }}
        >
          {data.map((item) => (
            <Box
              key={item.id}
              onClick={() => handleSelect(item)}
              sx={{
                padding: '8px 12px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
                backgroundColor: '#f9f9f9',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: '#e0f7fa',
                },
              }}
            >
              {fieldsToShow.map((field) => (
                <Typography
                  key={field}
                  variant="body2"
                  color="textPrimary"
                  sx={{
                    fontSize: '12px',
                    lineHeight: '1',
                    margin: 0,
                  }}
                >
                  {String(item[field])}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Grid>
  );
};

export default Typeahead;
