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
    <div className="demo-page">
      {/* Row 1: TextInput and Button */}
      <div className="demo-row">
        <CustomTextInput />
        <Button>Submit</Button>
      </div>

      {/* Row 2: TextInput */}
      <div className="demo-row">
        <CustomTextInput />
      </div>

      {/* Row 3: Dropdown */}
      <div className="demo-row">
        <DropdownComponent onChange={handleDropdownChange} />
      </div>

      {/* Row 4: DataTable (conditionally rendered) */}
      {showTable && (
        <div className="demo-row">
          <DataTableComponent />
        </div>
      )}
    </div>
  );
};

export default DemoPage;
