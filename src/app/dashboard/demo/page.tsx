'use client';

import React, { useState } from 'react';
import CustomTextInput from '@/components/shared/textinput';
import DropdownComponent from '@/components/shared/dropdown';
import DataTableComponent from '@/components/shared/datatable';
import { Button } from '@carbon/react';

const DemoPage = () => {
  const [showTable, setShowTable] = useState(false);

  const handleDropdownChange = (selectedItem: any) => {
    if (selectedItem) {
      setShowTable(true); // Show the DataTable when an option is selected
    } else {
      setShowTable(false); // Hide the DataTable if no option is selected
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
      {/* Row 1: TextInput and Button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <CustomTextInput />
        <Button>Submit</Button>
      </div>

      {/* Row 2: TextInput */}
      <div>
        <CustomTextInput />
      </div>

      {/* Row 3: Dropdown */}
      <div>
        <DropdownComponent onChange={handleDropdownChange} />
      </div>

      {/* Row 4: DataTable (conditionally rendered) */}
      {showTable && (
        <div>
          <DataTableComponent />
        </div>
      )}
    </div>
  );
};

export default DemoPage;
