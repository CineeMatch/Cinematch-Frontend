import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const SearchBox = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expand' && prop !== 'expandWidth',
})(({ theme, expand, expandWidth }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: expand
    ? alpha(theme.palette.common.white, 0.1)
    : 'transparent',
  color: 'white',
  width: expand ? expandWidth || '160px' : '48px',
  maxWidth: '100%',
  transition: 'all 0.4s ease',
  overflow: 'hidden',
  cursor: 'text',

  '& .search-icon': {
    padding: theme.spacing(0, 2),
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  '& input': {
    color: 'white',
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    width: expand ? '100%' : '0px',
    opacity: expand ? 1 : 0,
    transition: 'width 0.4s ease, opacity 0.3s ease',
  },
}));

export default function SearchInput({
  searchTerm,
  onChange,
  autoFocus,
  expandWidth, 
}) {
  const [expand, setExpand] = useState(autoFocus || false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) {
      setExpand(true);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (expand) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [expand]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
      <SearchBox
        expand={expand}
        expandWidth={expandWidth}
        onClick={() => setExpand(true)}
        onBlur={() => {
          if (searchTerm === '') setExpand(false);
        }}
      >
        <div className="search-icon">
          <SearchIcon />
        </div>
        <InputBase
          inputRef={inputRef}
          placeholder="Search…"
          value={searchTerm}
          onChange={onChange}
          onFocus={() => setExpand(true)}
        />
      </SearchBox>
    </Box>
  );
}
