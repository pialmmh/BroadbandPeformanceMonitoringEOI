import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Chip,
  Button
} from '@mui/material';
import {
  ExpandMore,
  ChevronRight,
  Search,
  FilterList,
  Refresh,
  LocationOn,
  Public,
  LocationCity,
  Place,
  Map,
  CheckBox,
  CheckBoxOutlineBlank,
  IndeterminateCheckBox,
  AddCircleOutline,
  RemoveCircleOutline,
  HomeWork,
  FmdGood,
  Apartment,
  Domain,
  CircleOutlined,
  RadioButtonUnchecked,
  FiberManualRecord,
  Grain,
  Lens,
  Home
} from '@mui/icons-material';
import { SimpleTreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view';
import { useRegionFilter } from '../../contexts/RegionFilterContext';
import { bangladeshDivisions } from '../../data/bangladeshRegions';

const RegionFilter: React.FC = () => {
  const {
    selectedRegions,
    toggleRegion,
    toggleDivision,
    toggleAll,
    isRegionSelected,
    isDivisionSelected,
    isAllSelected,
    getSelectedDistricts,
    resetFilter
  } = useRegionFilter();

  const [expanded, setExpanded] = useState<string[]>(['whole-country']);
  const [searchQuery, setSearchQuery] = useState('');

  const handleToggle = (event: React.SyntheticEvent | null, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleWholeCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    toggleAll(event.target.checked);
  };

  const handleDivisionChange = (divisionId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleDivision(divisionId);
  };

  const handleDistrictChange = (districtId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    toggleRegion(districtId);
  };

  const selectedCount = getSelectedDistricts().length;
  const totalDistricts = bangladeshDivisions.reduce((acc, div) => acc + div.districts.length, 0);

  // Filter divisions and districts based on search
  const filteredDivisions = bangladeshDivisions.filter(division => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    
    // Check division name
    if (division.name.toLowerCase().includes(query)) return true;
    
    // Check district names
    return division.districts.some(district => 
      district.name.toLowerCase().includes(query)
    );
  });

  const renderTreeItemLabel = (
    label: string,
    checked: boolean,
    indeterminate: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    count?: number,
    icon?: React.ReactNode,
    level?: 'country' | 'division' | 'district'
  ) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 0.75,
        pr: 1,
        borderRadius: 1,
        transition: 'all 0.2s'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Checkbox
        checked={checked}
        indeterminate={indeterminate}
        onChange={onChange}
        size="small"
        icon={<CheckBoxOutlineBlank sx={{ fontSize: 18 }} />}
        checkedIcon={<CheckBox sx={{ fontSize: 18, color: 'primary.main' }} />}
        indeterminateIcon={<IndeterminateCheckBox sx={{ fontSize: 18, color: 'warning.main' }} />}
        sx={{ 
          p: 0.5,
          bgcolor: 'grey.100',
          borderRadius: 0.5,
          '&:hover': {
            bgcolor: 'grey.200'
          }
        }}
      />
      {icon && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          color: level === 'country' ? 'primary.main' : 
                 level === 'division' ? 'secondary.main' : 
                 'text.secondary'
        }}>
          {icon}
        </Box>
      )}
      <Typography 
        variant="body2" 
        sx={{ 
          flexGrow: 1, 
          ml: 1,
          fontWeight: level === 'country' ? 600 : level === 'division' ? 500 : 400,
          color: checked ? 'text.primary' : 'text.secondary'
        }}
      >
        {label}
      </Typography>
      {count !== undefined && (
        <Chip
          label={count}
          size="small"
          sx={{
            height: 20,
            fontSize: '0.7rem',
            bgcolor: checked ? 'primary.main' : indeterminate ? 'warning.light' : 'grey.200',
            color: checked || indeterminate ? 'white' : 'text.primary',
            fontWeight: 500,
            border: '1px solid',
            borderColor: checked ? 'primary.main' : indeterminate ? 'warning.light' : 'grey.300'
          }}
        />
      )}
    </Box>
  );

  return (
    <Paper
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper'
      }}
    >
      {/* Header */}
      <Box sx={{ 
        p: 2, 
        borderBottom: 1, 
        borderColor: 'divider',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <Box display="flex" alignItems="center">
            <FilterList sx={{ mr: 1, color: 'white' }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
              Region Filter
            </Typography>
          </Box>
          <IconButton 
            size="small" 
            onClick={resetFilter} 
            title="Reset Filter"
            sx={{ 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <Refresh />
          </IconButton>
        </Box>
        
        <Box 
          display="flex" 
          alignItems="center" 
          gap={1} 
          mb={1}
          sx={{
            p: 1.5,
            borderRadius: 1,
            bgcolor: selectedCount === totalDistricts ? 'success.light' : 
                     selectedCount > 0 ? 'info.light' : 'grey.100'
          }}
        >
          <Map sx={{ fontSize: 18, color: selectedCount > 0 ? 'primary.main' : 'text.secondary' }} />
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 500,
              color: selectedCount > 0 ? 'primary.main' : 'text.secondary'
            }}
          >
            {selectedCount} of {totalDistricts} districts selected
          </Typography>
        </Box>

        {/* Search */}
        <TextField
          size="small"
          fullWidth
          placeholder="Search divisions or districts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ fontSize: 20, color: 'white' }} />
              </InputAdornment>
            ),
            sx: {
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'white'
              },
              '& fieldset': {
                border: 'none'
              }
            }
          }}
          sx={{ mt: 1 }}
        />
      </Box>

      {/* Tree View */}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2, bgcolor: 'grey.50' }}>
        <SimpleTreeView
          expandedItems={expanded}
          onExpandedItemsChange={handleToggle}
          slots={{
            collapseIcon: RemoveCircleOutline,
            expandIcon: AddCircleOutline
          }}
          sx={{ 
            flexGrow: 1,
            '& .MuiTreeItem-root': {
              '& .MuiTreeItem-content': {
                py: 0.5,
                px: 1
              },
              '& .MuiTreeItem-iconContainer': {
                '& svg': {
                  fontSize: 18,
                  color: 'action.active',
                  transition: 'all 0.2s',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'scale(1.1)'
                  }
                }
              }
            }
          }}
        >
          {/* Whole Country Node */}
          <TreeItem
            itemId="whole-country"
            label={renderTreeItemLabel(
              'Bangladesh',
              isAllSelected(),
              !isAllSelected() && selectedRegions.size > 0,
              handleWholeCountryChange,
              totalDistricts,
              <Public sx={{ fontSize: 20, mr: 0.5 }} />,
              'country'
            )}
            sx={{
              '& .MuiTreeItem-content': {
                borderRadius: 1,
                mb: 0.5,
                bgcolor: 'white',
                '&:hover': {
                  bgcolor: 'grey.100'
                }
              }
            }}
          >
            {filteredDivisions.map(division => {
              const divisionDistricts = division.districts.filter(district => {
                if (!searchQuery) return true;
                return district.name.toLowerCase().includes(searchQuery.toLowerCase());
              });

              const selectedDistrictsCount = division.districts.filter(d => 
                isRegionSelected(d.id)
              ).length;

              const isDivisionChecked = isDivisionSelected(division.id);
              const isDivisionIndeterminate = !isDivisionChecked && 
                selectedDistrictsCount > 0 && 
                selectedDistrictsCount < division.districts.length;

              return (
                <TreeItem
                  key={division.id}
                  itemId={division.id}
                  label={renderTreeItemLabel(
                    division.name,
                    isDivisionChecked,
                    isDivisionIndeterminate,
                    handleDivisionChange(division.id),
                    division.districts.length,
                    <Home sx={{ fontSize: 18, mr: 0.5, color: 'secondary.main' }} />,
                    'division'
                  )}
                  sx={{
                    '& .MuiTreeItem-content': {
                      borderRadius: 1,
                      my: 0.25,
                      ml: 1,
                      bgcolor: 'white',
                      '&:hover': {
                        bgcolor: 'grey.100'
                      }
                    }
                  }}
                >
                  {divisionDistricts.map(district => (
                    <TreeItem
                      key={district.id}
                      itemId={district.id}
                      label={renderTreeItemLabel(
                        district.name,
                        isRegionSelected(district.id),
                        false,
                        handleDistrictChange(district.id),
                        undefined,
                        <FmdGood sx={{ fontSize: 16, mr: 0.5, color: 'success.main' }} />,
                        'district'
                      )}
                      sx={{
                        '& .MuiTreeItem-content': {
                          borderRadius: 1,
                          my: 0.25,
                          ml: 2,
                          bgcolor: 'white',
                          '&:hover': {
                            bgcolor: 'grey.100'
                          }
                        }
                      }}
                    />
                  ))}
                </TreeItem>
              );
            })}
          </TreeItem>
        </SimpleTreeView>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        p: 2, 
        borderTop: 1, 
        borderColor: 'divider',
        bgcolor: 'grey.50'
      }}>
        <Box display="flex" alignItems="center" gap={0.5} mb={1}>
          <LocationOn sx={{ fontSize: 16, color: 'info.main' }} />
          <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Filter applies globally to all pages
          </Typography>
        </Box>
        <Button
          fullWidth
          variant="contained"
          size="small"
          startIcon={expanded.length > 1 ? <RemoveCircleOutline /> : <AddCircleOutline />}
          onClick={() => {
            const allExpanded = ['whole-country', ...bangladeshDivisions.map(d => d.id)];
            setExpanded(expanded.length === allExpanded.length ? ['whole-country'] : allExpanded);
          }}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5569d8 0%, #6a4190 100%)'
            }
          }}
        >
          {expanded.length > 1 ? 'Collapse All Regions' : 'Expand All Regions'}
        </Button>
      </Box>
    </Paper>
  );
};

export default RegionFilter;