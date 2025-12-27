import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { bangladeshDivisions, Division, District } from '../data/bangladeshRegions';

interface RegionFilterContextType {
  selectedRegions: Set<string>;
  toggleRegion: (regionId: string) => void;
  toggleDivision: (divisionId: string) => void;
  toggleAll: (checked: boolean) => void;
  isRegionSelected: (regionId: string) => boolean;
  isDivisionSelected: (divisionId: string) => boolean;
  isAllSelected: () => boolean;
  getSelectedDivisions: () => Division[];
  getSelectedDistricts: () => District[];
  resetFilter: () => void;
}

const RegionFilterContext = createContext<RegionFilterContextType | undefined>(undefined);

export const useRegionFilter = () => {
  const context = useContext(RegionFilterContext);
  if (!context) {
    throw new Error('useRegionFilter must be used within a RegionFilterProvider');
  }
  return context;
};

export const RegionFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize with all regions selected
  const initializeSelectedRegions = (): Set<string> => {
    const regions = new Set<string>(['whole-country']);
    bangladeshDivisions.forEach(division => {
      regions.add(division.id);
      division.districts.forEach(district => {
        regions.add(district.id);
      });
    });
    return regions;
  };

  const [selectedRegions, setSelectedRegions] = useState<Set<string>>(initializeSelectedRegions);

  const toggleRegion = useCallback((regionId: string) => {
    setSelectedRegions(prev => {
      const newSet = new Set(prev);
      
      if (regionId === 'whole-country') {
        // Toggle all regions
        if (newSet.has('whole-country')) {
          // Unselect all
          return new Set();
        } else {
          // Select all
          return initializeSelectedRegions();
        }
      }
      
      // Toggle individual district
      if (newSet.has(regionId)) {
        newSet.delete(regionId);
        
        // Check if parent division should be unchecked
        const parentDivision = bangladeshDivisions.find(div => 
          div.districts.some(d => d.id === regionId)
        );
        
        if (parentDivision) {
          const allDistrictsSelected = parentDivision.districts.every(d => 
            d.id === regionId ? false : newSet.has(d.id)
          );
          
          if (!allDistrictsSelected) {
            newSet.delete(parentDivision.id);
          }
        }
        
        // Remove whole-country if not all selected
        newSet.delete('whole-country');
      } else {
        newSet.add(regionId);
        
        // Check if parent division should be checked
        const parentDivision = bangladeshDivisions.find(div => 
          div.districts.some(d => d.id === regionId)
        );
        
        if (parentDivision) {
          const allDistrictsSelected = parentDivision.districts.every(d => 
            newSet.has(d.id)
          );
          
          if (allDistrictsSelected) {
            newSet.add(parentDivision.id);
          }
        }
        
        // Check if whole-country should be checked
        const allSelected = bangladeshDivisions.every(div => 
          newSet.has(div.id) && div.districts.every(d => newSet.has(d.id))
        );
        
        if (allSelected) {
          newSet.add('whole-country');
        }
      }
      
      return newSet;
    });
  }, []);

  const toggleDivision = useCallback((divisionId: string) => {
    setSelectedRegions(prev => {
      const newSet = new Set(prev);
      const division = bangladeshDivisions.find(d => d.id === divisionId);
      
      if (!division) return newSet;
      
      const isDivisionSelected = newSet.has(divisionId);
      
      if (isDivisionSelected) {
        // Unselect division and all its districts
        newSet.delete(divisionId);
        division.districts.forEach(district => {
          newSet.delete(district.id);
        });
        newSet.delete('whole-country');
      } else {
        // Select division and all its districts
        newSet.add(divisionId);
        division.districts.forEach(district => {
          newSet.add(district.id);
        });
        
        // Check if all divisions are selected
        const allDivisionsSelected = bangladeshDivisions.every(div => 
          newSet.has(div.id)
        );
        
        if (allDivisionsSelected) {
          newSet.add('whole-country');
        }
      }
      
      return newSet;
    });
  }, []);

  const toggleAll = useCallback((checked: boolean) => {
    if (checked) {
      setSelectedRegions(initializeSelectedRegions());
    } else {
      setSelectedRegions(new Set());
    }
  }, []);

  const isRegionSelected = useCallback((regionId: string) => {
    return selectedRegions.has(regionId);
  }, [selectedRegions]);

  const isDivisionSelected = useCallback((divisionId: string) => {
    return selectedRegions.has(divisionId);
  }, [selectedRegions]);

  const isAllSelected = useCallback(() => {
    return selectedRegions.has('whole-country');
  }, [selectedRegions]);

  const getSelectedDivisions = useCallback((): Division[] => {
    return bangladeshDivisions.filter(div => selectedRegions.has(div.id));
  }, [selectedRegions]);

  const getSelectedDistricts = useCallback((): District[] => {
    const districts: District[] = [];
    bangladeshDivisions.forEach(division => {
      division.districts.forEach(district => {
        if (selectedRegions.has(district.id)) {
          districts.push(district);
        }
      });
    });
    return districts;
  }, [selectedRegions]);

  const resetFilter = useCallback(() => {
    setSelectedRegions(initializeSelectedRegions());
  }, []);

  const value: RegionFilterContextType = {
    selectedRegions,
    toggleRegion,
    toggleDivision,
    toggleAll,
    isRegionSelected,
    isDivisionSelected,
    isAllSelected,
    getSelectedDivisions,
    getSelectedDistricts,
    resetFilter
  };

  return (
    <RegionFilterContext.Provider value={value}>
      {children}
    </RegionFilterContext.Provider>
  );
};